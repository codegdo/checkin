USE [DealReg]

go

/****** Object:  StoredProcedure [org].[Usp_formWithRegistrationData]    Script Date: 2/21/2022 9:25:30 AM ******/
SET ansi_nulls ON

go

SET quoted_identifier ON

go

/*
declare @isReadonlyStatus BIT = 0 
declare @p6 bit  set @p6=0  exec [org].[Usp_formWithRegistrationData] @OrgID=72,@UDFormID=414,@LoginUserID=1570,@RegID=1110,@ProgramID=4,@isReadonlyStatus=@p6 output  select @p6
*/
ALTER PROCEDURE [org].[Usp_formwithregistrationdata](@OrgID            INT,
                                                     @UDFormID         INT,
                                                     @LoginUserID      INT,
                                                     @RegID            INT,
                                                     @ProgramID        INT =
NULL,
                                                     @isReadonlyStatus BIT = 0
output
                                                     --,@isRenew          BIT)
                                                     ,
                                                     @OperationFlag    NVARCHAR(
20) = NULL) --10/26/2015
WITH EXECUTE AS 'partnerportalspuser'
/****************************************************************      
Author:  CMR DBA     
  Date:  11/09/2013
Purpose: fetch the data to 
         Recreate a form at Different Places  
               For Dealer Registeration Accepts '0' for ProgramType
              as dealer Registeration doesnot have a programes
              as of now.
-----------------------------------------------------------------      
CHANGE LOG              
Date           Author           Description              
-----------------------------------------------------------------              
11/09/2013     CMR DBA          Created        
7/10/2014      CMR DBA          Add Renew section   
08/26/2014     CMR DBA          Add fieldDescription Localization
10/13/2014     cmr DBA          Form Description and Name Localization   
10/30/2014     cmr DBA          Add isActive=1 Check
12/24/2014     cmrSunil         973 Deal size minimum 
02/10/2015     cmrSunil         Readonly fields based on status and roles 
04/23/2015     cmrSunil         Added coalesce for datacomponent ,udformgridfield
05/26/2015    CMRSteven    Approval Logic allow edits
03/14/2017    cmrMegha    Added case statements for Product Grid validation
07/25/2017      cmrArturo       Added DataAttribute and Options to UDFormArea, UDFormSection and UDFormBlock
                Added AdminStyle, PartnerStyle, DataAttribute and Options to UDForm
                Added DataAttribute, HelperText and Options to UDFormField
12/06/2017    cmrThanh    Commented out code section that changed column field type to 'TEXT'
04/09/2018    cmrThanh    Added logic to handle multi-distributor selection dealreg
04/11/2018    cmrThanh    Commented out code block to assign key value into 'Value' field.  The key ID will remain in field 'DropDownValue' 
04/17/2018    cmrThanh    Passed along the @LoginUserID as input param to org.usp_getRegistration SP call
06/15/2018    cmrThanh    Returned multi-disti grid for external reseller users
10/18/2018    cmrThanh    Fixed @minmax concatenation issue when @minval/@maxval = null
                Set isRemovable status = 0 when grid is multi-disti and external user (securityroletype = 'external') and org.programstatus.isapproved/isdenied/isclosed/isexpired/ispending = 1
11/01/2018    cmrThanh    Set isRemovable status = 0 for all grids when user is external type and org.programstatus.isapproved/isdenied/isclosed/isexpired/ispending = 1
11/15/2018    cmrThanh    Added customized logic for Jabra and Kyocera clients to handle their external user rules.  This is a temp solution until a permanent client rule table is in place.
12/13/2018    cmrThanh    Revised logic to not making State field type TEXT and readonly when there is no real Province State Code in table PartnerPortal.dbo.Territory for the given country.  Bug #1800.
09/21/2021    cmrThanh    Derived REG Disti  Contact info by passing the REG Disti CompanyID into the call to Usp_getlookupvalue SP
****************************************************************/
AS
  BEGIN try
      DECLARE @Prefix             VARCHAR(2),
              @LangID             INT,
              @ProgramStatusID    INT,
              @SecurityRoleTypeID INT--,@isReadonlyStatus bit = 0
              ,
              @isActive           BIT = 0,
              @Dealmin            MONEY,
              @Minval             INT,
              @Maxval             INT,
              @minmax             VARCHAR(50),
              @SecurityRoleId     INT,
              @isDraft            INT,
              @isRenew            INT = 0,
              @RevisionStatusID   INT,
              @distiCompanyID     INT,--04/09/2018
              @isResellerCompany  BIT = 0,--06/15/2018
              @jabraOrg           INT,
              @kyoceraOrg         INT

      SELECT @jabraOrg = orgid
      FROM   partnerportal.sec.organization
      WHERE  orgname = 'jabra' --dev 99; demo 50; prod 106

      SELECT @kyoceraOrg = orgid
      FROM   partnerportal.sec.organization
      WHERE  orgname = 'kyocera' --dev 177; demo 1143; prod 171
      ----temp solution until a permanent client rule table is built
      DECLARE @clientRule TABLE
        (
           orgid                    INT,
           programstatus            NVARCHAR(50),
           externalsecurityroletype CHAR(1),
           gridtypeid               INT NULL,
           isremovable              BIT --1: editable; 0: readonly
        )

      INSERT @clientRule
      VALUES (@jabraOrg --orgid - Jabra
              ,
              'Approved' --ProgramStatusID
              ,
              'D' --distributor
              ,
              NULL --gridtypeid 
              ,
              0),
             (@jabraOrg --orgid - Jabra
              ,
              'Approved' --ProgramStatusID
              ,
              'R' --reseller
              ,
              NULL --gridtypeid 
              ,
              1),
             (@kyoceraOrg --orgid - Kyocera
              ,
              'Approved' --ProgramStatusID
              ,
              'D' --distributor
              ,
              NULL --gridtypeid 
              ,
              0),
             (@kyoceraOrg --orgid - Kyocera
              ,
              'Approved' --ProgramStatusID
              ,
              'R' --reseller
              ,
              NULL --gridtypeid 
              ,
              0)

      --04/09/2018
      SELECT @distiCompanyID = pc.companyid
      FROM   dealreg.org.program p WITH (nolock)
             JOIN dealreg.org.programcompany pc WITH (nolock)
               ON p.programid = pc.programid
             JOIN partnerportal.sec.useraccount ua WITH (nolock)
               ON ua.userid = @LoginUserID
                  AND ua.companyid = pc.companyid
      WHERE  p.programid = @ProgramID
             AND pc.partnerlevel = 'D'
             AND pc.isactive = 1

      --06/15/2018
      IF EXISTS (SELECT 1
                 FROM   dealreg.org.program p WITH (nolock)
                        JOIN dealreg.org.programcompany pc WITH (nolock)
                          ON p.programid = pc.programid
                        JOIN partnerportal.sec.useraccount ua WITH (nolock)
                          ON ua.userid = @LoginUserID
                             AND ua.companyid = pc.companyid
                 WHERE  p.programid = @ProgramID
                        AND pc.partnerlevel = 'R'
                        AND pc.isactive = 1
                --and p.MultiDistiFormID = @UDFormID
                )
        SELECT @isResellerCompany = 1

      SET @isReadonlyStatus = 0

      DECLARE @eval TABLE
        (
           udfieldid   INT,
           maptotable  NVARCHAR(150),
           maptocolumn NVARCHAR(150),
           datavalue   VARCHAR(max),
           rownum      INT,
           gridtypeid  INT
        )
      DECLARE @UDFormField TABLE
        (
           udformid        INT,
           udfieldid       INT,
           position        INT,
           isreadonly      BIT,
           formisrequired  BIT,
           fieldlabel      NVARCHAR(200),
           fieldname       VARCHAR(100),
           fieldtype       VARCHAR(50),
           value           NVARCHAR(max),
           dropdownvalue   NVARCHAR(max),
           datatype        VARCHAR(50),
           isunique        BIT,
           fieldisrequired BIT,
           isdatecheck     BIT,
           isnumericcheck  BIT,
           isemailcheck    BIT,
           lookupschema    VARCHAR(50),
           lookuptable     VARCHAR(50),
           lookupcolumn    VARCHAR(50),
           lookupidcolumn  VARCHAR(50),
           [description]   VARCHAR(200),
           objectid        INT,
           orgid           INT,
           fieldlength     INT,
           fielddecimal    INT,
           isadmin         BIT,
           hasdependent    BIT,
           isdependent     BIT,
           parentudfieldid INT,
           maptotable      NVARCHAR(200),
           maptocolumn     NVARCHAR(200),
           prefix          VARCHAR(20),
           ishidden        BIT,
           udformblockid   INT,
           parentposition  INT,
           classname       VARCHAR(120),
           datacomponent   VARCHAR(120),
           dataformat      VARCHAR(120),
           gridtypeid      INT,
           gridtype        VARCHAR(50),
           isforreview     BIT,
           cssstyle        VARCHAR(max),
           dataattribute   NVARCHAR(max),
           options         NVARCHAR(max),
           helpertext      NVARCHAR(max),
           isforaudit      BIT,
           isremovable     BIT,
           isreadonly2     INT
        )
      DECLARE @DropDownData TABLE
        (
           keyvalue  VARCHAR(200),
           datavalue VARCHAR(200)
        )
      DECLARE @DropDownData2 TABLE
        (
           keyvalue  VARCHAR(max),
           udfieldid INT,
           num       INT
        )

      --10/30/2014 Start
      SELECT @isActive = isactive
      FROM   org.registration
      WHERE  regid = @RegID

      SELECT @Dealmin = totaldealminimum
      FROM   dealreg.org.program
      WHERE  programid = @ProgramID--12/24/2014

      SELECT @Minval = productminimum
      FROM   dealreg.org.program
      WHERE  programid = @ProgramID--03/08/2017

      SELECT @Maxval = productmaximum
      FROM   dealreg.org.program
      WHERE  programid = @ProgramID--03/08/2017
      SET @minmax = ''
                    + CONVERT(VARCHAR(20), COALESCE(@Minval, 0) )
                    + ','
                    + CONVERT(VARCHAR(20), COALESCE(@Maxval, 0))
                    + '' --10/18/2018
      IF @isActive = 1
        BEGIN
            INSERT INTO @EVAL
            EXEC org.[Usp_getregistration]
              @RegID,
              @LoginUserID,--04/17/2018
              @ProgramStatusID output
        END

      --10/26/2015--
      IF ( @OperationFlag = 'Renew' )
        BEGIN
            SELECT @isRenew = 1
        END
      ELSE IF ( @isRenew = 0 )
        BEGIN
            SELECT @isRenew = isrenew
            FROM   org.programstatus
            WHERE  programstatusid = @ProgramStatusID
        END

      --10/26/2015--
      IF ( @OperationFlag = 'Close' )
        BEGIN
            SELECT TOP 1 @ProgramStatusID = programstatusid
            FROM   org.programstatus
            WHERE  programid = @ProgramID
                   AND isclosed = 1
        END

      IF ( @OperationFlag = 'Revision' )
        BEGIN
            SELECT @RevisionStatusID = programstatusid
            FROM   org.programstatus
            WHERE  programid = @ProgramID
                   AND isrevision = 1
                   AND issubmitted = 1
        END

      SELECT @SecurityRoleTypeID = sr.securityroletypeid,
             @LangID = langid,
             @SecurityRoleId = ua.roleid
      FROM   sec.useraccount ua
             INNER JOIN sec.securityrole sr
                     ON sr.securityroleid = ua.roleid
      WHERE  ua.userid = @LoginUserID

      SELECT @isReadonlyStatus = CASE
                                   WHEN ( isapproved = 1
                                           OR isdenied = 1
                                           OR isclosed = 1
                                           OR isexpired = 1
                                           OR ispending = 1 ) THEN 1
                                   ELSE 0
                                 END,
             @isDraft = isdraft
      FROM   org.programstatus
      WHERE  programstatusid = @ProgramStatusID

      --05/12/2016
      DECLARE @ObjectID            INT,
              @ModuleID            INT,
              @NextApprovalLevelID INT,
              @Output              XML,
              @UserHasRights       BIT = 0,
              @AHIsReadOnlyStatus  BIT = 1,
              @HasApprovalLogic    BIT = 0
      DECLARE @Users TABLE
        (
           userid       INT,
           emailaddress NVARCHAR(max),
           allowedit    BIT
        )

      SELECT @ObjectID = o.objectid,
             @ModuleID = mo.moduleid
      FROM   dbo.object o
             INNER JOIN partnerportal.dbo.moduleobject mo
                     ON o.objectid = mo.objectid
      WHERE  objectname = 'Deal Registration'

      IF( EXISTS(SELECT 1
                 FROM   partnerportal.org.approvalhierarchy
                 WHERE  programid = @ProgramID
                        AND objectid = @ObjectID) )
        BEGIN
            SET @HasApprovalLogic = 1

            SELECT @NextApprovalLevelID = nextapproverid
            FROM   org.registration
            WHERE  regid = @RegID

            /* cmrAshwin - for approval logic */
            EXEC [Org].[Usp_getusersforapprovalprogram]
              @ProgramID = @ProgramId,
              @ObjectID = @ObjectID,
              @NextApprovalLevel = @NextApprovalLevelID,
              @Output = @OUTPUT output

            INSERT INTO @Users
                        (userid,
                         emailaddress,
                         allowedit)
            SELECT record.col.value('@UserID', 'INT'),
                   record.col.value('@EmailAddress', 'NVARCHAR(max)'),
                   record.col.value('@AllowEdit', 'BIT')
            FROM   @OUTPUT.nodes('DATA/Users') AS Record(col)

            /* User approval verification */
            DECLARE @AllowEdit BIT = NULL

            SELECT @userHasRights = 1,
                   @AllowEdit = allowedit
            FROM   @Users
            WHERE  userid = @LoginUserID;

            DECLARE @IsFinalStep BIT = 0;

            SELECT @IsFinalStep = isfinalstep
            FROM   partnerportal.org.approvalhierarchy
            WHERE  approvallevel = (SELECT approvallevel
                                    FROM   org.registration
                                    WHERE  regid = @RegID)
                   AND programid = @ProgramID
                   AND objectid = @ObjectID;

            IF ( @userHasRights = 1
                 AND 1 <> @IsFinalStep )
                OR ( @isReadonlyStatus = 0 )
                OR ( @AllowEdit = 1 )
              -- cmrAshwin_20160513_1118: It was @AHisReadonlyStatus = 0
              SET @AHIsReadOnlyStatus = 0
            ELSE
              SET @AHIsReadOnlyStatus = 1
        --05/12/2016
        END

      INSERT INTO @UDFormField
      SELECT UF.udformid,
             UFF.udfieldid,
             UFF.position,
             CASE
               WHEN @HasApprovalLogic = 1 THEN @AHIsReadOnlyStatus
               WHEN fr.isreadonly IS NOT NULL THEN fr.isreadonly
               WHEN ufs.isrenew = 1 THEN 0
               WHEN @SecurityRoleTypeID = 2
                    AND udf.isnewrequest = 0
                    AND @OperationFlag = 'Close' THEN 0 --10/27/2015
               WHEN @SecurityRoleTypeID = 2
                    AND @isReadonlyStatus = 1 THEN 1
               WHEN uff.isreadonly = 0
                    AND fs.securitylevelid = 3 THEN 0
               ELSE 1
             END            AS isReadonly,
             CASE
               WHEN UFF.isrequired = 1
                     OR UDF.isrequired = 1 THEN 1
               ELSE 0
             END            formisrequired --not used in form for is required 
             ,
             COALESCE (uffl.labeltext, uff.fieldlabel),
             UDF.fieldname,
             UDF.fieldtype,
             UDF.value,
             UDF.dropdownvalue,
             UDF.datatype,
             UDF.isunique,
             UDF.isrequired fieldisrequired --used in form for is required 
             ,
             UDF.isdatecheck,
             udf.isnumericcheck,
             udf.isemailcheck,
             udf.lookupschema,
             udf.lookuptable,
             udf.lookupcolumn,
             udf.lookupidcolumn,
             COALESCE(uffl.labeldescription, uff.[description], udf.description)
                            [Description],
             udf.objectid,
             udf.orgid,
             udf.fieldlength,
             udf.fielddecimal,
             udf.isadmin,
             udf.hasdependent,
             udf.isdependent,
             udf.parentudfieldid,
             udf.maptotable,
             udf.maptocolumn,
             CASE
               WHEN datatype = 'Currency' THEN @Prefix
               ELSE NULL
             END            Prefix,
             UFF.ishidden,
             UFF.udformblockid,
             ufb.position,
             uff.classname,
             udf.datacomponent,
             udf.dataformat,
             udf.gridtypeid,
             gt.gridtype,
             udf.isforreview,
             uff.cssstyle,
             uff.dataattribute,
             uff.options,
             uff.helpertext,
             gt.isforaudit,
             --ps.IsApproved, crd.orgid dorgid, crr.orgid rorgid,gt.isRemovable gtisRemovable, @isReadonlyStatus isReadonlyStatus, gt.GridTypeID gt_gridtypeid, udf.GridTypeID udf_gridtypeid,
             --gt.isRemovable,
             --client rules: 
             --1) JABRA: allow (yes/no) edit for approved status: Distributor(no), Reseller(yes) and Reseller Sales Director(yes)
             --1) KYOCERA: allow (yes/no) edit for approved status: Distributor(no), Reseller(no) and Reseller Sales Director(no)
             CASE
               WHEN ps.isapproved = 1
                    AND crd.orgid IS NOT NULL THEN crd.isremovable
               WHEN ps.isapproved = 1
                    AND crr.orgid IS NOT NULL THEN crr.isremovable
               WHEN crd.orgid IS NULL
                    AND crr.orgid IS NULL
                    AND @isReadonlyStatus = 1
                    AND @SecurityRoleTypeID = 2 THEN 0
               ELSE gt.isremovable
             END            isRemovable,
             CASE
               WHEN @HasApprovalLogic = 1 THEN @AHIsReadOnlyStatus
               WHEN fr.isreadonly IS NOT NULL THEN 1
               WHEN ufs.isrenew = 1 THEN 2
               WHEN @SecurityRoleTypeID = 2
                    AND udf.isnewrequest = 0
                    AND @OperationFlag = 'Close' THEN 3 --10/27/2015
               WHEN @SecurityRoleTypeID = 2 THEN 4
               WHEN uff.isreadonly = 0
                    AND fs.securitylevelid = 3 THEN 5
               ELSE 6
             END            AS isReadonly2
      FROM   org.udform UF
             INNER JOIN org.udformfield UFF
                     ON UFF.udformid = UF.udformid
             INNER JOIN org.udfield UDF
                     ON UDF.udfieldid = UFF.udfieldid
             LEFT JOIN org.formtypeudfield ftuf
                    ON uf.formtypeid = ftuf.formtypeid
                       AND udf.udfieldid = ftuf.udfieldid
                       AND udf.objectid = ftuf.objectid
             LEFT JOIN org.udformblock ufb
                    ON ufb.udformblockid = uff.udformblockid
             LEFT JOIN org.udformsection ufs
                    ON ufs.udformsectionid = ufb.udformsectionid
             LEFT JOIN dbo.gridtype gt
                    ON gt.gridtypeid = udf.gridtypeid
             LEFT JOIN org.udformfieldlabel uffl
                    ON uffl.udformid = UFF.udformid
                       AND uffl.labelkey = uff.fieldlabel
                       AND uffl.langid = @LangID
             INNER JOIN sec.Uf_fieldsecurityforuser(@LoginUserID) fs
                     ON fs.udfieldid = udf.udfieldid
                        AND fs.securitylevelid > 1
             LEFT JOIN org.[Uf_udfieldreadonly](CASE
                                                  WHEN
                       @OperationFlag = 'Revision'
                                                THEN
                                                  @RevisionStatusID
                                                  ELSE @ProgramStatusID
                                                END, @SecurityRoleId) fr
                    --02/10/2015 --11/03/2015
                    ON fr.udfieldid = udf.udfieldid
             --11/15/2018
             JOIN org.programstatus ps WITH (nolock)
               ON ps.programstatusid = @ProgramStatusID
             LEFT JOIN @clientRule crd
                    ON crd.orgid = UF.orgid
                       AND crd.externalsecurityroletype = 'D'
                       AND crd.programstatus = ps.statusname
                       AND @distiCompanyID IS NOT NULL --11/15/2018
             LEFT JOIN @clientRule crr
                    ON crr.orgid = UF.orgid
                       AND crr.externalsecurityroletype = 'R'
                       AND crr.programstatus = ps.statusname
                       AND @isResellerCompany = 1 --11/15/2018
      WHERE  UF.orgid = @OrgID
             AND uf.udformid = @UDFormID
             AND udf.isconfig = 1
             AND udf.isnewrequest IN ( @isDraft, CASE
                                                   WHEN @isDraft = 0 THEN 1
                                                   ELSE 1
                                                 END )
             --10/27/2015 to hide not new request field for draft status
             AND udf.isadmin IN ( 0, CASE
                                       WHEN @isDraft = 0
                                            AND @SecurityRoleTypeID = 1 THEN 1
                                       --when @isResellerCompany = 1 then 1 --06/15/2018
                                       ELSE 0
                                     END )--Changes later 1/22/2014
      DECLARE @LookUp TABLE
        (
           id             INT IDENTITY (1, 1),
           lookupschema   VARCHAR(50),
           lookuptable    VARCHAR(50),
           lookupcolumn   VARCHAR(50),
           lookupidcolumn VARCHAR(50),
           udfieldid      INT,
           isdependent    INT
        )

      INSERT INTO @LookUp
      SELECT lookupschema,
             lookuptable,
             lookupcolumn,
             lookupidcolumn,
             udfieldid,
             isdependent
      FROM   @UDFormField
      WHERE  lookuptable IS NOT NULL
             AND datatype = 'DropDown'

      DECLARE @max                   INT,
              @min                   INT = 1,
              @udFieldID             INT,
              @LookUpSchema          VARCHAR(50),
              @LookUpTable           VARCHAR(50),
              @LookUpColumn          VARCHAR(50),
              @LookUpIDColumn        VARCHAR(50),
              @Keyvalue              VARCHAR(max) = '',
              @DataValue             VARCHAR(max) = '',
              @isDependent           BIT = 0,
              @value                 VARCHAR(max),
              @udFieldDependency     INT,
              @FilterField           VARCHAR(200),
              @MapToCLoumnDependency VARCHAR(200)--10/27/2015
              ,
              @MaptoTableDependency  VARCHAR(200)--10/27/2015
      SELECT @max = Max(id)
      FROM   @LookUp

      WHILE @max >= @min
        BEGIN
            SELECT @LookUpSchema = lookupschema,
                   @LookUpTable = lookuptable,
                   @LookUpColumn = lookupcolumn,
                   @LookUpIDColumn = lookupidcolumn,
                   @udFieldID = udfieldid,
                   @isDependent = isdependent
            FROM   @LookUp
            WHERE  id = @min

            PRINT 'MAX:' + Cast(@max AS VARCHAR) + ' MIN:'
                  + Cast(@min AS VARCHAR) + ' UDFieldID:'
                  + Cast(@udFieldID AS VARCHAR)

            IF @isDependent = 1
              BEGIN
                  ---Add SVlookUpschema for Block dependency 
                  SELECT @udFieldDependency = udfielddependency,
                         @FilterField = assignedvalue,
                         @MapToCLoumnDependency = uf.maptocolumn--10/27/2015
                         ,
                         @MaptoTableDependency = uf.maptotable--10/27/2015
                  FROM   org.udfielddependency ufd
                         INNER JOIN org.udfield uf
                                 ON uf.udfieldid = ufd.udfielddependency
                  WHERE  ufd.udfieldid = @udFieldID
                         AND ufd.svlookupschema IS NULL

                  SELECT @value = CASE
                                    WHEN @MapToCLoumnDependency =
                                         'ProgramStatusID'
                                         AND @MaptoTableDependency =
                                             'RegistrationStatus'
                                  THEN
                                    COALESCE(Cast(@ProgramStatusID AS
                                                  VARCHAR(20))
                                    ,
                                    datavalue)
                                    --10/27/2015
                                    ELSE datavalue
                                  END
                  FROM   @eval
                  WHERE  udfieldid = @udFieldDependency

                  --Disti Contact Company -- 09/21/2021
                  DECLARE @distiRegCompany VARCHAR(max)

                  SELECT @distiRegCompany = datavalue
                  FROM   @EVAL
                  WHERE  maptotable = 'RegistrationContact'
                         AND maptocolumn = 'DistributorID'

                  SELECT @value = CASE
                                    WHEN @LookUpSchema = 'Org'
                                         AND @LookUpTable = 'Contact'
                                         AND @LookUpColumn = 'ContactID'
                                         AND @LookUpIDColumn = 'CompanyID' THEN
                                    @distiRegCompany
                                    ELSE @value
                                  END
              END

            PRINT @Value

            INSERT INTO @DropDownData
                        (keyvalue,
                         datavalue)
            EXEC Usp_getlookupvalue
              @LookUpSchema = @LookUpSchema,
              @LookUpTable = @LookUpTable,
              @LookUpColumn = @LookUpColumn,
              @LookUpIDColumn = @LookUpIDColumn,
              @UserID = @LoginUserID,
              @UDFormID = @UDFormID,
              @ProgramID = @ProgramID,
              @isDependent = @isDependent,
              @Value = @Value,
              @orgID = @OrgID,
              @FilterField = @FilterField,
              @RegID = @RegID
            ----06292016  to populate disti in form with data even if unmapped with reseller
            SET @min +=1

            SELECT @Keyvalue = @Keyvalue + keyvalue + ',' + datavalue + ';'
            FROM   @DropDownData

            INSERT INTO @DropDownData2
            VALUES      (@Keyvalue,
                         @UDFieldID,
                         (SELECT Count(keyvalue)
                          FROM   @DropDownData) )

            SET @Keyvalue = ''

            DELETE FROM @DropDownData

            SET @Value= NULL
            SET @FilterField = NULL
        END

      UPDATE a
      SET    a.value = e.datavalue
      FROM   @UDFormField a
             INNER JOIN @EVAL e
                     ON e.udfieldid = a.udfieldid

      UPDATE a
      SET    a.value = e.datavalue
      FROM   @UDFormField a
             INNER JOIN @EVAL e
                     --ON e.UDFieldID = a.udfieldid
                     ON e.maptotable = a.maptotable --04/09/2018
                        AND e.maptocolumn = a.maptocolumn --04/09/2018
      WHERE  e.maptotable = 'RegistrationContact'
             AND e.maptocolumn LIKE 'Distributor%'
             AND e.rownum IN (SELECT rownum
                              FROM   @EVAL
                              WHERE  maptotable = 'RegistrationContact'
                                     AND maptocolumn = 'DistributorID'
                                     AND datavalue = @distiCompanyID)
      --04/09/2018
      --*******************************************************to changes dropdown to text if drodown has one value*******************************************
      /* --original
      UPDATE A
      SET    A.DropDownValue = CASE
        WHEN DW.num = 1 THEN Substring (dw.Keyvalue, 1, ( Patindex('%,%', dw.keyvalue) - 1 ))
        ELSE dw.keyvalue
      END
      ,A.value = CASE
      WHEN DW.num = 1 THEN Substring (dw.Keyvalue, Patindex('%,%', dw.Keyvalue) + 1, ( Patindex('%;%', dw.Keyvalue) - Patindex('%,%', dw.Keyvalue) - 1 ))
      ELSE A.value
      END
      ,A.isReadonly = CASE
      WHEN DW.num = 1 THEN 1
      ELSE A.isReadonly
      END
      ,A.FieldType = CASE
      WHEN DW.num = 1 THEN 'TEXT'
      ELSE A.FieldType
      END
      FROM   @UDFormField a
      INNER JOIN @DropDownData2 DW
      ON DW.UDFieldID = a.udfieldid
      */
      UPDATE a
      SET    a.dropdownvalue = dw.keyvalue
      --12/13/2018 comment out
      --CASE
      --                     WHEN DW.num = 1 THEN Substring (dw.Keyvalue, 1, ( Patindex('%,%', dw.keyvalue) - 1 ))
      --                     ELSE dw.keyvalue
      --                     END 
      --,A.value = CASE
      --            WHEN DW.num = 1 THEN Substring (dw.Keyvalue, Patindex('%,%', dw.Keyvalue) + 1, ( Patindex('%;%', dw.Keyvalue) - Patindex('%,%', dw.Keyvalue) - 1 ))
      --            ELSE A.value
      --            END
      ----12/13/2018 - comment out 
      --,A.isReadonly = CASE
      --          WHEN DW.num = 1 THEN 1
      --          ELSE A.isReadonly
      --        END
      --,A.FieldType = CASE
      --         WHEN DW.num = 1 THEN 'TEXT'
      --         ELSE A.FieldType
      --         END 
      FROM   @UDFormField a
             INNER JOIN @DropDownData2 DW
                     ON DW.udfieldid = a.udfieldid

      --   UPDATE @UDFormField
      -- SET   value =  Substring (DropDownValue,  Patindex('%,%', DropDownValue) + 1 ,(Patindex('%;%', DropDownValue)-Patindex('%,%', DropDownValue)-1))
      --,DropDownValue = Substring (DropDownValue, 1, ( Patindex('%,%', DropDownValue) - 1 ))
      --             ,isReadonly = 1
      --       ,FieldType =  'TEXT'
      --      FROM   @UDFormField
      --Where len(DropDownValue) - len(replace(DropDownValue,',',''))  = 1
      --*******************************************************END changes dropdown to text if drodown has one value*******************************************
      --10/13/2014 Start
      SELECT uf.[udformid],
             [orgid],
             [formtypeid],
             [udformguid],
             [programid],
             COALESCE(ufl.[labeltext], uf.[name])             NAME,
             [isdeleted],
             [ispublished],
             COALESCE(ufl.[labeldescription], uf.description) Description,
             [classname],
             [customstyle],
             [defaultstyle],
             [isdefaultstyle],
             [cssstyle],
             [adminstyle],
             [partnerstyle],
             [dataattribute],
             [options],
             uf.[createuser],
             uf.[createdate],
             uf.[modifyuser],
             uf.[modifydate],
             [isexternal]
      FROM   [Org].[udform] uf
             LEFT JOIN org.udformlabel ufl
                    ON ufl.udformid = uf.udformid
                       AND Ufl.labelkey = uf.NAME
                       AND ufl.langid = @LangID
      WHERE  uf.udformid = @UDFormID

      --10/13/2014 end
      SELECT ufa.[udformareaid],
             ufa.[udformid],
             COALESCE(ufal.labeltext, ufa.[name])               AS [Name],
             ufa.[type],
             ufa.[position],
             ufa.[isadmin],
             ufa.[cssstyle],
             ufa.[dataattribute],
             ufa.[options],
             ufa.[datarole],
             ufa.[classname],
             COALESCE(ufal.labeldescription, ufa.[description]) [Description],
             ufa.[isactive]
      FROM   org.udformarea ufa
             LEFT JOIN org.udformarealabel ufal
                    ON ufal.udformid = ufa.udformid
                       AND ufal.labelkey = ufa.NAME
                       AND ufal.langid = @LangID
      WHERE  Ufa.udformid = @UDFormID
             AND isactive = 1
      ORDER  BY position

      --  --07/10/2014 end isrenew section
      --Declare @isRenew bit = 0
      --Select @isRenew = Case
      --                        WHen Value <= CURRENT_TIMESTAMP+14 then 1
      --            Else 0
      --            END
      --from @UDFormField  WHERE  MaptoColumn = 'ExpirationDate' AND MapToTable = 'Registration'
      ----Select  @isRenew isRenew
      ----07/70/2014 end isrenew section 
      SELECT ufs.[udformsectionid],
             ufs.[udformid],
             ufs.[udformareaid],
             COALESCE(ufsl.labeltext, ufs.[name])               AS [Name],
             ufs.[type],
             ufs.[position],
             ufs.[isadmin],
             ufs.[cssstyle],
             ufs.[dataattribute],
             ufs.[options],
             ufs.[datarole],
             ufs.[classname],
             COALESCE(ufsl.labeldescription, ufs.[description]) [Description],
             ufs.[isactive],
             ufs.[isrenew],
             ufa.position                                       AS
             ParentPosition
      FROM   org.udformsection ufs
             INNER JOIN org.udformarea ufa
                     ON ufa.udformareaid = ufs.udformareaid
             LEFT JOIN org.udformsectionlabel ufsl
                    ON ufsl.udformid = ufs.udformid
                       AND ufsl.labelkey = ufs.NAME
                       AND ufsl.langid = @LangID
      WHERE  ufs.udformid = @UDFormID
             AND ufs.isactive = 1
             AND ufs.isadmin IN ( 0, CASE
                                       WHEN @isDraft = 0
                                            AND @SecurityRoleTypeID = 1 THEN 1
                                       ELSE 0
                                     END )
             AND isrenew IN ( 0, @isRenew )
      ORDER  BY ufs.position

      SELECT ufb.[udformblockid],
             ufb.[udformid],
             ufb.[udformsectionid],
             COALESCE(ufbl.labeltext, ufb.[name])               AS [Name],
             ufb.[type],
             ufb.[position],
             ufb.[isadmin],
             ufb.[cssstyle],
             ufb.[dataattribute],
             ufb.[options],
             ufb.[datarole],
             ufb.[classname],
             COALESCE(ufbl.labeldescription, ufb.[description]) [Description],
             ufb.[isactive],
             ufs.position                                       AS
             ParentPosition
      FROM   org.udformblock ufb
             INNER JOIN org.udformsection ufs
                     ON ufs.udformsectionid = ufb.udformsectionid
             LEFT JOIN org.udformblocklabel ufbl
                    ON ufbl.udformid = ufb.udformid
                       AND ufbl.labelkey = ufb.NAME
                       AND ufbl.langid = @LangID
      WHERE  ufb.udformid = @UDFormID
             AND ufb.isactive = 1
      ORDER  BY ufb.position

      SELECT *
      FROM   @UDFormField udf
      WHERE  udf.udfieldid = parentudfieldid
      ORDER  BY position

      SELECT *
      FROM   @UDFormField
      WHERE  udfieldid <> parentudfieldid
      ORDER  BY position

      SELECT DISTINCT UDF.[udfieldid],
                      COALESCE(udfgl.labeltext, udgf.fieldlabel, fieldname) AS
                      FieldLabel,
                      [fieldtype]
                      --Cast (COALESCE(UDGF.isReadOnly, 0) AS BIT)       AS isReadOnly
                      ,
                      CASE
                        WHEN UDF.[udfieldid] = 393
                             AND @OperationFlag = 'Revision'
                             AND @UDFormID = 2119 THEN Cast(0 AS BIT)
                        --cmrAshwin:Temporary fix only for UAG
                        WHEN fr.isreadonly IS NOT NULL THEN fr.isreadonly
                        WHEN gt.isforaudit = 1 THEN Cast (1 AS BIT)
                        WHEN fs.securitylevelid IN( 1, 2 ) THEN Cast (1 AS BIT)
                        --10/27/2015
                        WHEN @SecurityRoleTypeID = 2 THEN @isReadonlyStatus
                        WHEN udgf.isreadonly = 0
                             AND fs.securitylevelid = 3 THEN Cast(0 AS BIT)
                        ELSE Cast (1 AS BIT)
                      END                                                   AS
                      isReadonly,
                      [datatype],
                      udgf.[validationfunction],
                      [value],
                      [maptoschema],
                      [maptotable],
                      [maptocolumn],
                      [isunique],
                      CASE
                        WHEN udgf.isrequired = 1
                              OR UDF.[isrequired] = 1 THEN 1
                        ELSE 0
                      END                                                   AS
                      IsRequired,
                      [isdatecheck],
                      [isnumericcheck],
                      [isemailcheck],
                      [lookupschema],
                      [lookuptable],
                      [lookupcolumn],
                      [lookupidcolumn],
                      COALESCE(udfgl.labeldescription, UDF.[description])
                      [Description],--change 08/26/2014 
                      UDF.[objectid],
                      UDF.[orgid],
                      [fieldlength],
                      [fielddecimal],
                      isconfig,
                      udgf.isadmin,
                      Cast(COALESCE(udgf.isvisible, 0) AS BIT)              AS
                      IsVisible,
                      udgf.hastotal,
                      dropdownvalue,
                      CASE
                        WHEN UDGF.udfieldid IS NOT NULL THEN 1
                        ELSE 0
                      END                                                   AS
                      isInUse
                      ,
                      udgf.parentudfieldid,
                      hasdependent,
                      isdependent,
                      position,
                      COALESCE(udgf.iskey, Cast(0 AS BIT))
                      isKey,
                      udgf.isforreview,
                      NULL
                      ClassName
                      --Added case statements for Product Grid validation 03142017--Megha Bhagat
                      ,
                      CASE WHEN udgf.datacomponent LIKE '%dealmin%' THEN
                      Replace(COALESCE(udgf.datacomponent, udf.datacomponent),
                      'dealmin', 'dealmin:' +
                      Cast(COALESCE(@Dealmin, '')
                      AS VARCHAR(40))) ELSE '' END + '' + CASE WHEN
                      udgf.datacomponent
                      LIKE '%minmax%'
                      THEN Replace(COALESCE(udgf.datacomponent,
                      udf.datacomponent),
                      'minmax',
                      'minmax:' + COALESCE(@minmax, '')) ELSE udgf.datacomponent
                      END
                                                                            --+ CASE
                                                                            --    WHEN udgf.Datacomponent LIKE '%valmin%'
                                                                            --         AND @minval > 0 THEN Replace(COALESCE(udgf.DataComponent, udf.Datacomponent), 'valmin', 'valmin:'
                                                                            --                                                                                                      + Cast(COALESCE(@Minval, '') AS VARCHAR(40))) --+' MaxVal:'+cast(COALESCE(@Maxval,'') as varchar(40))
                                                                            --    ELSE ''
                                                                            --  END
                                                                            --+ ''
                                                                            --+ CASE
                                                                            --    WHEN udgf.Datacomponent LIKE '%valmin valmax%'
                                                                            --         AND @maxval > 0
                                                                            --         AND @minval > 0 THEN ' valmax:'
                                                                            --                              + Cast(COALESCE(@Maxval, '') AS VARCHAR(40))
                                                                            --    ELSE ''
                                                                            --  END
                                                                            --+ ''
                                                                            --+ CASE
                                                                            --    WHEN udgf.Datacomponent LIKE '%valmin valmax%'
                                                                            --         AND @maxval > 0
                                                                            --         AND @minval <= 0THEN Replace(COALESCE(udgf.DataComponent, udf.Datacomponent), 'valmin valmax', 'valmin valmax:'
                                                                            --                                                                                                      + Cast(COALESCE(@Maxval, '') AS VARCHAR(40)))
                                                                            --    ELSE ''
                                                                            --  END
                                                                            --+ ''
                                                                            --+ CASE
                                                                            --    WHEN udgf.Datacomponent LIKE '%valmin valmax%'
                                                                            --         AND @maxval <= 0
                                                                            --         AND @minval <= 0THEN udgf.Datacomponent
                                                                            --    ELSE ''
                                                                            --  END
                                                                            --+ ''
                                                                            --+ CASE
                                                                            --    WHEN udgf.Datacomponent NOT LIKE '%valmin valmax%'
                                                                            --         AND udgf.Datacomponent NOT LIKE '%dealmin%' THEN udgf.DataComponent
                                                                            --    ELSE udgf.Datacomponent
                                                                            --  END                                                 
                                                                            AS
                      Datacomponent--12/24/2014--04/23/2015
                      ,
                      CASE
                        WHEN fr.isreadonly IS NOT NULL THEN 1
                        WHEN gt.isforaudit = 1 THEN 2
                        WHEN fs.securitylevelid IN( 1, 2 ) THEN
                        fs.securitylevelid
                        --10/27/2015
                        WHEN @SecurityRoleTypeID = 2 THEN 3
                        WHEN udgf.isreadonly = 0
                             AND fs.securitylevelid = 3 THEN 4
                        ELSE 5
                      END                                                   AS
                      isReadonly2
      FROM   dbo. gridtypeobject gto
             INNER JOIN dbo.gridtype gt
                     ON gt.gridtypeid = gto.gridtypeid
             INNER JOIN org.udfield UDF
                     ON UDF.objectid = gto.objectid
             INNER JOIN org.udformgridfield udgf
                     ON udgf.udfieldid = udf.udfieldid
                        AND udgf.udformid = @UDFormID
                        AND udgf.parentudfieldid = udf.parentudfieldid
             LEFT JOIN sec.Uf_fieldsecurityforuser(@LoginUserID) fs
                    ON fs.udfieldid = udgf.udfieldid
                       AND fs.securitylevelid > 1
             LEFT JOIN org.udformgridfieldlabel udfgl
                    ON udfgl.udformid = udgf.udformid
                       AND udfgl.labelkey = udgf.fieldlabel
                       AND udfgl.udformid = udgf.udformid
                       AND udfgl.langid = @LangID
             LEFT JOIN org.Uf_udfieldreadonly(CASE
                                                WHEN @OperationFlag = 'Revision'
                                              THEN
                                                @RevisionStatusID
                                                ELSE @ProgramStatusID
                                              END, @SecurityRoleId) fr
                    --02/10/2015
                    ON fr.udfieldid = udf.udfieldid
      WHERE  ( UDF.orgid = @OrgID
                OR UDF.orgid IS NULL )
             AND UDF.isconfig = 1
             AND udf.parentudfieldid <> udf.udfieldid
             AND UDGF.isvisible = 1
             AND udgf.isadmin IN ( 0, CASE @SecurityRoleTypeID
                                        WHEN 1 THEN 1
                                        ELSE 0
                                      END )
             AND udgf.isforreview IN ( 0, CASE @SecurityRoleTypeID
                                            WHEN 1 THEN 1
                                            ELSE 0
                                          END )
      ORDER  BY position

      SELECT Row_number()
               OVER(
                 ORDER BY (SELECT 0)) AS id,
             udfieldid,
             maptotable,
             maptocolumn,
             datavalue,
             rownum,
             gridtypeid,
             NULL                     RowCss
      FROM   (SELECT DISTINCT *
              FROM   @eval
              WHERE  rownum IS NOT NULL
                     AND udfieldid IS NOT NULL
                     AND gridtypeid IS NOT NULL --20180628
             ) griddata
      ORDER  BY rownum
  -- AND uf.UDFormId = (SELECT Max(UDFormId)
  -- FROM   org.UDForm)
  --11/09/2012 Temporary fix to get data for one form 
  --it will be filtered by application for the form type 
  --END
  END try

  BEGIN catch ;
      THROW
  END catch 