USE [PartnerPortal]
GO
/****** Object:  StoredProcedure [Org].[Usp_formfieldgetfororg]    Script Date: 2/21/2022 9:10:03 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--exec sp_executesql N'EXEC Org.USP_FormFieldGetForOrg @OrgId, @formId, @loginUserId',N'@OrgId int,@formId int,@loginUserId int',@OrgId=36,@formId=86,@loginUserId=1187
--exec [Org].[Usp_formfieldgetfororgv1_1_0] 50,261,1331,null
ALTER PROCEDURE [Org].[Usp_formfieldgetfororg](@OrgID        INT
                                                     ,@UDFormID    INT
                                                     ,@LoginUserID INT
                                                     ,@ProgramID   INT = NULL)
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
07/20/2017		cmrArturo		Added DataAttribute and Option fields for UDFormArea, UDFormSection and	UDFormBlock
								Added DataAttribute, Options, AdminStyle and PartnerStyle to UDForm
								Added DataAttribute, HelperText and Options to UDFormField
****************************************************************/
AS
    DECLARE @Prefix              VARCHAR(2)
            ,@LangID             INT
            ,@formType           VARCHAR(255)
            ,@SecurityRoleTypeID INT
    DECLARE @UDFormField TABLE
      ( UDFormId         INT
       ,UDFieldId       INT
       ,Position        INT
       ,isReadonly      BIT
       ,formisrequired  BIT
       ,FieldLabel      VARCHAR(200)
       ,FieldName       VARCHAR(100)
       ,FieldType       VARCHAR(50)
       ,Value           NVARCHAR(2000)
       ,DropDownValue   NVARCHAR(max)
       ,DataType        VARCHAR(50)
       ,isUnique        BIT
       ,fieldisrequired BIT
       ,isDateCheck     BIT
       ,isNumericCheck  BIT
       ,isEmailCheck    BIT
       ,LookUpSchema    VARCHAR(50)
       ,LookUpTable     VARCHAR(50)
       ,LookUpColumn    VARCHAR(50)
       ,LookUpIDColumn  VARCHAR(50)
       ,Maptotable      VARCHAR(100)
       ,[Description]   VARCHAR(200)
       ,ObjectID        INT
       ,OrgID           INT
       ,FieldLength     INT
       ,FieldDecimal    INT
       ,isAdmin         BIT
       ,hasDependent    BIT
       ,IsInUse         BIT DEFAULT 1
       ,isDependent     BIT
       ,ParentUDfieldID INT
       ,Prefix          VARCHAR(20)
       ,isHidden        BIT
       ,UDFormBlockID   INT
       ,ParentPosition  INT
       ,ClassName       VARCHAR(120)
       ,Datacomponent   VARCHAR(120)
       ,DataFormat      VARCHAR(120)
       ,GridTypeID      INT
       ,GridType        VARCHAR(50)
       ,formtype        VARCHAR(255)
       ,isForReview     BIT
       ,CssStyle        VARCHAR(max)
	   ,DataAttribute   NVARCHAR(max)
	   ,Options         NVARCHAR(max)
	   ,HelperText      NVARCHAR(max)
       ,isForAudit      BIT
	   ,isRemovable bit)
    DECLARE @DropDownData TABLE
      ( keyvalue   VARCHAR(200)
       ,datavalue VARCHAR(200))
    DECLARE @DropDownData2 TABLE
      ( keyvalue   VARCHAR(max)
       ,UDFieldID INT
       ,num       INT)

    SELECT @Prefix = c.CurrencySymbol
           ,@LangID = LangID
           ,@SecurityRoleTypeID = sr.SecurityRoleTypeID
    FROM   sec.Useraccount ua
            Inner join sec.securityRole sr
                on sr.securityRoleid = ua.roleid
           LEFT JOIN dbo.Currency c
                  ON ua.currencyID = c.CurrencyID
    WHERE  ua.userid = @LoginUserID

    INSERT INTO @UDFormField
    SELECT UF.UDFormId
           ,UFF.UDFieldId
           ,UFF.Position
           ,CASE
              WHEN uff.isReadonly = 0 AND fs.SecurityLevelID = 3 THEN 0
              ELSE 1
            END                        AS isReadonly
           ,CASE
              WHEN UFF.isRequired = 1  OR UDF.isRequired = 1 THEN 1
              ELSE 0
            END             formisrequired 
           ,COALESCE(uffl.labeltext, uff.FieldLabel)
           ,UDF.FieldName
           ,UDF.FieldType
           ,UDF.Value
           ,UDF.DropDownValue
           ,UDF.DataType
           ,UDF.isUnique
           ,UDF.isrequired                       fieldisrequired
           ,UDF.isDateCheck
           ,udf.isNumericCheck
           ,udf.isEmailCheck
           ,udf.LookUpSchema
           ,udf.LookUpTable
           ,udf.LookUpColumn
           ,udf.LookUpIDColumn
           ,udf.Maptotable
           ,COALESCE(uffl.LabelDescription, uff.[Description],udf.Description) [Description]
           ,udf.ObjectID
           ,udf.OrgID
           ,udf.FieldLength
           ,udf.FieldDecimal
           ,udf.isAdmin
           ,udf.hasDependent
           ,1
           ,udf.isDependent
           ,udf.ParentUDFieldid
           ,CASE
              WHEN DataType = 'Currency' THEN @Prefix
              ELSE NULL
            END                        Prefix
           ,UFF.isHidden
           ,UFF.UDFormBlockID
           ,ufb.Position
           ,uff.ClassName
           ,udf.Datacomponent
           ,udf.DataFormat
           ,udf.GridTypeID
           ,gt.GridType
           ,ft.FormTypeName
           ,UdF.isForreview
           ,uff.CssStyle
		   ,uff.DataAttribute
		   ,uff.Options
		   ,uff.HelperText
           ,COALESCE(gt.isForAudit, 0) isForAudit
		   ,gt.isRemovable
    FROM   org.Udform UF
           INNER JOIN Formtype ft
                   ON ft.formtypeid = uf.FormTypeID
           INNER JOIN org.Udformfield UFF
                   ON UFF.UDFormID = UF.UDFormId
           INNER JOIN org.Udfield UDF
                   ON UDF.UDFieldId = UFF.UDFieldID
		   LEFT JOIN org.formtypeudfield ftuf
				   ON ft.formtypeid = ftuf.formtypeid
				   AND udf.udfieldid = ftuf.udfieldid
				   AND udf.objectid = ftuf.objectid
           LEFT JOIN org.Udformblock ufb
                  ON ufb.UDFormBlockID = uff.UDFormBlockID AND ufb.isActive = 1
           LEFT JOIN Org.Udformfieldlabel uffl
                  ON uffl.UDformid = UFF.UDformid AND uffl.LabelKey = uff.FieldLabel AND uffl.langID = @LangID
           LEFT JOIN dbo.Gridtype gt
                  ON gt.GridTypeID = udf.GridTypeID
           INNER JOIN sec.Uf_fieldsecurityforuser(@LoginUserID) fs
                   ON fs.UDFieldID = udf.UDFieldId AND fs.SecurityLevelID > 1
    WHERE  UF.OrgID               = @OrgID AND uf.UDFormId         = @UDFormID AND udf.isConfig       = 1-- AND ua.Userid = @LoginUserID
           AND uff.isadmin in  (0,Case @SecurityRoleTypeID
		                           When 1 then 1 
								   Else 0 
								   end )
		   AND uff.isForReview = 0

    DECLARE @LookUp TABLE
      ( id              INT IDENTITY (1, 1)
       ,LookUpSchema   VARCHAR(50)
       ,LookUpTable    VARCHAR(50)
       ,LookUpColumn   VARCHAR(50)
       ,LookUpIDColumn VARCHAR(50)
       ,UDFieldID      INT
       ,isDependent    INT)

    INSERT INTO @LookUp
    SELECT LookUpSchema
           ,LookUpTable
           ,LookUpColumn
           ,LookUpIDColumn
           ,UDFieldID
           ,isdependent
    FROM   @UDFormField
    WHERE  LookUpTable IS NOT NULL AND DataType = 'DropDown'

    DECLARE @max             INT
            ,@min            INT = 1
            ,@udFieldID      INT
            ,@LookUpSchema   VARCHAR(50)
            ,@LookUpTable    VARCHAR(50)
            ,@LookUpColumn   VARCHAR(50)
            ,@LookUpIDColumn VARCHAR(50)
            ,@Keyvalue       VARCHAR(max) = ''
            ,@DataValue      VARCHAR(max) = ''
            ,@isDependent    BIT = 0

    SELECT @max = Max(id)
    FROM   @LookUp

    WHILE @max >= @min
      BEGIN
          SELECT @LookUpSchema = LookUpSchema
                 ,@LookUpTable = LookUpTable
                 ,@LookUpColumn = LookUpColumn
                 ,@LookUpIDColumn = LookUpIDColumn
                 ,@udFieldID = udFieldID
                 ,@isDependent = isDependent
          FROM   @LookUp
          WHERE  id = @min

          INSERT INTO @DropDownData
                      (keyvalue
                       ,datavalue)
          EXEC Usp_getlookupvalue
            @LookUpSchema    = @LookUpSchema
            ,@LookUpTable    = @LookUpTable
            ,@LookUpColumn   = @LookUpColumn
            ,@LookUpIDColumn = @LookUpIDColumn
            ,@UserID         = @LoginUserID
            ,@UDFormID       = @UDFormID
            ,@ProgramID      = @ProgramID
            ,@isDependent    = @isDependent
            ,@Value          = NULL
            ,@orgID          = @OrgID
            ,@FilterField    = NULL

          SET @min +=1

          SELECT @Keyvalue = @Keyvalue + Keyvalue + ',' + DataValue + ';'
          FROM   @DropDownData

          --Select  @DataValue = @DataValue +  DataValue + ';'  from @DropDownData
          INSERT INTO @DropDownData2
          VALUES      (@Keyvalue
                       ,@UDFieldID
                       ,(SELECT Count(Keyvalue)
                         FROM   @DropDownData) )

          SET @Keyvalue = ''

          DELETE FROM @DropDownData
      END

    UPDATE A
    SET    A.DropDownValue = dw.keyvalue
           ,A.value = CASE
                        WHEN DW.num = 1 THEN Substring (dw.Keyvalue, 1, ( Patindex('%,%', dw.keyvalue) - 1 ))
                        ELSE NULL
                      END
           ,A.isReadonly = CASE
                             WHEN DW.num = 1 THEN 1
                             ELSE A.isReadonly
                           END
    FROM   @UDFormField a
           INNER JOIN @DropDownData2 DW
                   ON DW.UDFieldID = a.udfieldid

	SELECT uf.[UDFormId]
		   ,[OrgID]
		   ,[FormTypeID]
		   ,[UDFormGUID]
		   ,[ProgramID]
		   ,COALESCE(ufl.[Labeltext], uf.[Name]) as Name
		   ,[isDeleted]
		   ,[isPublished]
		   ,COALESCE(ufl.[LabelDescription], uf.Description)  as Description
		   ,[ClassName]
		   ,[CustomStyle]
		   ,[DefaultStyle]
		   ,[isDefaultStyle]
		   ,[CssStyle]
		   ,[AdminStyle]  --
		   ,[PartnerStyle] --
		   ,[DataAttribute] --
		   ,[Options]  --
		   ,uf.[CreateUser]
		   ,uf.[CreateDate]
		   ,uf.[ModifyUser]
		   ,uf.[ModifyDate]
		   ,[isExternal]
	FROM   [Org].[Udform] uf
		   LEFT JOIN org.Udformlabel ufl
				  ON ufl.udformID = uf.UDformID AND Ufl.LabelKey = uf.NAME AND ufl.LangID = @LangID
	WHERE  uf.UDformID = @UDFormID 

	SELECT ufa.[UDFormAreaID]
           ,ufa.[UDFormID]
           ,COALESCE(ufal.Labeltext, ufa.[Name])               AS [Name]
           ,ufa.[Type]
           ,ufa.[Position]
           ,ufa.[isAdmin]
           ,ufa.[CssStyle]
		   ,ufa.[DataAttribute] ---
		   ,ufa.[Options]     ---
           ,ufa.[DataRole]
           ,ufa.[ClassName]
           ,COALESCE(ufal.LabelDescription, ufa.[Description]) [Description]
           ,ufa.[isActive]
    FROM   org.Udformarea ufa
           LEFT JOIN org.Udformarealabel ufal
                  ON ufal.UDFormID = ufa.UDFormID AND ufal.LabelKey = ufa.NAME AND ufal.langid = @LangID
    WHERE  Ufa.UDformID = @UDFormID AND isactive         = 1
    ORDER  BY Position

    SELECT ufs.[UDFormSectionID]
           ,ufs.[UDFormID]
           ,ufs.[UDFormAreaID]
           ,COALESCE(ufsl.labelText, ufs.[Name])               AS [Name]
           ,ufs.[Type]
           ,ufs.[Position]
           ,ufs.[isAdmin]
           ,ufs.[CssStyle]
		   ,ufs.[DataAttribute]  ----
		   ,ufs.[Options]        ----
           ,ufs.[DataRole]
           ,ufs.[ClassName]
           ,COALESCE(ufsl.LabelDescription, ufs.[Description]) [Description]
           ,ufs.[isActive]
           ,ufs.[isRenew]
           ,ufa.position                                       AS ParentPosition
    FROM   org.Udformsection ufs
           INNER JOIN org.Udformarea ufa
                   ON ufa.UDFormAreaID = ufs.UDFormAreaID
           LEFT JOIN org.Udformsectionlabel ufsl
                  ON ufsl.UDFormID = ufs.UDFormID AND ufsl.LabelKey = ufs.NAME AND ufsl.langid = @LangID
    WHERE  ufs.UDformID = @UDFormID AND ufs.isActive = 1 AND ufs.isadmin  in  (0,Case @SecurityRoleTypeID When 1 then 1 Else 0  end ) AND ufs.isRenew   = 0
    ORDER  BY Position

    SELECT ufb.[UDFormBlockID]
           ,ufb.[UDFormID]
           ,ufb.[UDFormSectionID]
           ,COALESCE(ufbl.labeltext, ufb.[Name])               AS [Name]
           ,ufb.[Type]
           ,ufb.[Position]
           ,ufb.[isAdmin]
           ,ufb.[CssStyle]
		   ,ufb.[DataAttribute]   ----
		   ,ufb.[Options]      ---
           ,ufb.[DataRole]
           ,ufb.[ClassName]
           ,COALESCE(ufbl.LabelDescription, ufb.[Description]) [Description]
           ,ufb.[isActive]
           ,ufs.position                                       AS ParentPosition
    FROM   org.Udformblock ufb
           INNER JOIN org.Udformsection ufs
                   ON ufs.UDFormSectionID = ufb.UDFormSectionID
           LEFT JOIN org.Udformblocklabel ufbl
                  ON ufbl.UDFormID = ufb.UDFormID AND ufbl.LabelKey = ufb.NAME AND ufbl.langid = @LangID
    WHERE  ufb.UDformID = @UDFormID AND ufb.isActive = 1
    ORDER  BY Position

    SELECT UDFormId
           ,UDFieldId
           ,Position
           ,isReadonly
           ,formisrequired
           ,FieldLabel
           ,FieldName
           ,FieldType
           ,Value
           ,DropDownValue
           ,DataType
           ,isUnique
           ,fieldisrequired
           ,isDateCheck
           ,isNumericCheck
           ,isEmailCheck
           ,LookUpSchema
           ,LookUpTable
           ,LookUpColumn
           ,LookUpIDColumn
           ,Maptotable
           ,[Description]
           ,ObjectID
           ,OrgID
           ,FieldLength
           ,FieldDecimal
           ,isAdmin
           ,hasDependent
           ,IsInUse
           ,isDependent
           ,ParentUDfieldID
           ,Prefix
           ,isHidden
           ,UDFormBlockID
           ,ParentPosition
           ,ClassName
           ,Datacomponent
           ,DataFormat
           ,GridTypeID
           ,GridType
           ,formtype
           ,isForreview
           ,CssStyle
		   ,DataAttribute  ---
		   ,Options      ---
		   ,HelperText
           ,isForAudit
		   ,isRemovable
    FROM   @UDFormField udf
    WHERE  udf.UDfieldid = ParentUDfieldID
    ORDER  BY position

    SELECT UDFormId
           ,UDFieldId
           ,Position
           ,isReadonly
           ,formisrequired
           ,FieldLabel
           ,FieldName
           ,FieldType
           ,Value
           ,DropDownValue
           ,DataType
           ,isUnique
           ,fieldisrequired
           ,isDateCheck
           ,isNumericCheck
           ,isEmailCheck
           ,LookUpSchema
           ,LookUpTable
           ,LookUpColumn
           ,LookUpIDColumn
           ,Maptotable
           ,[Description]
           ,ObjectID
           ,OrgID
           ,FieldLength
           ,FieldDecimal
           ,isAdmin
           ,hasDependent
           ,IsInUse
           ,isDependent
           ,ParentUDfieldID
           ,Prefix
           ,isHidden
           ,UDFormBlockID
           ,ParentPosition
           ,ClassName
           ,Datacomponent
           ,DataFormat
           ,GridTypeID
           ,GridType
           ,formtype
           ,isForreview
           ,CssStyle
		   ,DataAttribute  ---
		   ,Options        ----
		   ,HelperText
           ,isForAudit
		   ,isRemovable
    FROM   @UDFormField
    WHERE  UDfieldid <> ParentUDfieldID
    ORDER  BY position

    SELECT DISTINCT UDF.[UDFieldId]
                    ,COALESCE(udfl.Label, udgf.FieldLabel, FieldName)   AS FieldLabel
                    ,[FieldType]
                    ,Cast (COALESCE(UDGF.isReadOnly, 0) AS BIT)         AS isReadOnly
                    ,[DataType]
                    ,udgf.[ValidationFunction]
                    ,[Value]
                    ,[MapToSchema]
                    ,[MapToTable]
                    ,[MaptoColumn]
                    ,[isUnique]
                    ,UDF.[isRequired]
                    ,[isDateCheck]
                    ,[isNumericCheck]
                    ,[isEmailCheck]
                    ,[LookUpSchema]
                    ,[LookUpTable]
                    ,[LookUpColumn]
                    ,[LookUpIDColumn]
                    ,Maptotable
                    ,COALESCE(udfl.LabelDescription, udf.[Description]) [Description]
                    ,UDF.[ObjectID]
                    ,UDF.[OrgID]
                    ,[FieldLength]
                    ,[FieldDecimal]
                    ,isConfig
                    ,COALESCE(udgf.isAdmin, 'False')                    isadmin
                    ,Cast(COALESCE(udgf.IsVisible, 0) AS BIT)           AS IsVisible
                    ,COALESCE(udgf.HasTotal, 'False')                   HasTotal
                    ,DropDownValue
                    ,Cast(( CASE
                              WHEN UDGF.UDFieldID IS NOT NULL THEN 1
                              ELSE 0
                            END ) AS BIT)                               AS isInUse
                    ,COALESCE(udgf.ParentUDFieldID, UDF.ParentUDfieldid)ParentUDFieldID
                    ,HasDependent
                    ,isdependent
                    ,COALESCE(Position, 0)                              Position
                    ,COALESCE(udgf.isKey, 'False')                      iskey
                    ,COALESCE(udgf.isforreview, 'False')                isforreview
                    ,NULL                                               className
                    ,udf.DataComponent
    FROM   dbo. Gridtypeobject gto
           INNER JOIN org.Udfield UDF
                   ON UDF.ObjectID = gto.ObjectID
           INNER JOIN Org.Udformgridfield udgf
                   ON udgf.UDFieldID = udf.UDFieldId AND udgf.UDFormid = @UDFormID AND udgf.ParentUDFieldID = udf.ParentUDFieldid
           LEFT JOIN Org.Udformfieldlabel udfl
                  ON udfl.UDFieldId = udf.UDFieldId AND udfl.OrgID = @OrgID AND udfl.UDFormID = @UDFormID
    WHERE  ( UDF.OrgID                     = @OrgID  OR UDF.OrgID IS NULL ) AND UDF.isConfig               = 1 AND udf.ParentUDFieldid <> udf.UDFieldId AND udgf.isVisible           = 1 
	  AND udgf.IsAdmin  in  (0,Case @SecurityRoleTypeID
		                           When 1 then 1 
								   Else 0 
								   end )
      AND udgf.IsForReview       = 0
    ORDER  BY Position
-- AND uf.UDFormId = (SELECT Max(UDFormId)
-- FROM   org.UDForm)
--11/09/2012 Temporary fix to get data for one form 
--it will be filtered by application for the form type 
--END
