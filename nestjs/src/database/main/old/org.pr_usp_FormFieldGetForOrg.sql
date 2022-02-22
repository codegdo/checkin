USE [PartnerPortal]

go

/****** Object:  StoredProcedure [Org].[Usp_formfieldgetfororg]    Script Date: 2/21/2022 9:10:03 AM ******/
SET ansi_nulls ON

go

SET quoted_identifier ON

go

--exec sp_executesql N'EXEC Org.USP_FormFieldGetForOrg @OrgId, @formId, @loginUserId',N'@OrgId int,@formId int,@loginUserId int',@OrgId=36,@formId=86,@loginUserId=1187
--exec [Org].[Usp_formfieldgetfororgv1_1_0] 50,261,1331,null
ALTER PROCEDURE [Org].[Usp_formfieldgetfororg](@OrgID       INT,
                                               @UDFormID    INT,
                                               @LoginUserID INT,
                                               @ProgramID   INT = NULL)
WITH EXECUTE AS 'PartnerPortalSpUser'
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
08/26/2014     Cmr DBA          Add fieldDescription Localization   
10/13/2014     cmr DBA          Form Description and Name Localization
07/20/2017    cmrArturo    Added DataAttribute and Option fields for UDFormArea, UDFormSection and  UDFormBlock
                Added DataAttribute, Options, AdminStyle and PartnerStyle to UDForm
                Added DataAttribute, HelperText and Options to UDFormField
****************************************************************/
AS
    DECLARE @Prefix             VARCHAR(2),
            @LangID             INT,
            @formType           VARCHAR(255),
            @SecurityRoleTypeID INT
    DECLARE @UDFormField TABLE
      (
         udformid        INT,
         udfieldid       INT,
         position        INT,
         isreadonly      BIT,
         formisrequired  BIT,
         fieldlabel      VARCHAR(200),
         fieldname       VARCHAR(100),
         fieldtype       VARCHAR(50),
         value           NVARCHAR(2000),
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
         maptotable      VARCHAR(100),
         [description]   VARCHAR(200),
         objectid        INT,
         orgid           INT,
         fieldlength     INT,
         fielddecimal    INT,
         isadmin         BIT,
         hasdependent    BIT,
         isinuse         BIT DEFAULT 1,
         isdependent     BIT,
         parentudfieldid INT,
         prefix          VARCHAR(20),
         ishidden        BIT,
         udformblockid   INT,
         parentposition  INT,
         classname       VARCHAR(120),
         datacomponent   VARCHAR(120),
         dataformat      VARCHAR(120),
         gridtypeid      INT,
         gridtype        VARCHAR(50),
         formtype        VARCHAR(255),
         isforreview     BIT,
         cssstyle        VARCHAR(max),
         dataattribute   NVARCHAR(max),
         options         NVARCHAR(max),
         helpertext      NVARCHAR(max),
         isforaudit      BIT,
         isremovable     BIT
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

    SELECT @Prefix = c.currencysymbol,
           @LangID = langid,
           @SecurityRoleTypeID = sr.securityroletypeid
    FROM   sec.useraccount ua
           INNER JOIN sec.securityrole sr
           ON sr.securityroleid = ua.roleid
           LEFT JOIN dbo.currency c
           ON ua.currencyid = c.currencyid
    WHERE  ua.userid = @LoginUserID

    INSERT INTO @UDFormField
    SELECT UF.udformid,
           UFF.udfieldid,
           UFF.position,
           CASE
             WHEN uff.isreadonly = 0
                  AND fs.securitylevelid = 3 THEN 0
             ELSE 1
           END                        AS isReadonly,
           CASE
             WHEN UFF.isrequired = 1
                   OR UDF.isrequired = 1 THEN 1
             ELSE 0
           END                        formisrequired,
           COALESCE(uffl.labeltext, uff.fieldlabel),
           UDF.fieldname,
           UDF.fieldtype,
           UDF.value,
           UDF.dropdownvalue,
           UDF.datatype,
           UDF.isunique,
           UDF.isrequired             fieldisrequired,
           UDF.isdatecheck,
           udf.isnumericcheck,
           udf.isemailcheck,
           udf.lookupschema,
           udf.lookuptable,
           udf.lookupcolumn,
           udf.lookupidcolumn,
           udf.maptotable,
           COALESCE(uffl.labeldescription, uff.[description], udf.description)
                                      [Description],
           udf.objectid,
           udf.orgid,
           udf.fieldlength,
           udf.fielddecimal,
           udf.isadmin,
           udf.hasdependent,
           1,
           udf.isdependent,
           udf.parentudfieldid,
           CASE
             WHEN datatype = 'Currency' THEN @Prefix
             ELSE NULL
           END                        Prefix,
           UFF.ishidden,
           UFF.udformblockid,
           ufb.position,
           uff.classname,
           udf.datacomponent,
           udf.dataformat,
           udf.gridtypeid,
           gt.gridtype,
           ft.formtypename,
           UdF.isforreview,
           uff.cssstyle,
           uff.dataattribute,
           uff.options,
           uff.helpertext,
           COALESCE(gt.isforaudit, 0) isForAudit,
           gt.isremovable
    FROM   org.udform UF
           INNER JOIN formtype ft
                   ON ft.formtypeid = uf.formtypeid
           INNER JOIN org.udformfield UFF
                   ON UFF.udformid = UF.udformid
           INNER JOIN org.udfield UDF
                   ON UDF.udfieldid = UFF.udfieldid

           LEFT JOIN org.formtypeudfield ftuf
                  ON ft.formtypeid = ftuf.formtypeid
                     AND udf.udfieldid = ftuf.udfieldid
                     AND udf.objectid = ftuf.objectid

           LEFT JOIN org.udformblock ufb
                  ON ufb.udformblockid = uff.udformblockid
                     AND ufb.isactive = 1
           LEFT JOIN org.udformfieldlabel uffl
                  ON uffl.udformid = UFF.udformid
                     AND uffl.labelkey = uff.fieldlabel
                     AND uffl.langid = @LangID

           LEFT JOIN dbo.gridtype gt
                  ON gt.gridtypeid = udf.gridtypeid
                  
           INNER JOIN sec.Uf_fieldsecurityforuser(@LoginUserID) fs
                   ON fs.udfieldid = udf.udfieldid
                      AND fs.securitylevelid > 1
    WHERE  UF.orgid = @OrgID
           AND uf.udformid = @UDFormID
           AND udf.isconfig = 1-- AND ua.Userid = @LoginUserID
           AND uff.isadmin IN ( 0, CASE @SecurityRoleTypeID
                                     WHEN 1 THEN 1
                                     ELSE 0
                                   END )
           AND uff.isforreview = 0

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

    DECLARE @max            INT,
            @min            INT = 1,
            @udFieldID      INT,
            @LookUpSchema   VARCHAR(50),
            @LookUpTable    VARCHAR(50),
            @LookUpColumn   VARCHAR(50),
            @LookUpIDColumn VARCHAR(50),
            @Keyvalue       VARCHAR(max) = '',
            @DataValue      VARCHAR(max) = '',
            @isDependent    BIT = 0

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
            @Value = NULL,
            @orgID = @OrgID,
            @FilterField = NULL

          SET @min +=1

          SELECT @Keyvalue = @Keyvalue + keyvalue + ',' + datavalue + ';'
          FROM   @DropDownData

          --Select  @DataValue = @DataValue +  DataValue + ';'  from @DropDownData
          INSERT INTO @DropDownData2
          VALUES      (@Keyvalue,
                       @UDFieldID,
                       (SELECT Count(keyvalue)
                        FROM   @DropDownData) )

          SET @Keyvalue = ''

          DELETE FROM @DropDownData
      END

    UPDATE a
    SET    a.dropdownvalue = dw.keyvalue,
           a.value = CASE
                       WHEN DW.num = 1 THEN Substring (dw.keyvalue, 1, (
                                            Patindex('%,%', dw.keyvalue)
                                            - 1 ))
                       ELSE NULL
                     END,
           a.isreadonly = CASE
                            WHEN DW.num = 1 THEN 1
                            ELSE a.isreadonly
                          END
    FROM   @UDFormField a
           INNER JOIN @DropDownData2 DW
                   ON DW.udfieldid = a.udfieldid

    SELECT uf.[udformid],
           [orgid],
           [formtypeid],
           [udformguid],
           [programid],
           COALESCE(ufl.[labeltext], uf.[name])             AS NAME,
           [isdeleted],
           [ispublished],
           COALESCE(ufl.[labeldescription], uf.description) AS Description,
           [classname],
           [customstyle],
           [defaultstyle],
           [isdefaultstyle],
           [cssstyle],
           [adminstyle] --
           ,
           [partnerstyle] --
           ,
           [dataattribute] --
           ,
           [options] --
           ,
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

    SELECT ufa.[udformareaid],
           ufa.[udformid],
           COALESCE(ufal.labeltext, ufa.[name])               AS [Name],
           ufa.[type],
           ufa.[position],
           ufa.[isadmin],
           ufa.[cssstyle],
           ufa.[dataattribute] ---
           ,
           ufa.[options] ---
           ,
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

    SELECT ufs.[udformsectionid],
           ufs.[udformid],
           ufs.[udformareaid],
           COALESCE(ufsl.labeltext, ufs.[name])               AS [Name],
           ufs.[type],
           ufs.[position],
           ufs.[isadmin],
           ufs.[cssstyle],
           ufs.[dataattribute] ----
           ,
           ufs.[options] ----
           ,
           ufs.[datarole],
           ufs.[classname],
           COALESCE(ufsl.labeldescription, ufs.[description]) [Description],
           ufs.[isactive],
           ufs.[isrenew],
           ufa.position                                       AS ParentPosition
    FROM   org.udformsection ufs
           INNER JOIN org.udformarea ufa
                   ON ufa.udformareaid = ufs.udformareaid
           LEFT JOIN org.udformsectionlabel ufsl
                  ON ufsl.udformid = ufs.udformid
                     AND ufsl.labelkey = ufs.NAME
                     AND ufsl.langid = @LangID
    WHERE  ufs.udformid = @UDFormID
           AND ufs.isactive = 1
           AND ufs.isadmin IN ( 0, CASE @SecurityRoleTypeID
                                     WHEN 1 THEN 1
                                     ELSE 0
                                   END )
           AND ufs.isrenew = 0
    ORDER  BY position

    SELECT ufb.[udformblockid],
           ufb.[udformid],
           ufb.[udformsectionid],
           COALESCE(ufbl.labeltext, ufb.[name])               AS [Name],
           ufb.[type],
           ufb.[position],
           ufb.[isadmin],
           ufb.[cssstyle],
           ufb.[dataattribute] ----
           ,
           ufb.[options] ---
           ,
           ufb.[datarole],
           ufb.[classname],
           COALESCE(ufbl.labeldescription, ufb.[description]) [Description],
           ufb.[isactive],
           ufs.position                                       AS ParentPosition
    FROM   org.udformblock ufb
           INNER JOIN org.udformsection ufs
                   ON ufs.udformsectionid = ufb.udformsectionid
           LEFT JOIN org.udformblocklabel ufbl
                  ON ufbl.udformid = ufb.udformid
                     AND ufbl.labelkey = ufb.NAME
                     AND ufbl.langid = @LangID
    WHERE  ufb.udformid = @UDFormID
           AND ufb.isactive = 1
    ORDER  BY position

    SELECT udformid,
           udfieldid,
           position,
           isreadonly,
           formisrequired,
           fieldlabel,
           fieldname,
           fieldtype,
           value,
           dropdownvalue,
           datatype,
           isunique,
           fieldisrequired,
           isdatecheck,
           isnumericcheck,
           isemailcheck,
           lookupschema,
           lookuptable,
           lookupcolumn,
           lookupidcolumn,
           maptotable,
           [description],
           objectid,
           orgid,
           fieldlength,
           fielddecimal,
           isadmin,
           hasdependent,
           isinuse,
           isdependent,
           parentudfieldid,
           prefix,
           ishidden,
           udformblockid,
           parentposition,
           classname,
           datacomponent,
           dataformat,
           gridtypeid,
           gridtype,
           formtype,
           isforreview,
           cssstyle,
           dataattribute ---
           ,
           options ---
           ,
           helpertext,
           isforaudit,
           isremovable
    FROM   @UDFormField udf
    WHERE  udf.udfieldid = parentudfieldid
    ORDER  BY position

    SELECT udformid,
           udfieldid,
           position,
           isreadonly,
           formisrequired,
           fieldlabel,
           fieldname,
           fieldtype,
           value,
           dropdownvalue,
           datatype,
           isunique,
           fieldisrequired,
           isdatecheck,
           isnumericcheck,
           isemailcheck,
           lookupschema,
           lookuptable,
           lookupcolumn,
           lookupidcolumn,
           maptotable,
           [description],
           objectid,
           orgid,
           fieldlength,
           fielddecimal,
           isadmin,
           hasdependent,
           isinuse,
           isdependent,
           parentudfieldid,
           prefix,
           ishidden,
           udformblockid,
           parentposition,
           classname,
           datacomponent,
           dataformat,
           gridtypeid,
           gridtype,
           formtype,
           isforreview,
           cssstyle,
           dataattribute ---
           ,
           options ----
           ,
           helpertext,
           isforaudit,
           isremovable
    FROM   @UDFormField
    WHERE  udfieldid <> parentudfieldid
    ORDER  BY position

    SELECT DISTINCT UDF.[udfieldid],
                    COALESCE(udfl.label, udgf.fieldlabel, fieldname)   AS
                    FieldLabel
                    ,
                    [fieldtype],
                    Cast (COALESCE(UDGF.isreadonly, 0) AS BIT)         AS
                    isReadOnly
                    ,
                    [datatype],
                    udgf.[validationfunction],
                    [value],
                    [maptoschema],
                    [maptotable],
                    [maptocolumn],
                    [isunique],
                    UDF.[isrequired],
                    [isdatecheck],
                    [isnumericcheck],
                    [isemailcheck],
                    [lookupschema],
                    [lookuptable],
                    [lookupcolumn],
                    [lookupidcolumn],
                    maptotable,
                    COALESCE(udfl.labeldescription, udf.[description])
                    [Description]
                    ,
                    UDF.[objectid],
                    UDF.[orgid],
                    [fieldlength],
                    [fielddecimal],
                    isconfig,
                    COALESCE(udgf.isadmin, 'False')                    isadmin,
                    Cast(COALESCE(udgf.isvisible, 0) AS BIT)           AS
                    IsVisible,
                    COALESCE(udgf.hastotal, 'False')                   HasTotal,
                    dropdownvalue,
                    Cast(( CASE
                             WHEN UDGF.udfieldid IS NOT NULL THEN 1
                             ELSE 0
                           END ) AS BIT)                               AS
                    isInUse,
                    COALESCE(udgf.parentudfieldid,
                    UDF.parentudfieldid)ParentUDFieldID,
                    hasdependent,
                    isdependent,
                    COALESCE(position, 0)                              Position,
                    COALESCE(udgf.iskey, 'False')                      iskey,
                    COALESCE(udgf.isforreview, 'False')
                    isforreview,
                    NULL                                               className
                    ,
                    udf.datacomponent
    FROM   dbo. gridtypeobject gto
           INNER JOIN org.udfield UDF
                   ON UDF.objectid = gto.objectid
           INNER JOIN org.udformgridfield udgf
                   ON udgf.udfieldid = udf.udfieldid
                      AND udgf.udformid = @UDFormID
                      AND udgf.parentudfieldid = udf.parentudfieldid
           LEFT JOIN org.udformfieldlabel udfl
                  ON udfl.udfieldid = udf.udfieldid
                     AND udfl.orgid = @OrgID
                     AND udfl.udformid = @UDFormID
    WHERE  ( UDF.orgid = @OrgID
              OR UDF.orgid IS NULL )
           AND UDF.isconfig = 1
           AND udf.parentudfieldid <> udf.udfieldid
           AND udgf.isvisible = 1
           AND udgf.isadmin IN ( 0, CASE @SecurityRoleTypeID
                                      WHEN 1 THEN 1
                                      ELSE 0
                                    END )
           AND udgf.isforreview = 0
    ORDER  BY position
-- AND uf.UDFormId = (SELECT Max(UDFormId)
-- FROM   org.UDForm)
--11/09/2012 Temporary fix to get data for one form 
--it will be filtered by application for the form type 
--END