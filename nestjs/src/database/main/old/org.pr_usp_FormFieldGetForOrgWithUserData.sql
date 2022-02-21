USE [PartnerPortal]
GO
/****** Object:  StoredProcedure [Org].[Usp_formfieldgetfororgwithUserdata]    Script Date: 2/21/2022 9:03:47 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--exec sp_executesql N'EXEC Org.usp_FormFieldGetForOrgWithUserData @OrgId, @formId, @loginUserId, @userId',N'@OrgId int,@formId int,@loginUserId int,@userId int',@OrgId=8,@formId=70,@loginUserId=19,@userId=35
--exec sp_executesql N'EXEC Org.usp_FormFieldGetForOrgWithUserData @OrgId, @formId, @loginUserId, @userId',N'@OrgId int,@formId int,@loginUserId int,@userId int',@OrgId=41,@formId=133,@loginUserId=1252,@userId=1300
--Update org. UDform
--set orgid = 25
--where udformid = 48
--delete from org.UDFormField where UDFieldID = 2243
ALTER PROCEDURE [Org].[Usp_formfieldgetfororgwithUserdata] (@OrgID        INT
                                                            ,@UDFormID    INT = NULL
                                                            ,@LoginUserID INT
                                                            ,@UserID      INT)
WITH EXECUTE AS 'PartnerPortalSpUser'
/****************************************************************                  
Author:  CMR DBA                    
  Date:  11/09/2013
Purpose: fetch the data to 
         Recreate a form at Different Places  
		
-----------------------------------------------------------------      
CHANGE LOG              
Date           Author           Description              
-----------------------------------------------------------------              
11/09/2013     CMR DBA          Created              
08/26/2014     CMR DBA          Added LabelDescription Localization
                                Added isAdmin and isforReview CHeck
10/13/2014     cmr DBA          Form Description and Name Localization  
07/20/2017     cmrArturo        Added DataAttribute and Options to UDFormArea, UDFormSection and UDFormBlock
								Added AdminStyle, PartnerStyle, DataAttribute and Options to UDForm       
								Added DataAttribute, HelperText and Options to UDFormField 
11/08/2019		cmrKenneth		Added filter on MaptoColumn = 'CompanyName' inside the isReadonly CASE statement
09/17/2021		cmrDaniel		(Temp Fix)Added the ability to filter the companies returned in the company drop down by UDFormID using a linking table.
****************************************************************/
AS
    DECLARE @Prefix              VARCHAR(2)
            ,@langID             INT
            ,@securityRoleTypeID INT
    DECLARE @eval TABLE
      ( FieldID    INT
       ,Datavalue VARCHAR(max))

    INSERT INTO @EVAL
    EXEC [Org].[Usp_getuserinfo]
      @userid

    DECLARE @UDFormField TABLE
      ( UDFormId         INT
       ,UDFieldId       INT
       ,Position        INT
       ,isReadonly      BIT
       ,formisrequired  BIT
       ,FieldLabel      VARCHAR(200)--04182016 from 100 to 200
       ,FieldName       VARCHAR(200) --04182016 from 100 to 200
       ,FieldType       VARCHAR(100)
       ,Value           NVARCHAR(2000)
       ,DropDownValue   VARCHAR(max)
       ,DataType        VARCHAR(50)
       ,isUnique        BIT
       ,fieldisrequired BIT
       ,isDateCheck     BIT
       ,isNumericCheck  BIT
       ,isEmailCheck    BIT
       ,LookUpSchema    VARCHAR(128) --04182016 from 50 to 128
       ,LookUpTable     VARCHAR(128)--04182016 from 50 to 128
       ,LookUpColumn    VARCHAR(128)--04182016 from 50 to 128
       ,LookUpIDColumn  VARCHAR(128)--04182016 from 50 to 128
       ,[Description]   VARCHAR(200)
       ,ObjectID        INT
       ,OrgID           INT
       ,FieldLength     INT
       ,FieldDecimal    INT
       ,isAdmin         BIT
       ,hasDependent    BIT
       ,isDependent     BIT
       ,ParentUDfieldID INT
       ,MaptoColumn     VARCHAR(200)
       ,Prefix          VARCHAR(20)
       ,isHidden        BIT
       ,UDFormBlockID   INT
       ,ParentPosition  INT
       ,ClassName       NVARCHAR(200)
       ,Datacomponent   NVARCHAR(200)
       ,DataFormat      NVARCHAR(200)
       ,GridTypeID      INT
       ,GridType        VARCHAR(50)
       ,isForReview     BIT
       ,CssStyle        VARCHAR(max)
	   ,DataAttribute   NVARCHAR(max)
	   ,Options         NVARCHAR(max)
	   ,HelperText      NVARCHAR(max)
       ,isForAudit      BIT
	   		 ,isRemovable     bit)
    DECLARE @DropDownData TABLE
      ( keyvalue   VARCHAR(200)
       ,datavalue VARCHAR(200))
    DECLARE @DropDownData2 TABLE
      ( keyvalue   VARCHAR(max)
       ,datavalue VARCHAR(max)
       ,UDFieldID INT)

    SELECT @Prefix = c.CurrencySymbol
           ,@langID = ua.LangID
           ,@SecurityRoleTypeID = sr.SecurityRoleTypeID
    FROM   sec.Useraccount ua
           INNER JOIN sec.Securityrole sr
                   ON sr.SecurityRoleId = ua.RoleID
           LEFT JOIN dbo.Currency c
                  ON ua.currencyID = c.CurrencyID
    WHERE  ua.userid = @LoginUserID

    SELECT @UDFormID = COALESCE (@UDFormID, UDFormID)
    FROM   sec.Useraccount
    WHERE  userid = @userid

    INSERT INTO @UDFormField
    SELECT UF.UDFormId
           ,UFF.UDFieldId
           ,UFF.Position
           ,CASE
              WHEN udf.MaptoColumn = 'userName' THEN 1
			  WHEN udf.MaptoColumn = 'CompanyName' THEN 1 --11/08/2019
              WHEN uff.isReadonly = 0 AND fs.SecurityLevelID = 3 THEN 0
              ELSE 1
            END                                                AS isReadonly
           ,UFF.isRequired                                     formisrequired --not used in form for is required 
           ,COALESCE(uffl.labeltext, uff.FieldLabel)
           ,udf.FieldName
           ,UDF.FieldType
           ,UDF.Value
           ,UDF.DropDownValue
           ,UDF.DataType
           ,UDF.isUnique
           ,CASE
              WHEN UFF.isRequired = 1  OR UDF.isRequired = 1 THEN 1
              ELSE 0
            END                                                fieldisrequired ----- used in form for is required 
           ,UDF.isDateCheck
           ,udf.isNumericCheck
           ,udf.isEmailCheck
           ,udf.LookUpSchema
           ,udf.LookUpTable
           ,udf.LookUpColumn
           ,udf.LookUpIDColumn
           ,COALESCE(uffl.LabelDescription, uff.[Description],udf.Description) [Description]
           ,udf.ObjectID
           ,udf.OrgID
           ,udf.FieldLength
           ,udf.FieldDecimal
           ,udf.isAdmin
           ,udf.hasDependent
           ,udf.isDependent
           ,udf.ParentUDFieldid
           ,UDF.MaptoColumn
           ,CASE
              WHEN DataType = 'Currency' THEN @Prefix
              ELSE NULL
            END                                                Prefix
           ,UFF.isHidden
           ,UFF.UDFormBlockID
           ,ufb.Position
           ,uff.ClassName
           ,udf.Datacomponent
           ,udf.DataFormat
           ,udf.GridTypeID
           ,NULL
           ,UdF.isForreview
           ,uff.CssStyle
		   ,uff.DataAttribute
		   ,uff.Options
		   ,uff.HelperText
           ,NULL
		   ,NUll
    FROM   org.Udform UF
           INNER JOIN org.Udformfield UFF
                   ON UFF.UDFormID = UF.UDFormId
           INNER JOIN org.Udfield UDF
                   ON UDF.UDFieldId = UFF.UDFieldID
           LEFT JOIN org.Udformblock ufb
                  ON ufb.UDFormBlockID = uff.UDFormBlockID
           INNER JOIN sec.Uf_fieldsecurityforuser(@LoginUserID) fs
                   ON fs.UDFieldID = udf.UDFieldId AND fs.SecurityLevelID > 1
           LEFT JOIN Org.Udformfieldlabel uffl
                  ON uffl.UDformid = UFF.UDformid AND uffl.LabelKey = uff.FieldLabel AND uffl.langID = @LangID
    WHERE  UF.OrgID         = @OrgID AND uf.UDFormId   = @UDFormID AND udf.isConfig = 1 AND uff.isAdmin IN ( 0, CASE @securityRoleTypeID
                                     WHEN 1 THEN 1
                                     ELSE 0
                                   END )

    DECLARE @LookUp TABLE
      ( id              INT IDENTITY (1, 1)
       ,LookUpSchema   VARCHAR(50)
       ,LookUpTable    VARCHAR(50)
       ,LookUpColumn   VARCHAR(50)
       ,LookUpIDColumn VARCHAR(50)
       ,UDFieldID      INT
       ,isDependent    BIT
       ,hasDependent   BIT)

    INSERT INTO @LookUp
    SELECT LookUpSchema
           ,LookUpTable
           ,LookUpColumn
           ,LookUpIDColumn
           ,UDFieldID
           ,isdependent
           ,hasDependent
    FROM   @UDFormField
    WHERE  LookUpTable IS NOT NULL AND DataType = 'DropDown'

    DECLARE @max                INT
            ,@min               INT = 1
            ,@udFieldID         INT
            ,@LookUpSchema      VARCHAR(50)
            ,@LookUpTable       VARCHAR(50)
            ,@LookUpColumn      VARCHAR(50)
            ,@LookUpIDColumn    VARCHAR(50)
            ,@Keyvalue          VARCHAR(max) = ''
            ,@DataValue         VARCHAR(max) = ''
            ,@isDependent       BIT = 0
            ,@hasDependent      BIT = 0
            ,@value             VARCHAR(max)
            ,@udFieldDependency INT
            ,@FilterField       VARCHAR(200)

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
                 ,@hasDependent = hasDependent
          FROM   @LookUp
          WHERE  id = @min

          IF @isDependent = 1
            BEGIN
                SELECT @udFieldDependency = udFieldDependency
                FROM   org.Udfielddependency
                WHERE  UDFieldid = @udFieldID

                SELECT @value = Datavalue
                FROM   @eval
                WHERE  FieldID = @udFieldDependency

                SELECT @FilterField = CASE
                                        WHEN LookUpIDColumn IS NOT NULL THEN LookUpIDColumn
                                        ELSE MaptoColumn
                                      END
                FROM   @UDFormField
                WHERE  UDFieldId = @udFieldDependency
            END
			 -- 2021-09-17 -  A temporary solution to the impossibly long Company Dropdowns..   Grab Companies using UDFormID as a filter.  This turns any records that exist into a Comma separated list suitable for an 'in' criteria lookup.
		  If @isDependent = 0 and @LookUpTable = 'Company'
		  BEGIN
			select @Value = COALESCE(cast(stuff((select ',' + cast(RestrictToUDFormID as varchar(30)) from org.CompanyDropDownUDFormFilter where OrgID=@OrgID and IsActive=1 and UDFormID=@UDFormID for xml path ('')),1,1,'') as nvarchar(max)),'')
			if len(@Value) > 0
			BEGIN 
				print 'We Got Value ' + COALESCE(@Value,'')
				Set @FilterField = 'UDFormID'
			END
			Else 
				Set @Value = NULL
		  END
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
            ,@ProgramID      = NULL
            ,@isDependent    = @isDependent
            ,@Value          = @value
            ,@orgID          = @OrgID
            ,@FilterField    = @FilterField

          SELECT @Keyvalue = @Keyvalue + Keyvalue + ',' + DataValue + ';'
          FROM   @DropDownData

          --Select  @DataValue = @DataValue +  DataValue + ';'  from @DropDownData
          INSERT INTO @DropDownData2
          VALUES      (@Keyvalue
                       ,@DataValue
                       ,@UDFieldID)

          SET @Keyvalue = ''

          DELETE FROM @DropDownData

          SET @min +=1
          SET @Value= NULL
          SET @FilterField = NULL
      END

    UPDATE A
    SET    A.DropDownValue = dw.keyvalue
    FROM   @UDFormField a
           INNER JOIN @DropDownData2 DW
                   ON DW.UDFieldID = a.udfieldid

    UPDATE A
    SET    A.value = e.Datavalue
    FROM   @UDFormField a
           INNER JOIN @EVAL e
                   ON e.FieldID = a.udfieldid
     --10/13/2014 start
	SELECT uf.[UDFormId]
		   ,[OrgID]
		   ,[FormTypeID]
		   ,[UDFormGUID]
		   ,[ProgramID]
		   ,COALESCE(ufl.[Labeltext], uf.[Name]) Name
		   ,[isDeleted]
		   ,[isPublished]
		   ,COALESCE(ufl.[LabelDescription], uf.Description) Description
		   ,[ClassName]
		   ,[CustomStyle]
		   ,[DefaultStyle]
		   ,[isDefaultStyle]
		   ,[CssStyle]
		   ,[AdminStyle]
		   ,[PartnerStyle]
		   ,[DataAttribute]
		   ,[Options]
		   ,uf.[CreateUser]
		   ,uf.[CreateDate]
		   ,uf.[ModifyUser]
		   ,uf.[ModifyDate]
		   ,[isExternal]
	FROM   [Org].[Udform] uf
		   LEFT JOIN org.Udformlabel ufl
				  ON ufl.udformID = uf.UDformID AND Ufl.LabelKey = uf.NAME AND ufl.LangID = @LangID
	WHERE  uf.UDformID = @UDFormID 
	--10/13/2014 End

    SELECT ufa.[UDFormAreaID]
           ,ufa.[UDFormID]
           ,COALESCE(ufal.Labeltext, ufa.[Name])               AS [Name]
           ,ufa.[Type]
           ,ufa.[Position]
           ,ufa.[isAdmin]
           ,ufa.[CssStyle]
		   ,ufa.[DataAttribute]
		   ,ufa.[Options]
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
		   ,ufs.[DataAttribute]
		   ,ufs.[Options]
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
    WHERE  ufs.UDformID = @UDFormID AND ufs.isActive = 1 AND ufs.isadmin IN ( 0, CASE @securityRoleTypeID
                                     WHEN 1 THEN 1
                                     ELSE 0
                                   END ) AND ufs.isRenew   = 0
    ORDER  BY Position

    SELECT ufb.[UDFormBlockID]
           ,ufb.[UDFormID]
           ,ufb.[UDFormSectionID]
           ,COALESCE(ufbl.labeltext, ufb.[Name])               AS [Name]
           ,ufb.[Type]
           ,ufb.[Position]
           ,ufb.[isAdmin]
           ,ufb.[CssStyle]
		   ,ufb.[DataAttribute]
		   ,ufb.[Options]
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
           ,CASE isReadonly
              WHEN 1 THEN 'False'
              ELSE formisrequired
            END formisrequired
           ,FieldLabel
           ,FieldName
           ,FieldType
           ,Value
           ,DropDownValue
           ,DataType
           ,isUnique
           ,CASE isReadonly
              WHEN 1 THEN 'false'
              ELSE fieldisrequired
            END fieldisrequired
           ,isDateCheck
           ,isNumericCheck
           ,isEmailCheck
           ,LookUpSchema
           ,LookUpTable
           ,LookUpColumn
           ,LookUpIDColumn
           ,[Description]
           ,ObjectID
           ,OrgID
           ,FieldLength
           ,FieldDecimal
           ,isAdmin
           ,hasDependent
           ,isDependent
           ,ParentUDfieldID
           -- ,MaptoColumn 
           ,Prefix
           ,CASE
              WHEN Value IS NOT NULL THEN 'False'
              ELSE isHidden
            END isHidden
           ,UDFormBlockID
           ,ParentPosition
           ,ClassName
           ,Datacomponent
           ,DataFormat
           ,GridTypeID
           ,GridType
           ,isForReview
           ,CssStyle
		   ,DataAttribute
		   ,Options
		   ,HelperText
           ,isForAudit
		   ,isRemovable
    FROM   @UDFormField
    WHERE  UDfieldid = ParentUDfieldID
    ORDER  BY position

    SELECT UDFormId
           ,UDFieldId
           ,Position
           ,isReadonly
           ,CASE isReadonly
              WHEN 1 THEN 'False'
              ELSE formisrequired
            END formisrequired
           ,FieldLabel
           ,FieldName
           ,FieldType
           ,Value
           ,DropDownValue
           ,DataType
           ,isUnique
           ,CASE isReadonly
              WHEN 1 THEN 'false'
              ELSE fieldisrequired
            END fieldisrequired
           ,isDateCheck
           ,isNumericCheck
           ,isEmailCheck
           ,LookUpSchema
           ,LookUpTable
           ,LookUpColumn
           ,LookUpIDColumn
           ,[Description]
           ,ObjectID
           ,OrgID
           ,FieldLength
           ,FieldDecimal
           ,isAdmin
           ,hasDependent
           ,isDependent
           ,ParentUDfieldID
           -- ,MaptoColumn 
           ,Prefix
           ,CASE
              WHEN Value IS NOT NULL THEN 'False'
              ELSE isHidden
            END isHidden
           ,UDFormBlockID
           ,ParentPosition
           ,ClassName
           ,Datacomponent
           ,DataFormat
           ,GridTypeID
           ,GridType
           ,isForReview
           ,CssStyle
		   ,DataAttribute
		   ,Options
		   ,HelperText
           ,isForAudit
		   ,isRemovable
    FROM   @UDFormField
    WHERE  UDfieldid <> ParentUDfieldID
    ORDER  BY position
-- AND uf.UDFormId = (SELECT Max(UDFormId)
-- FROM   org.UDForm)
--11/09/2012 Temporary fix to get data for one form 
--it will be filtered by application for the form type 
--END