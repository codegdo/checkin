USE [DealReg]
GO
/****** Object:  StoredProcedure [org].[Usp_formWithRegistrationData]    Script Date: 2/21/2022 9:25:30 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO




/*
declare @isReadonlyStatus BIT = 0 
declare @p6 bit  set @p6=0  exec [org].[Usp_formWithRegistrationData] @OrgID=72,@UDFormID=414,@LoginUserID=1570,@RegID=1110,@ProgramID=4,@isReadonlyStatus=@p6 output  select @p6
*/
ALTER PROCEDURE [org].[Usp_formWithRegistrationData](@OrgID            INT,
                                                     @UDFormID         INT,
                                                     @LoginUserID      INT,
                                                     @RegID            INT,
                                                     @ProgramID        INT = NULL,
                                                     @isReadonlyStatus BIT = 0 output
                                                     --,@isRenew          BIT)
                                                     ,
                                                     @OperationFlag    NVARCHAR(20) = NULL) --10/26/2015
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
05/26/2015		CMRSteven		Approval Logic allow edits
03/14/2017		cmrMegha		Added case statements for Product Grid validation
07/25/2017      cmrArturo       Added DataAttribute and Options to UDFormArea, UDFormSection and UDFormBlock
								Added AdminStyle, PartnerStyle, DataAttribute and Options to UDForm
								Added DataAttribute, HelperText and Options to UDFormField
12/06/2017		cmrThanh		Commented out code section that changed column field type to 'TEXT'
04/09/2018		cmrThanh		Added logic to handle multi-distributor selection dealreg
04/11/2018		cmrThanh		Commented out code block to assign key value into 'Value' field.  The key ID will remain in field 'DropDownValue' 
04/17/2018		cmrThanh		Passed along the @LoginUserID as input param to org.usp_getRegistration SP call
06/15/2018		cmrThanh		Returned multi-disti grid for external reseller users
10/18/2018		cmrThanh		Fixed @minmax concatenation issue when @minval/@maxval = null
								Set isRemovable status = 0 when grid is multi-disti and external user (securityroletype = 'external') and org.programstatus.isapproved/isdenied/isclosed/isexpired/ispending = 1
11/01/2018		cmrThanh		Set isRemovable status = 0 for all grids when user is external type and org.programstatus.isapproved/isdenied/isclosed/isexpired/ispending = 1
11/15/2018		cmrThanh		Added customized logic for Jabra and Kyocera clients to handle their external user rules.  This is a temp solution until a permanent client rule table is in place.
12/13/2018		cmrThanh		Revised logic to not making State field type TEXT and readonly when there is no real Province State Code in table PartnerPortal.dbo.Territory for the given country.  Bug #1800.
09/21/2021		cmrThanh		Derived REG Disti  Contact info by passing the REG Disti CompanyID into the call to Usp_getlookupvalue SP
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
				@minmax				varchar(50),
                @SecurityRoleId     INT,
                @isDraft            INT,
                @isRenew            INT = 0,
                @RevisionStatusID   INT,
				@distiCompanyID			int, --04/09/2018
				@isResellerCompany	bit = 0, --06/15/2018
				@jabraOrg int,
				@kyoceraOrg int

		select @jabraOrg = orgid from partnerportal.sec.organization where orgname = 'jabra'  --dev 99; demo 50; prod 106
		select @kyoceraOrg = orgid from partnerportal.sec.organization where orgname = 'kyocera' --dev 177; demo 1143; prod 171


		----temp solution until a permanent client rule table is built
		declare @clientRule table
		(
			OrgId int
			,ProgramStatus nvarchar(50)
			,ExternalSecurityRoleType char(1)
			,GridTypeId int null
			,IsRemovable bit --1: editable; 0: readonly
		)

		insert @clientRule
		values 
			(@jabraOrg		--orgid - Jabra
			,'Approved'		--ProgramStatusID
			,'D'			--distributor
			,null			--gridtypeid 
			,0)
			,(@jabraOrg		--orgid - Jabra
			,'Approved'		--ProgramStatusID
			,'R'			--reseller
			,null			--gridtypeid 
			,1) 
			,(@kyoceraOrg	--orgid - Kyocera
			,'Approved'		--ProgramStatusID
			,'D'			--distributor
			,null			--gridtypeid 
			,0)
			,(@kyoceraOrg	--orgid - Kyocera
			,'Approved'		--ProgramStatusID
			,'R'			--reseller
			,null			--gridtypeid 
			,0) 
 
 	 

		--04/09/2018
		select @distiCompanyID = pc.companyid 
		from dealreg.org.program p with (nolock)
		join dealreg.org.programcompany pc with (nolock) on p.programid = pc.programid
		join partnerportal.sec.useraccount ua with (nolock) on ua.userid = @LoginUserID and ua.companyid = pc.companyid
		where p.programid = @ProgramID
		and pc.PartnerLevel = 'D'
		and pc.isactive = 1



		--06/15/2018
		if exists (select 1
					from dealreg.org.program p with (nolock)
					join dealreg.org.programcompany pc with (nolock) on p.programid = pc.programid
					join partnerportal.sec.useraccount ua with (nolock) on ua.userid = @LoginUserID and ua.companyid = pc.companyid
					where p.programid = @ProgramID
					and pc.PartnerLevel = 'R'
					and pc.isactive = 1
					--and p.MultiDistiFormID = @UDFormID
					)
				select @isResellerCompany = 1



        SET @isReadonlyStatus = 0

        DECLARE @eval TABLE
          (
             UDFieldID   INT,
             MaptoTable  NVARCHAR(150),
             MaptoColumn NVARCHAR(150),
             Datavalue   VARCHAR(max),
             Rownum      INT,
             GridTypeID  INT
          )
        DECLARE @UDFormField TABLE
          (
             UDFormId        INT,
             UDFieldId       INT,
             Position        INT,
             isReadonly      BIT,
             formisrequired  BIT,
             FieldLabel      NVARCHAR(200),
             FieldName       VARCHAR(100),
             FieldType       VARCHAR(50),
             Value           NVARCHAR(max),
             DropDownValue   NVARCHAR(max),
             DataType        VARCHAR(50),
             isUnique        BIT,
             fieldisrequired BIT,
             isDateCheck     BIT,
             isNumericCheck  BIT,
             isEmailCheck    BIT,
             LookUpSchema    VARCHAR(50),
             LookUpTable     VARCHAR(50),
             LookUpColumn    VARCHAR(50),
             LookUpIDColumn  VARCHAR(50),
             [Description]   VARCHAR(200),
             ObjectID        INT,
             OrgID           INT,
             FieldLength     INT,
             FieldDecimal    INT,
             isAdmin         BIT,
             hasDependent    BIT,
             isDependent     BIT,
             ParentUDfieldID INT,
             MapTotable      NVARCHAR(200),
             MaptoColumn     NVARCHAR(200),
             Prefix          VARCHAR(20),
             isHidden        BIT,
             UDFormBlockID   INT,
             ParentPosition  INT,
             ClassName       VARCHAR(120),
             Datacomponent   VARCHAR(120),
             DataFormat      VARCHAR(120),
             GridTypeID      INT,
             GridType        VARCHAR(50),
             isForReview     BIT,
             CssStyle        VARCHAR(max),
             DataAttribute   NVARCHAR(max),
             Options         NVARCHAR(max),
             HelperText      NVARCHAR(max),
             isForAudit      BIT,
             isRemovable     BIT,
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
             UDFieldID INT,
             num       INT
          )

        --10/30/2014 Start
        SELECT @isActive = isActive
        FROM   Org.Registration
        WHERE  RegID = @RegID

        SELECT @Dealmin = TotalDealMinimum
        FROM   dealreg.org.Program
        WHERE  ProgramID = @ProgramID--12/24/2014
        SELECT @Minval = ProductMinimum
        FROM   dealreg.org.Program
        WHERE  ProgramID = @ProgramID--03/08/2017
        SELECT @Maxval = ProductMaximum
        FROM   dealreg.org.Program
        WHERE  ProgramID = @ProgramID--03/08/2017

		set @minmax = '' + convert(varchar(20), coalesce(@Minval,0) ) + ',' + convert(varchar(20), coalesce(@Maxval, 0)) + '' --10/18/2018


        IF @isActive = 1
          BEGIN
              INSERT INTO @EVAL
              EXEC Org.[Usp_getregistration]
                @RegID,
				@LoginUserID, --04/17/2018
                @ProgramStatusID output
          END

        --10/26/2015--
        IF ( @OperationFlag = 'Renew' )
          BEGIN
              SELECT @isRenew = 1
          END
        ELSE IF ( @isRenew = 0 )
          BEGIN
              SELECT @isRenew = isRenew
              FROM   org.Programstatus
              WHERE  ProgramStatusID = @ProgramStatusID
          END

        --10/26/2015--
        IF ( @OperationFlag = 'Close' )
          BEGIN
              SELECT TOP 1 @ProgramStatusID = ProgramStatusID
              FROM   org.ProgramStatus
              WHERE  programid = @ProgramID
                     AND IsClosed = 1
          END

        IF ( @OperationFlag = 'Revision' )
          BEGIN
              SELECT @RevisionStatusID = ProgramStatusID
              FROM   org.ProgramStatus
              WHERE  ProgramID = @ProgramID
                     AND IsRevision = 1
                     AND IsSubmitted = 1
          END

        SELECT @SecurityRoleTypeID = sr.SecurityRoleTypeID,
               @LangID = LangID,
               @SecurityRoleId = ua.RoleID
        FROM   sec.Useraccount ua
               INNER JOIN sec.Securityrole sr
                       ON sr.SecurityRoleId = ua.RoleID
        WHERE  ua.userid = @LoginUserID

        SELECT @isReadonlyStatus = CASE
                                     WHEN ( IsApproved = 1
                                             OR IsDenied = 1
                                             OR IsClosed = 1
                                             OR isExpired = 1
                                             OR isPending = 1 ) THEN 1
                                     ELSE 0
                                   END,
               @isDraft = isDraft
        FROM   org.ProgramStatus
        WHERE  ProgramStatusID = @ProgramStatusID

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
             UserID       INT,
             EmailAddress NVARCHAR(MAX),
             AllowEdit    BIT
          )

        SELECT @ObjectID = o.ObjectID,
               @ModuleID = mo.ModuleID
        FROM   dbo.Object o
               INNER JOIN PartnerPortal.dbo.ModuleObject mo
                       ON o.ObjectID = mo.ObjectID
        WHERE  ObjectName = 'Deal Registration'

        IF( EXISTS(SELECT 1
                   FROM   PartnerPortal.org.ApprovalHierarchy
                   WHERE  ProgramID = @ProgramID
                          AND ObjectID = @ObjectID) )
          BEGIN
              SET @HasApprovalLogic = 1

              SELECT @NextApprovalLevelID = NextApproverID
              FROM   org.Registration
              WHERE  RegID = @RegID

              /* cmrAshwin - for approval logic */
              EXEC [Org].[Usp_getusersforapprovalprogram]
                @ProgramID = @ProgramId,
                @ObjectID = @ObjectID,
                @NextApprovalLevel = @NextApprovalLevelID,
                @Output = @OUTPUT output

              INSERT INTO @Users
                          (UserID,
                           EmailAddress,
                           AllowEdit)
              SELECT Record.Col.value('@UserID', 'INT'),
                     Record.Col.value('@EmailAddress', 'NVARCHAR(max)'),
                     Record.Col.value('@AllowEdit', 'BIT')
              FROM   @OUTPUT.nodes('DATA/Users') AS Record(Col)

              /* User approval verification */
              DECLARE @AllowEdit BIT = NULL

              SELECT @userHasRights = 1,
                     @AllowEdit = AllowEdit
              FROM   @Users
              WHERE  UserID = @LoginUserID;

              DECLARE @IsFinalStep BIT = 0;

              SELECT @IsFinalStep = IsFinalStep
              FROM   PartnerPortal.org.ApprovalHierarchy
              WHERE  ApprovalLevel = (SELECT ApprovalLevel
                                      FROM   org.Registration
                                      WHERE  RegID = @RegID)
                     AND ProgramID = @ProgramID
                     AND ObjectID = @ObjectID;

              IF ( @userHasRights = 1
                   AND 1 <> @IsFinalStep )
                  OR ( @isReadonlyStatus = 0 )
                  OR ( @AllowEdit = 1 ) -- cmrAshwin_20160513_1118: It was @AHisReadonlyStatus = 0
                SET @AHIsReadOnlyStatus = 0
              ELSE
                SET @AHIsReadOnlyStatus = 1
          --05/12/2016
          END

        INSERT INTO @UDFormField
        SELECT UF.UDFormId,
               UFF.UDFieldId,
               UFF.Position,
               CASE
                 WHEN @HasApprovalLogic = 1 THEN @AHIsReadOnlyStatus
                 WHEN fr.isreadonly IS NOT NULL THEN fr.isReadonly
                 WHEN ufs.isRenew = 1 THEN 0
                 WHEN @SecurityRoleTypeID = 2
                      AND udf.isNewRequest = 0
                      AND @OperationFlag = 'Close' THEN 0 --10/27/2015
                 When @SecurityRoleTypeID = 2 AND @isReadonlyStatus = 1 THEN 1
                 WHEN uff.isReadonly = 0
                      AND fs.SecurityLevelID = 3 THEN 0
                 ELSE 1
               END AS isReadonly,
               CASE
                 WHEN UFF.isRequired = 1
                       OR UDF.isRequired = 1 THEN 1
                 ELSE 0
               END formisrequired --not used in form for is required 
               ,
               COALESCE (uffl.Labeltext, uff.FieldLabel),
               UDF.FieldName,
               UDF.FieldType,
               UDF.Value,
               UDF.DropDownValue,
               UDF.DataType,
               UDF.isUnique,
               UDF.isrequired fieldisrequired --used in form for is required 
               ,
               UDF.isDateCheck,
               udf.isNumericCheck,
               udf.isEmailCheck,
               udf.LookUpSchema,
               udf.LookUpTable,
               udf.LookUpColumn,
               udf.LookUpIDColumn,
               COALESCE(uffl.LabelDescription, uff.[Description], udf.Description) [Description],
               udf.ObjectID,
               udf.OrgID,
               udf.FieldLength,
               udf.FieldDecimal,
               udf.isAdmin,
               udf.hasDependent,
               udf.isDependent,
               udf.ParentUDFieldid,
               udf.MapToTable,
               udf.MaptoColumn,
               CASE
                 WHEN DataType = 'Currency' THEN @Prefix
                 ELSE NULL
               END                                                                 Prefix,
               UFF.isHidden,
               UFF.UDFormBlockID,
               ufb.Position,
               uff.ClassName,
               udf.Datacomponent,
               udf.DataFormat,
               udf.GridTypeID,
               gt.GridType,
               udf.isForReview,
               uff.CssStyle,
               uff.DataAttribute,
               uff.Options,
               uff.HelperText,
               gt.isforAudit,
               
			   --ps.IsApproved, crd.orgid dorgid, crr.orgid rorgid,gt.isRemovable gtisRemovable, @isReadonlyStatus isReadonlyStatus, gt.GridTypeID gt_gridtypeid, udf.GridTypeID udf_gridtypeid,
			   --gt.isRemovable,
			   --client rules: 
			   --1) JABRA: allow (yes/no) edit for approved status: Distributor(no), Reseller(yes) and Reseller Sales Director(yes)
			   --1) KYOCERA: allow (yes/no) edit for approved status: Distributor(no), Reseller(no) and Reseller Sales Director(no)
			   case when ps.IsApproved = 1 and crd.orgid is not null then crd.IsRemovable
					when ps.IsApproved = 1 and crr.orgid is not null then crr.IsRemovable
					when crd.orgid is null and crr.orgid is null and @isReadonlyStatus = 1 and @SecurityRoleTypeID = 2 then 0 
					else gt.isRemovable 
				end isRemovable,
               CASE
				WHEN @HasApprovalLogic = 1 THEN @AHIsReadOnlyStatus
                 WHEN fr.isreadonly IS NOT NULL THEN 1
                 WHEN ufs.isRenew = 1 THEN 2
                 WHEN @SecurityRoleTypeID = 2
                      AND udf.isNewRequest = 0
                      AND @OperationFlag = 'Close' THEN 3 --10/27/2015
                 WHEN @SecurityRoleTypeID = 2 THEN 4
                 WHEN uff.isReadonly = 0
                      AND fs.SecurityLevelID = 3 THEN 5
                 ELSE 6
               END AS isReadonly2
        FROM   org.Udform UF
        INNER JOIN org.Udformfield UFF
                ON UFF.UDFormID = UF.UDFormId
        INNER JOIN org.Udfield UDF
                ON UDF.UDFieldId = UFF.UDFieldID
		LEFT JOIN org.formtypeudfield ftuf
			ON uf.formtypeid = ftuf.formtypeid
			AND udf.udfieldid = ftuf.udfieldid
			AND udf.objectid = ftuf.objectid
        LEFT JOIN org.Udformblock ufb
                ON ufb.UDFormBlockID = uff.UDFormBlockID
        LEFT JOIN org.UDformSection ufs
                ON ufs.UDFormSectionID = ufb.UDFormSectionID
        LEFT JOIN dbo.Gridtype gt
                ON gt.GridTypeID = udf.GridTypeID
        LEFT JOIN org.Udformfieldlabel uffl
                ON uffl.UDformid = UFF.UDformid
                    AND uffl.LabelKey = uff.FieldLabel
                    AND uffl.langID = @LangID
        INNER JOIN sec.Uf_fieldsecurityforuser(@LoginUserID) fs
                ON fs.UDFieldID = udf.UDFieldId
                    AND fs.SecurityLevelID > 1
        LEFT JOIN org.[Uf_udfieldreadonly](CASE
                                            WHEN @OperationFlag = 'Revision' THEN @RevisionStatusID
                                            ELSE @ProgramStatusID
                                            END, @SecurityRoleId) fr --02/10/2015 --11/03/2015
                ON fr.UDfieldid = udf.udfieldid
		--11/15/2018
		join org.programstatus ps with (nolock) on ps.programstatusid = @ProgramStatusID
		left join @clientRule crd on crd.orgid = UF.OrgID and crd.ExternalSecurityRoleType = 'D' and crd.ProgramStatus = ps.StatusName and @distiCompanyID is not null	--11/15/2018
		left join @clientRule crr on crr.orgid = UF.OrgID and crr.ExternalSecurityRoleType = 'R' and crr.ProgramStatus = ps.StatusName and @isResellerCompany = 1		--11/15/2018
		
        WHERE  UF.OrgID = @OrgID
               AND uf.UDFormId = @UDFormID
               AND udf.isConfig = 1
               AND udf.isNewRequest IN ( @isDraft, CASE
                                                     WHEN @isDraft = 0 THEN 1
                                                     ELSE 1
                                                   END )--10/27/2015 to hide not new request field for draft status
               AND udf.isAdmin IN ( 0, CASE
                                        WHEN @isDraft = 0 AND @SecurityRoleTypeID = 1 THEN 1
										--when @isResellerCompany = 1 then 1 --06/15/2018
                                        ELSE 0
                                       END )--Changes later 1/22/2014



        DECLARE @LookUp TABLE
          (
             id             INT IDENTITY (1, 1),
             LookUpSchema   VARCHAR(50),
             LookUpTable    VARCHAR(50),
             LookUpColumn   VARCHAR(50),
             LookUpIDColumn VARCHAR(50),
             UDFieldID      INT,
             isDependent    INT
          )

        INSERT INTO @LookUp
        SELECT LookUpSchema,
               LookUpTable,
               LookUpColumn,
               LookUpIDColumn,
               UDFieldID,
               isdependent
        FROM   @UDFormField
        WHERE  LookUpTable IS NOT NULL
               AND DataType = 'DropDown'

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
              SELECT @LookUpSchema = LookUpSchema,
                     @LookUpTable = LookUpTable,
                     @LookUpColumn = LookUpColumn,
                     @LookUpIDColumn = LookUpIDColumn,
                     @udFieldID = udFieldID,
                     @isDependent = isDependent
              FROM   @LookUp
              WHERE  id = @min

              PRINT 'MAX:' + Cast(@max AS VARCHAR) + ' MIN:'
                    + Cast(@min AS VARCHAR) + ' UDFieldID:'
                    + Cast(@udFieldID AS VARCHAR)

              IF @isDependent = 1
                BEGIN
                    ---Add SVlookUpschema for Block dependency 
                    SELECT @udFieldDependency = udFieldDependency,
                           @FilterField = AssignedValue,
                           @MapToCLoumnDependency = uf.MaptoColumn--10/27/2015
                           ,
                           @MaptoTableDependency = uf.MapToTable--10/27/2015
                    FROM   org.Udfielddependency ufd
                           INNER JOIN org.UDfield uf
                                   ON uf.udfieldid = ufd.udFieldDependency
                    WHERE  ufd.UDFieldid = @udFieldID
                           AND ufd.SVlookUpschema IS NULL

                    SELECT @value = CASE
                                      WHEN @MapToCLoumnDependency = 'ProgramStatusID'
                                           AND @MaptoTableDependency = 'RegistrationStatus' THEN COALESCE(Cast(@ProgramStatusID AS VARCHAR(20)), Datavalue)--10/27/2015
                                      ELSE Datavalue
                                    END
                    FROM   @eval
                    WHERE  UDFieldID = @udFieldDependency

					--Disti Contact Company -- 09/21/2021
					declare @distiRegCompany varchar(max)
					select	@distiRegCompany = datavalue from @EVAL where maptotable = 'RegistrationContact' and MaptoColumn = 'DistributorID' 

					select @value = case
                            when @LookUpSchema = 'Org' and @LookUpTable = 'Contact' and @LookUpColumn = 'ContactID' and @LookUpIDColumn = 'CompanyID' 
											then @distiRegCompany		
							else @value						
                            end

                END
				print @Value


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
                @RegID = @RegID ----06292016  to populate disti in form with data even if unmapped with reseller

              SET @min +=1

              SELECT @Keyvalue = @Keyvalue + Keyvalue + ',' + DataValue + ';'
              FROM   @DropDownData

              INSERT INTO @DropDownData2
              VALUES      (@Keyvalue,
                           @UDFieldID,
                           (SELECT Count(Keyvalue)
                            FROM   @DropDownData) )

              SET @Keyvalue = ''

              DELETE FROM @DropDownData

              SET @Value= NULL
              SET @FilterField = NULL
          END

        UPDATE A
        SET    A.value = e.Datavalue
        FROM   @UDFormField a
               INNER JOIN @EVAL e
               ON e.UDFieldID = a.udfieldid

		UPDATE A
        SET    A.value = e.Datavalue
        FROM   @UDFormField a
               INNER JOIN @EVAL e
                       --ON e.UDFieldID = a.udfieldid
					   on e.maptotable = a.maptotable --04/09/2018
					   and e.MaptoColumn = a.MaptoColumn --04/09/2018
		where e.maptotable = 'RegistrationContact' 
		and e.maptocolumn like 'Distributor%'
		and e.Rownum in (select rownum from @EVAL where maptotable = 'RegistrationContact' and maptocolumn = 'DistributorID' and datavalue = @distiCompanyID) --04/09/2018

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


        UPDATE A
        SET	A.DropDownValue = dw.keyvalue
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
			--				  WHEN DW.num = 1 THEN 1
			--				  ELSE A.isReadonly
			--				END
		
			--,A.FieldType = CASE
			--				 WHEN DW.num = 1 THEN 'TEXT'
			--				 ELSE A.FieldType
			--			   END 
        FROM   @UDFormField a
               INNER JOIN @DropDownData2 DW
                       ON DW.UDFieldID = a.udfieldid


        --   UPDATE @UDFormField
        -- SET   value =  Substring (DropDownValue,  Patindex('%,%', DropDownValue) + 1 ,(Patindex('%;%', DropDownValue)-Patindex('%,%', DropDownValue)-1))
        --,DropDownValue = Substring (DropDownValue, 1, ( Patindex('%,%', DropDownValue) - 1 ))
        --             ,isReadonly = 1
        --       ,FieldType =  'TEXT'
        --      FROM   @UDFormField
        --Where len(DropDownValue) - len(replace(DropDownValue,',',''))  = 1
        --*******************************************************END changes dropdown to text if drodown has one value*******************************************
        --10/13/2014 Start
        SELECT uf.[UDFormId],
               [OrgID],
               [FormTypeID],
               [UDFormGUID],
               [ProgramID],
               COALESCE(ufl.[Labeltext], uf.[Name])             NAME,
               [isDeleted],
               [isPublished],
               COALESCE(ufl.[LabelDescription], uf.Description) Description,
               [ClassName],
               [CustomStyle],
               [DefaultStyle],
               [isDefaultStyle],
               [CssStyle],
               [AdminStyle],
               [PartnerStyle],
               [DataAttribute],
               [Options],
               uf.[CreateUser],
               uf.[CreateDate],
               uf.[ModifyUser],
               uf.[ModifyDate],
               [isExternal]
        FROM   [Org].[Udform] uf
               LEFT JOIN org.Udformlabel ufl
                      ON ufl.udformID = uf.UDformID
                         AND Ufl.LabelKey = uf.NAME
                         AND ufl.LangID = @LangID
        WHERE  uf.UDformID = @UDFormID

        --10/13/2014 end
        SELECT ufa.[UDFormAreaID],
               ufa.[UDFormID],
               COALESCE(ufal.Labeltext, ufa.[Name])               AS [Name],
               ufa.[Type],
               ufa.[Position],
               ufa.[isAdmin],
               ufa.[CssStyle],
               ufa.[DataAttribute],
               ufa.[Options],
               ufa.[DataRole],
               ufa.[ClassName],
               COALESCE(ufal.LabelDescription, ufa.[Description]) [Description],
               ufa.[isActive]
        FROM   org.Udformarea ufa
               LEFT JOIN org.Udformarealabel ufal
                      ON ufal.UDFormID = ufa.UDFormID
                         AND ufal.LabelKey = ufa.NAME
                         AND ufal.langid = @LangID
        WHERE  Ufa.UDformID = @UDFormID
               AND isactive = 1
        ORDER  BY Position

        --	--07/10/2014 end isrenew section
        --Declare @isRenew bit = 0
        --Select @isRenew = Case
        --                        WHen Value <= CURRENT_TIMESTAMP+14 then 1
        --						Else 0
        --						END
        --from @UDFormField  WHERE  MaptoColumn = 'ExpirationDate' AND MapToTable = 'Registration'
        ----Select  @isRenew isRenew
        ----07/70/2014 end isrenew section 
        SELECT ufs.[UDFormSectionID],
               ufs.[UDFormID],
               ufs.[UDFormAreaID],
               COALESCE(ufsl.labelText, ufs.[Name])               AS [Name],
               ufs.[Type],
               ufs.[Position],
               ufs.[isAdmin],
               ufs.[CssStyle],
               ufs.[DataAttribute],
               ufs.[Options],
               ufs.[DataRole],
               ufs.[ClassName],
               COALESCE(ufsl.LabelDescription, ufs.[Description]) [Description],
               ufs.[isActive],
               ufs.[isRenew],
               ufa.position                                       AS ParentPosition
        FROM   org.Udformsection ufs
               INNER JOIN org.Udformarea ufa
                       ON ufa.UDFormAreaID = ufs.UDFormAreaID
               LEFT JOIN org.Udformsectionlabel ufsl
                      ON ufsl.UDFormID = ufs.UDFormID
                         AND ufsl.LabelKey = ufs.NAME
                         AND ufsl.langid = @LangID
        WHERE  ufs.UDformID = @UDFormID
               AND ufs.isActive = 1
               AND ufs.isAdmin IN ( 0, CASE
                                         WHEN @isDraft = 0
                                              AND @SecurityRoleTypeID = 1 THEN 1
                                         ELSE 0
                                       END )
               AND isRenew IN ( 0, @isRenew )
        ORDER  BY ufs.Position

        SELECT ufb.[UDFormBlockID],
               ufb.[UDFormID],
               ufb.[UDFormSectionID],
               COALESCE(ufbl.labeltext, ufb.[Name])               AS [Name],
               ufb.[Type],
               ufb.[Position],
               ufb.[isAdmin],
               ufb.[CssStyle],
               ufb.[DataAttribute],
               ufb.[Options],
               ufb.[DataRole],
               ufb.[ClassName],
               COALESCE(ufbl.LabelDescription, ufb.[Description]) [Description],
               ufb.[isActive],
               ufs.position                                       AS ParentPosition
        FROM   org.Udformblock ufb
               INNER JOIN org.Udformsection ufs
                       ON ufs.UDFormSectionID = ufb.UDFormSectionID
               LEFT JOIN org.Udformblocklabel ufbl
                      ON ufbl.UDFormID = ufb.UDFormID
                         AND ufbl.LabelKey = ufb.NAME
                         AND ufbl.langid = @LangID
        WHERE  ufb.UDformID = @UDFormID
               AND ufb.isActive = 1
        ORDER  BY ufb.Position


        SELECT *
        FROM   @UDFormField udf
        WHERE  udf.UDfieldid = ParentUDfieldID
        ORDER  BY position

        SELECT *
        FROM   @UDFormField
        WHERE  UDfieldid <> ParentUDfieldID
        ORDER  BY position

        SELECT DISTINCT UDF.[UDFieldId],
                        COALESCE(udfgl.Labeltext, udgf.FieldLabel, FieldName) AS FieldLabel,
                        [FieldType]
                        --Cast (COALESCE(UDGF.isReadOnly, 0) AS BIT)       AS isReadOnly
                        ,
                        CASE
                          WHEN UDF.[UDFieldId] = 393
                               AND @OperationFlag = 'Revision'
                               AND @UDFormID = 2119 THEN Cast(0 AS BIT) --cmrAshwin:Temporary fix only for UAG
                          WHEN fr.isreadonly IS NOT NULL THEN fr.isReadonly
                          WHEN gt.isforAudit = 1 THEN Cast (1 AS BIT)
                          WHEN fs.SecurityLevelID IN( 1, 2 ) THEN Cast (1 AS BIT) --10/27/2015
                          WHEN @SecurityRoleTypeID = 2 THEN @isReadonlyStatus
                          WHEN udgf.isReadonly = 0
                               AND fs.SecurityLevelID = 3 THEN Cast(0 AS BIT)
                          ELSE Cast (1 AS BIT)
                        END                                                   AS isReadonly,
                        [DataType],
                        udgf.[ValidationFunction],
                        [Value],
                        [MapToSchema],
                        [MapToTable],
                        [MaptoColumn],
                        [isUnique],
                        CASE
                          WHEN udgf.isrequired = 1
                                OR UDF.[isRequired] = 1 THEN 1
                          ELSE 0
                        END                                                   AS IsRequired,
                        [isDateCheck],
                        [isNumericCheck],
                        [isEmailCheck],
                        [LookUpSchema],
                        [LookUpTable],
                        [LookUpColumn],
                        [LookUpIDColumn],
                        COALESCE(udfgl.LabelDescription, UDF.[Description])   [Description],--change 08/26/2014 
                        UDF.[ObjectID],
                        UDF.[OrgID],
                        [FieldLength],
                        [FieldDecimal],
                        isConfig,
                        udgf.isAdmin,
                        Cast(COALESCE(udgf.isVisible, 0) AS BIT)              AS IsVisible,
                        udgf.HasTotal,
                        DropDownValue,
                        CASE
                          WHEN UDGF.UDFieldID IS NOT NULL THEN 1
                          ELSE 0
                        END                                                   AS isInUse,
                        udgf.ParentUDFieldID,
                        HasDependent,
                        isdependent,
                        Position,
                        COALESCE(udgf.isKey, Cast(0 AS BIT))                  isKey,
                        udgf.IsForReview,
                        NULL                                                  ClassName
                        --Added case statements for Product Grid validation 03142017--Megha Bhagat
                         ,CASE
                          WHEN udgf.Datacomponent LIKE '%dealmin%' THEN Replace(COALESCE(udgf.DataComponent, udf.Datacomponent), 'dealmin', 'dealmin:'
                                                                                                                                            + Cast(COALESCE(@Dealmin, '') AS VARCHAR(40)))
                          ELSE ''
                        END
                        + ''
						+ CASE
                          WHEN udgf.Datacomponent LIKE '%minmax%' 
						  THEN Replace(COALESCE(udgf.DataComponent, udf.Datacomponent), 'minmax', 'minmax:'                                                                         + COALESCE(@minmax, ''))
                          ELSE udgf.Datacomponent
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
						AS Datacomponent--12/24/2014--04/23/2015
                        ,
                        CASE
                          WHEN fr.isreadonly IS NOT NULL THEN 1
                          WHEN gt.isforAudit = 1 THEN 2
                          WHEN fs.SecurityLevelID IN( 1, 2 ) THEN fs.SecurityLevelID --10/27/2015
                          WHEN @SecurityRoleTypeID = 2 THEN 3
                          WHEN udgf.isReadonly = 0
                               AND fs.SecurityLevelID = 3 THEN 4
                          ELSE 5
                        END                                                   AS isReadonly2
        FROM   dbo. Gridtypeobject gto
               INNER JOIN dbo.Gridtype gt
                       ON gt.GridTypeID = gto.GridTypeID
               INNER JOIN org.Udfield UDF
                       ON UDF.ObjectID = gto.ObjectID
               INNER JOIN Org.Udformgridfield udgf
                       ON udgf.UDFieldID = udf.UDFieldId
                          AND udgf.UDFormid = @UDFormID
                          AND udgf.ParentUDFieldID = udf.ParentUDFieldid
               LEFT JOIN sec.Uf_fieldsecurityforuser(@LoginUserID) fs
                      ON fs.UDFieldID = udgf.UDFieldId
                         AND fs.SecurityLevelID > 1
               LEFT JOIN Org.Udformgridfieldlabel udfgl
                      ON udfgl.UDFormID = udgf.UDFormID
                         AND udfgl.LabelKey = udgf.FieldLabel
                         AND udfgl.UDFormID = udgf.UDFormID
                         AND udfgl.LangID = @LangID
               LEFT JOIN org.Uf_udfieldreadonly(CASE
                                                  WHEN @OperationFlag = 'Revision' THEN @RevisionStatusID
                                                  ELSE @ProgramStatusID
                                                END, @SecurityRoleId) fr --02/10/2015
                      ON fr.UDfieldid = udf.udfieldid
        WHERE  ( UDF.OrgID = @OrgID
                  OR UDF.OrgID IS NULL )
               AND UDF.isConfig = 1
               AND udf.ParentUDFieldid <> udf.UDFieldId
               AND UDGF.isVisible = 1
               AND udgf.isAdmin IN ( 0, CASE @SecurityRoleTypeID
                                          WHEN 1 THEN 1
                                          ELSE 0
                                        END )
               AND udgf.IsForReview IN ( 0, CASE @SecurityRoleTypeID
                                              WHEN 1 THEN 1
                                              ELSE 0
                                            END )
        ORDER  BY Position

        SELECT Row_number()
                 OVER(
                   ORDER BY (SELECT 0)) AS id,
               UDfieldid,
               MapTotable,
               MaptoColumn,
               Datavalue,
               RowNUm,
               GridTypeID,
               NULL                     RowCss
        FROM   (SELECT DISTINCT *
                FROM   @eval
                WHERE  rownum IS NOT NULL
                       AND UDfieldid IS NOT NULL
					   and gridtypeid is not null --20180628
					   ) griddata
        ORDER  BY Rownum
    -- AND uf.UDFormId = (SELECT Max(UDFormId)
    -- FROM   org.UDForm)
    --11/09/2012 Temporary fix to get data for one form 
    --it will be filtered by application for the form type 
    --END


    END try
    BEGIN Catch ;
        THROW
    END Catch 



