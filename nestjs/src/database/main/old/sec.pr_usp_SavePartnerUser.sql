USE [PartnerPortal]
GO
/****** Object:  StoredProcedure [Org].[Usp_SavePartnerUser]    Script Date: 1/24/2022 8:08:09 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


ALTER PROCEDURE [Org].[Usp_SavePartnerUser](
   @FormData  dbo.FORMDATA readonly,
   @ControlGroupFormData  dbo.FORMDATA readonly,
   @orgID INT,
   @UDFormID INT,
   @Userid INT,
   @LoginUserid INT,
   @ServerUrl VARCHAR(200 ) = N'PartnerPortal.bz',
   @isActive int = 1,
   @SessionID VARCHAR(50)=null) --11/03/2014
AS
 /****************************************************************                   
Author:  CMR DBA                    
Date:  1/30/2014                    
Purpose:  Create Partner users            
-----------------------------------------------------------------  
CHANGE LOG              
Date           Author           Description              
-----------------------------------------------------------------              
01/30/2014     CMR DBA          Created      
11/03/2014     CmrSunil         732 Support For file upload on partner registration     
12/03/2014     cmrSunil         584 Contact list view not returning contacts
03/05/2014     cmrSunil         Resend user Activation 
10/10/2017	   cmrMegha	        added tempisactive = 1, to update object value only at submission
12/13/2017     cmrArturo        Set TempIsActive = 0 in Org.Upload for uploaded files that have been deleted.
10/11/2018	   cmrThanh			  Updated logic for @ContactTerritoryID retrieval to rely on lookuptable, lookupcolumn instead of on maptocolumn
12/11/2019		cmrThanh			  Added logic for RebateSpiff module, table RebateSpiff.reb.ProgramAccount update
10/05/2021		cmrKenny		     Added logic so if a user updates the company, the system will update org.Contact.CompanyID
****************************************************************/
  BEGIN
      SET XACT_ABORT ON
      SET nocount ON

      BEGIN TRY
         DECLARE  @isUserUpdate    BIT = 0
                  ,@isCompanyUpdate BIT = 0
                  ,@isContactUpdate BIT = 0
                  ,@CompanyID       INT = 0
                  ,@ContactID       INT = 0
				      ,@contactname nvarchar(100) --12/10/2019
                  ,@Status          BIT
                  ,@ErrorNUmber     NVARCHAR(20)
                  ,@ErrorMessage    NVARCHAR(2000)
                  ,@loginusername VARCHAR(75)
                  ,@username        varchar(75)
                  ,@Timestamp SMALLDATETIME = CURRENT_TIMESTAMP
                  ,@BillingTerritoryID int
                  ,@ShippingTerritoryID int
                  ,@ContactTerritoryID int
                  ,@DefaultLangID int
                  ,@DefaultCompanyForm int
                  ,@DefaultContactForm int
                  ,@ResendActivationEmail bit = 0
      
      IF @Userid = 0
	   Set @UserID = null

         DECLARE @Data AS TABLE
            ( Id            INT IDENTITY(1, 1)
             ,FieldID      VARCHAR(10)
             ,DataValue    NVARCHAR(MAX)
             ,MapToSchema  VARCHAR(200)
             ,MapToTable   VARCHAR(200)
             ,MapToColumn  VARCHAR(200)
             ,LookUpSchema VARCHAR(200)
             ,LookUpTable  VARCHAR(200)
             ,LookUpColumn VARCHAR(200)
             ,isUnique     BIT)

          DECLARE @UDF AS TABLE
            ( [xml]       NVARCHAR(max)
             ,MaptoTable VARCHAR(200))

          INSERT INTO @Data
                      (FieldID,DataValue)
          SELECT *
          FROM   @FormData
		  Union
		  Select * from 
		  @ControlGroupFormData


		  SELECT @DefaultLangID = LangID
		  FROM org.OrganizationLanguage
		  WHERE OrgID = @OrgID
				AND IsDefault = 1

		  Select @DefaultCompanyForm = min(UDformID)
		  from Org.UDform f inner join dbo.FormType ft on ft.FormTypeID = f.FormTypeID
		  where Orgid = @orgID and Ft.FormTypeName = 'Company'
		  
		  Select @DefaultContactForm = min(UDformID)
		  from Org.UDform f inner join dbo.FormType ft on ft.FormTypeID = f.FormTypeID
		  where Orgid = @orgID and Ft.FormTypeName = 'Company Contact'
	
          UPDATE D
          SET    d.MapToSchema = udf.MapToSchema
                 ,d.MaptoTable = udf.MapToTable
                 ,d.MaptoColumn = udf.MaptoColumn
                 ,d.LookUpSchema = udf.LookUpSchema
                 ,d.LookUpTable = udf.LookUpTable
                 ,d.LookUpColumn = udf.LookUpColumn
                 ,d.isUnique = udf.isUnique
          FROM   Org.UDField udf
                 INNER JOIN @Data d
                         ON d.FieldID = UDF.UDFieldID

			SELECT @loginusername = UserName
			FROM sec.UserAccount
			WHERE userid = @LoginUserid

			
          INSERT INTO @UDF
          VALUES      ( (SELECT FieldID     AS "@FieldID"
                                , DataValue AS "@DataValue"
                         FROM   @Data
                         WHERE  MapToColumn = 'UDF' AND MapToTable = 'UserAccount'
                         FOR XML PATH('Field'), ROOT('CustomField')),'UserAccount')

          INSERT INTO @UDF
          VALUES      ( (SELECT FieldID     AS "@FieldID"
                                , DataValue AS "@DataValue"
                         FROM   @Data
                         WHERE  MapToColumn = 'UDF' AND MapToTable = 'Company'
                         FOR XML PATH('Field'), ROOT('CustomField')),'Company')

          INSERT INTO @UDF
          VALUES      ((SELECT FieldID     AS "@FieldID"
                               , DataValue AS "@DataValue"
                        FROM   @Data
                        WHERE  MapToColumn = 'UDF' AND MapToTable = 'Contact'
                        FOR XML PATH('Field'), ROOT('CustomField')),'Contact')

          BEGIN TRAN


		 IF @CompanyID = 0
		    SELECT @CompanyID = DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'CompanyID' AND MaptoTable = 'Company'
            

		print  '1: ' + Cast(@CompanyID as varchar(20))
		IF @CompanyID = 0 --Specifies add partner to existing company and donot update or insert company record
		BEGIN
      SELECT 
      @CompanyID  = CompanyID
		  ,@ContactID= ContactID
			,@username = UserName --12/12/2019
		  FROM sec.useraccount
		  WHERE Userid = @userid


      IF @CompanyID = 0
		  SELECT @CompanyID =  NEXT VALUE FOR Org.CompanyID
		
		
		 Select @BillingTerritoryID = TerritoryID
		 from Territory 
		 where Country3 = (
        SELECT  DataValue
        FROM   @Data
        WHERE  MapToColumn = 'BillingCountryCode' AND MaptoTable = 'Company'
      )
		  and ProvinceStateCode = (
        Select DataValue
        FROM   @Data
        WHERE  MapToColumn = 'BillingStateCode' AND MaptoTable = 'Company'
      )
		  

		Select @ShippingTerritoryID = TerritoryID
		 from Territory 
		 where Country3 = (		  
        SELECT  DataValue
        FROM   @Data
        WHERE  MapToColumn = 'ShippingCountryCode' AND MaptoTable = 'Company'
      )
		 and ProvinceStateCode = (
        Select DataValue
        FROM   @Data
        WHERE  MapToColumn = 'ShippingStateCode' AND MaptoTable = 'Company'
    )


    MERGE Org.Company AS Target
    Using (
      SELECT DISTINCT 
      (@CompanyID) AS CompanyID, 
      ( 
        SELECT DataValue
        FROM   @Data
        WHERE  MaptoColumn = 'ParentID' AND MaptoTable = 'Company'
      ) AS ParentID, 
      (
        SELECT DataValue
        FROM   @Data
        WHERE  MapToColumn = 'CompanyName' AND MaptoTable = 'Company') AS CompanyName, 
      (
        SELECT DataValue
        FROM   @Data
        WHERE  MaptoColumn = 'LeadSourceID' AND MaptoTable = 'Company') AS LeadSourceID, 
      (
        SELECT DataValue
        FROM   @Data
        WHERE  MapToColumn = 'BillingStreetAddress' AND MaptoTable = 'Company')  AS BillingStreetAddress, 
      (
        SELECT DataValue
        FROM   @Data
        WHERE  MapToColumn = 'BillingCity' AND MaptoTable = 'Company')           AS BillingCity
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'BillingStateCode' AND MaptoTable = 'Company')      AS BillingStateCode
								, (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'BillingPostalCode' AND MaptoTable = 'Company')     AS BillingPostalCode
									,@BillingTerritoryID as BillingTerritoryID
								, (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'BillingCountryCode' AND MaptoTable = 'Company')    AS BillingCountryCode
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'ShippingStreetAddress' AND MaptoTable = 'Company') AS ShippingStreetAddress
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'ShippingCity' AND MaptoTable = 'Company')          AS ShippingCity
						         , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'ShippingStateCode' AND MaptoTable = 'Company')     AS ShippingStateCode
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'ShippingPostalCode' AND MaptoTable = 'Company')    AS ShippingPostalCode
									,@ShippingTerritoryID as ShippingTerritoryID
						       , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'ShippingCountryCode' AND MaptoTable = 'Company')   AS ShippingCountryCode
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'PrimaryPhone' AND MaptoTable = 'Company')          AS PrimaryPhone
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'Fax' AND MaptoTable = 'Company')                   AS Fax
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MaptoColumn = 'NumLocationsID' AND MaptoTable = 'Company')        AS NumLocationsID
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MaptoColumn = 'OwnershipTypeID' AND MaptoTable = 'Company')       AS OwnershipTypeID
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MaptoColumn = 'IndustryID' AND MaptoTable = 'Company')            AS IndustryID
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MaptoColumn = 'NumEmployeesID' AND MaptoTable = 'Company')        AS NumEmployeesID
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'Notes' AND MaptoTable = 'Company')                 AS Notes
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'IsActive' AND MaptoTable = 'Company')              AS IsActive
								  ,(SELECT [xml]
                                    FROM   @UDF
                                    WHERE  MaptoTable = 'Company')                                           AS UDF
									,(SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'Website' AND MaptoTable = 'Company')              AS Website) AS source
          ON Source.CompanyID = Target.CompanyID
          WHEN Matched THEN
            UPDATE SET ParentID = COALESCE(source.ParentID, Target.ParentID)
			           ,CompanyName = COALESCE(source.CompanyName, Target.CompanyName)
					   ,LeadSourceID = COALESCE(source.LeadSourceID, Target.LeadSourceID)
                       ,BillingStreetAddress = COALESCE(source.BillingStreetAddress, Target.BillingStreetAddress)
                       ,BillingCity = COALESCE(source.BillingCity, Target.BillingCity)
					   ,BillingStateCode = COALESCE(source.BillingStateCode, Target.BillingStateCode)
                       ,BillingPostalCode = COALESCE(source.BillingPostalCode, Target.BillingPostalCode)
					   ,BillingTerritoryID = COALESCE(source.BillingTerritoryID, Target.BillingTerritoryID)
					   ,BillingCountryCode= COALESCE(source.BillingCountryCode, Target.BillingCountryCode)
					   
                       ,ShippingStreetAddress = COALESCE(source.ShippingStreetAddress, Target.ShippingStreetAddress)
                       ,ShippingCity = COALESCE(source.ShippingCity, Target.ShippingCity)
					   ,ShippingStateCode = COALESCE(source.ShippingStateCode, Target.ShippingStateCode)
                       ,ShippingPostalCode = COALESCE(source.ShippingPostalCode, Target.ShippingPostalCode)
					   ,ShippingTerritoryID = COALESCE(source.ShippingTerritoryID, Target.ShippingTerritoryID)
                       ,ShippingCountryCode = COALESCE(source.ShippingCountryCode, Target.ShippingCountryCode)

                       ,PrimaryPhone = COALESCE(source.PrimaryPhone, Target.PrimaryPhone)
                       ,Fax = COALESCE(source.Fax, Target.Fax)
                     
                
                       ,[NumLocationsID] = COALESCE(source.NumLocationsID, Target.NumLocationsID)
                       ,OwnershipTypeID = COALESCE(source.OwnershipTypeID, Target.OwnershipTypeID)
                       ,IndustryID = COALESCE(Source.IndustryID, Target.IndustryID)
                       ,NumEmployeesID = COALESCE(Source.NumEmployeesID, Target.NumEmployeesID)

					   ,Notes = COALESCE(source.Notes, Target.Notes)
					   ,IsActive = COALESCE(source.IsActive, Target.IsActive)
                       ,UDF = COALESCE(source.UDF, Target.UDF)
					           
					   ,ModifyUser = @loginusername
					   ,ModifyDate = @timestamp
					   ,Website = COALESCE(source.website, Target.website)
					   ,@isCompanyUpdate = 1
          WHEN NOT Matched THEN
            INSERT ( CompanyID
			        ,Ownerid
			        ,ParentID
			        ,CompanyName
			        ,LeadSourceID
                    ,BillingStreetAddress
                    ,BillingCity
					,BillingStateCode
                    ,BillingPostalCode
					,BillingTerritoryID
					,BillingCountryCode

                    ,ShippingStreetAddress
                    ,ShippingCity
					,ShippingStateCode
                    ,ShippingPostalCode
					,ShippingTerritoryID
					,ShippingCountryCode

                    ,PrimaryPhone
                    ,Fax

                    ,NumLocationsID
                    ,OwnershipTypeID
                    ,IndustryID
					,numEmployeesID

					,Notes
                    ,isActive
					,UDF

                    ,CreateUser
                    ,CreateDate
					,Website
					,OrgID
                    ,UDformID)
            VALUES ( @CompanyID
			         ,@LoginUserid
			         ,COALESCE(Source.ParentID,@CompanyID)
			         ,source.CompanyName
					 ,source.LeadSourceID

                     ,source.BillingStreetAddress
                     ,source.BillingCity
					 ,source.BillingStateCode
                     ,source.BillingPostalCode
					 ,source.BillingTerritoryID
					 ,Source.BillingCountryCode

                     ,source.ShippingStreetAddress
                     ,source.ShippingCity
					 ,source.ShippingStateCode
                     ,source.ShippingPostalCode
					 ,source.ShippingTerritoryID
					 ,Source.ShippingCountryCode

                     ,source.PrimaryPhone
                     ,source.Fax
              
                     ,source.NumLocationsID
                     ,source.OwnershipTypeID
                     ,source.IndustryID
					 ,Source.NumEmployeesID

					 ,source.Notes
                     ,@isActive
					 ,source.UDF
					 
                     ,@loginusername
                     ,@timestamp
					 ,source.website
					 ,@orgid
					 ,@DefaultCompanyForm);
			  
			  END


		Select @ContactTerritoryID = TerritoryID
		 from Territory 
		 where Country3 = (		  SELECT  DataValue
                                    FROM   @Data
									WHERE MaptoTable = 'Contact' and lookuptable = 'Territory' and lookupcolumn = 'CountryName')
									--MapToColumn = 'Country3' AND MaptoTable = 'Contact') --note: maptocolumn is not consistent among environments
		 and ProvinceStateCode = (Select DataValue
                                    FROM   @Data
									WHERE MaptoTable = 'Contact' and lookuptable = 'Territory' and lookupcolumn = 'Provincestatename')
									--MapToColumn = 'ProvinceStateCode' AND MaptoTable = 'Contact') --note: maptocolumn is not consistent among environments


			  IF @ContactID = 0
			   SELECT @ContactID= ContactID
				 FROM sec.useraccount
		        WHERE Userid = @userid

           IF  @ContactID = 0
		   SELECT @ContactID =  NEXT VALUE FOR Org.ContactID


          MERGE Org.Contact AS Target
          Using(SELECT DISTINCT ( @ContactID )                                                       AS ContactID
		                        ,(@CompanyID)                                                         AS CompanyID
                                ,Coalesce( (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'EmailAddress' AND MaptoTable = 'Contact') ,(SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'EmailAddress' AND MaptoTable = 'userAccount') )  AS EmailAddress
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'NameSalutation' AND MaptoTable = 'Contact') AS NameSalutation
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'FirstName' AND MaptoTable = 'Contact')      AS FirstName
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'LastName' AND MaptoTable = 'Contact')       AS LastName
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'Initials' AND MaptoTable = 'Contact')       AS Initials
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'Title' AND MaptoTable = 'Contact')          AS Title
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'Department' AND MaptoTable = 'Contact')     AS Department
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'Division' AND MaptoTable = 'Contact')       AS Division
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MaptoColumn = 'LeadSourceID' AND MaptoTable = 'Contact')   AS LeadSourceID
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'StreetAddress' AND MaptoTable = 'Contact')  AS StreetAddress
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'City' AND MaptoTable = 'Contact')           AS City
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'PostalCode' AND MaptoTable = 'Contact')     AS PostalCode
							    , @ContactTerritoryID   AS TerritoryID
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'PrimaryPhone' AND MaptoTable = 'Contact')   AS PrimaryPhone
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'Fax' AND MaptoTable = 'Contact')            AS Fax
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'MobilePhone' AND MaptoTable = 'Contact')    AS MobilePhone
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'OtherPhone' AND MaptoTable = 'Contact')     AS OtherPhone
                                , (SELECT DataValue
                                   FROM   @Data
                                   WHERE  MapToColumn = 'Notes' AND MaptoTable = 'Contact')          AS Notes
                                , @isActive      AS IsActive
                                , (SELECT [xml]
                                   FROM   @UDF
                                   WHERE  MaptoTable = 'Contact' AND MaptoTable = 'Contact')         AS UDF) AS source
          ON Source.ContactID = Target.ContactID
          WHEN Matched THEN
            UPDATE SET CompanyID = COALESCE(source.CompanyID, Target.CompanyID)
			           ,EmailAddress = COALESCE(source.EmailAddress, Target.EmailAddress)
                       ,NameSalutation = COALESCE(source.NameSalutation, Target.NameSalutation)
                       ,FirstName = COALESCE(source.FirstName, Target.FirstName)
                       ,LastName = COALESCE(source.LastName, Target.LastName)
                       ,Initials = COALESCE(LEFT(source.Initials, 3), Target.Initials)
                       ,Title = COALESCE(source.Title, Target.Title)
                       ,Department = COALESCE(source.Department, Target.Department)
                       ,Division = COALESCE(source.Division, Target.Division)
                       ,LeadSourceID = COALESCE(source.LeadSourceID, Target.LeadSourceID)
                       ,StreetAddress = COALESCE(source.StreetAddress, Target.StreetAddress)
                       ,City = COALESCE(source.City, Target.City)
                       ,PostalCode = COALESCE(source.PostalCode, Target.PostalCode)
					   ,TerritoryID = COALESCE(source.TerritoryID, Target.TerritoryID)
                       ,PrimaryPhone = COALESCE(source.PrimaryPhone, Target.PrimaryPhone)
                       ,Fax = COALESCE(source.Fax, Target.Fax)
                       ,MobilePhone = COALESCE(source.MobilePhone, Target.MobilePhone)
                       ,OtherPhone = COALESCE(source.OtherPhone, Target.OtherPhone)
                       ,Notes = COALESCE(source.Notes, Target.Notes)
                       ,IsActive = COALESCE(source.IsActive, Target.IsActive)
                       ,UDF = COALESCE(Source.UDF, Target.udf)
					   ,ModifyUser = @loginusername
					   ,ModifyDate = @Timestamp
          WHEN NOT matched THEN
            INSERT ( ContactID
			        ,Ownerid
			        ,[CompanyID]
                    ,[EmailAddress]
                    ,[NameSalutation]
                    ,[FirstName]
                    ,[LastName]
                    ,[Initials]
                    ,[Title]
                    ,[Department]
                    ,[Division]
                    ,LeadSourceID
                    ,[StreetAddress]
                    ,[City]
                    ,[PostalCode]
					,TerritoryID
                    ,[PrimaryPhone]
                    ,[Fax]
                    ,[MobilePhone]
                    ,[OtherPhone]
                    ,[Notes]
                    ,[IsActive]
                    ,[UDF]
                    ,CreateUser
                    ,CreateDate
					,UDformID)
            VALUES (Source.ContactID
			         ,@LoginUserid
			         ,@CompanyID
                     ,Source.[EmailAddress]
                     ,Source.[NameSalutation]
                     ,Source.[FirstName]
                     ,Source.[LastName]
                     ,LEFT(Source.[Initials], 3)
                     ,Source.[Title]
                     ,Source.[Department]
                     ,Source.[Division]
                     ,source.LeadSourceID
                     ,Source.[StreetAddress]
                     ,Source.[City]
                     ,Source.[PostalCode]
					 ,source.TerritoryID
                     ,Source.[PrimaryPhone]
                     ,Source.[Fax]
                     ,Source.[MobilePhone]
                     ,Source.[OtherPhone]
                     ,Source.[Notes]
                     ,COALESCE(source.isActive,1)
                     ,Source.[UDF]
                     ,@loginusername
                     ,@timestamp
					 ,@DefaultContactForm );

          --IF ( @isContactUpdate = 0 )
          --  BEGIN
          --      SET @ContactID = Scope_identity()

          --  END

          --IF ( @isCompanyUpdate = 0 )
          --  BEGIN
          --      SET @CompanyID = Scope_identity()
          --  END

          --SELECT @Userid = DataValue
          --FROM   @Data
          --WHERE  MapToColumn = 'UserID' AND MaptoTable = 'userAccount'

          MERGE sec.UserAccount AS Target
          Using (SELECT DISTINCT ( @Userid )                                                            AS UserID
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'UserName' AND MaptoTable = 'userAccount')     AS UserName
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'EmailAddress' AND MaptoTable = 'userAccount') AS EmailAddress
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'Password' AND MaptoTable = 'userAccount')    AS [Password]
		     					 , @isActive     AS isActive
								,@ContactID AS Contactid
								,(SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'IsNewPWRequired' AND MaptoTable = 'userAccount') AS IsNewPWRequired
                                 , (SELECT [xml]
                                    FROM   @UDF
                                    WHERE  MapToTable = 'UserAccount' )   AS UDF
                                 , @CompanyID                                                           AS CompanyID
                                 , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'RoleID' AND MaptoTable = 'userAccount')       AS RoleID
							     , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'TitleID' AND MaptoTable = 'userAccount')       AS TitleID
							     , (SELECT DataValue
                                    FROM   @Data
                                    WHERE  MapToColumn = 'LangID' AND MaptoTable = 'UserAccount')       AS LangID -- 03102016 language selection
                                 , @UDFormID                                                            AS UDFormID) AS source
          ON Source.UserID = Target.Userid
          WHEN Matched THEN
            UPDATE SET  --username = Coalesce(source.username,target.username),
			            EmailAddress = COALESCE(source.EmailAddress, Target.EmailAddress)
                       ,[Password] = COALESCE(source.[Password],Target.PASSWORD COLLATE Traditional_Spanish_Cs_AS)
					   ,isActive = Cast(Source.isactive as bit)
					   ,isNewPWRequired = COALESCE(Source.IsNewPWRequired,Target.IsNewPWRequired)
                       ,UDF = COALESCE(source.UDF, Target.UDF)
				       ,CompanyId = Source.CompanyID
                       ,RoleID = COALESCE(source.RoleID, Target.RoleID)
					   ,TitleID = Source.TitleID
					   ,UDFormID = COALESCE(Source.UDFormID,Target.UDformID)
                       ,@isUserUpdate = 1
                       ,ModifyUser = @loginusername
                       ,MOdifyDate = @timestamp
					   ,LangId = COALESCE(Source.LangId,Target.LangId)  --03102016 Language selection
          WHEN NOT Matched THEN
            INSERT (UserName
                    ,EmailAddress
					,OrgID
                    ,Password
					,isActive
					,ContactID
					,IsNewPWRequired
                    ,UDF
					,CompanyID
					,RoleID
					,TitleID
					,LangID
					,UDFormID
					,CreateUSer
					,CreateDate)
            VALUES ( Source.UserName
                     ,source.EmailAddress
					 ,@orgID
					 ,'3340:GVgeJ9587QD/HOULIEfnpWfHaxy666vl7wP3wwF7tbc=:fstNe9RKbU54+Qsx'
                     --,'3340:GVgeJ9587QD/HOULIEfnpWfHaxy666vl7wP3wwF7tbc=:fstNe9RKbU54+Qsx'
                     ,1
					 ,Source.ContactID
					 ,Isnull(Source.IsNewPWRequired,0)
                     ,source.UDF
					 ,source.CompanyID
					 ,source.RoleID
					 ,Source.titleID
					 ,COALESCE(Source.LangID, @DefaultLangID)--@DefaultLangID 03102016 select different language
					 ,Source.udformID
                     ,@loginusername
                     ,@timestamp);

			if @isUserUpdate = 0
			SELECT @Userid = Scope_identity()

           SELECT @ResendActivationEmail = cast(DataValue as bit)
                                    FROM   @Data
                                    WHERE  MaptoTable= 'UserAccount' AND  MapToColumn = 'ResendActivationEmail'
            
					SELECT '@ResendActivationEmail'
						   + Cast (@ResendActivationEmail AS VARCHAR),@userid userid

					IF ( ( @isUserUpdate = 0 AND Len(@ServerUrl) > 0 )  OR ( @ResendActivationEmail = 1 ) )-- If server URL length is 0, then we can't send out an email because there's no activation link
					  BEGIN -- Lets use this as a feature, if the URL length is 0 assume that we don't want to actually send
						  --Generate token                            -- out an activation email.  Don't forget to change the password!
						  IF ( @ResendActivationEmail = 1 and Exists( Select 1 from naf.newuseraccount where userid = @userid))
							BEGIN
							print 'custom email'
							print @UserID
							print @ServerUrl
								EXEC [Org].[usp_ReSendActivationEmail]
								  @UserID
								  ,@ServerUrl
							END
						  ELSE
							BEGIN
								DECLARE @Token VARCHAR(40)

								EXEC [sec].[Usp_logintokencreate]
								  @Userid
								  ,NULL
								  ,NULL
								  ,48
								  ,@Token Output
								  ,NULL

								SET @ServerUrl = @ServerUrl + @Token

								--Send Activation email
								EXEC sec.Usp_emailsenduseractivation
								  @UserID
								  ,@ServerUrl
							END
					  END 

		  
		  			--11/03/2014
	      UPDATE org.Upload
          SET    ObjectValue = @Userid
		  ,tempisactive = 0  --added to update tempisactive only at submission for currentfile  MB 10/10/2017
          WHERE  SessionID = @SessionID
		  and IsActive = 1
		  and tempisactive = 1  --added to update object value only at submission MB 10/10/2017

		  --AQ 12-13
		  DECLARE @ObjectIdForUserAccount int

		  SELECT @ObjectIdForUserAccount = ObjectId
		  FROM dbo.Object
		  WHERE MapToTable = 'UserAccount'

		  UPDATE org.upload
		  SET TempIsDelete = 0
		  WHERE ObjectValue = @UserId AND IsDelete = 1 AND TempIsDelete = 1 AND ObjectId = @ObjectIdForUserAccount
		  --END AQ 12-13



		  --12/10/2019
		  declare @hasActiveRebateSpiffModule bit = 0
			  , @hasActiveRebateSpiffProgram bit = 0
			  , @roleHasAccessToRebateSpiffObject bit = 0
			  , @userIsApproved bit = 0
			  , @roleid int

		  select @roleid = datavalue from @FormData where udfieldid in (select udfieldid from org.udfield
											where fieldname = 'Role' and maptotable = 'UserAccount' and maptocolumn = 'RoleID')

		  select @contactname = firstname + ' ' + lastname
		  from org.contact 
		  where contactid = @ContactID	


		  if exists (select 1 from sec.OrgModule where orgid = @orgid and isactive = 1)
				set @hasActiveRebateSpiffModule = 1

			if exists (select 1 from org.CompanyAccountLevel where companyid = @CompanyID and isactive = 1)
				set @hasActiveRebateSpiffProgram = 1

			if exists (select 1						  
							from [PartnerPortal].[sec].[SecurityRoleObject]
							where objectid in (  select objectid FROM partnerportal.dbo.object where objectname like '%SPIFF Claim%' and isactive = 1)
							and securityroleid = @roleid)

				set @roleHasAccessToRebateSpiffObject = 1

			if exists (select 1 
							from sec.useraccount ua
							left join naf.newuseraccount naf on naf.userid = ua.userid
							where ( naf.userid is null 
											or (naf.userid is not null 
													and naf.isActive = 0
													and naf.userstatusid in (select userstatusid from NAF.Status where statusname = 'approved' and orgid = @orgid )))
							 and ua.roleid = @roleid 
							 and ua.isactive = 1)
				set @userIsApproved = 1


			if @hasActiveRebateSpiffModule = 1
				and @hasActiveRebateSpiffProgram = 1
				and @roleHasAccessToRebateSpiffObject = 1
				and @userIsApproved = 1
			begin
				insert into reb.ProgramAccount
					(		programid
							, companyid
							, companyname
							, contactid
							, contactname
							, isactive
							, CompanyAccountLevelID
							, createuser
							, createdate
					)
					select 
						cal.programid
						, cal.companyid
						, cy.companyname
						, @ContactID
						, @contactname
						, 1
						, cal.CompanyAccountLevelID
						, @loginusername
						, current_timestamp
					from org.CompanyAccountLevel cal
					join org.company cy with (nolock) on cy.companyid = cal.companyid
					left join reb.ProgramAccount pa 
					on pa.programid = cal.programid 
							and pa.companyid = cal.companyid 
							and pa.contactid = @ContactID
					where cal.companyid = @CompanyID
					and cal.isactive = 1
					and cy.IsActive = 1
					and pa.programid is null
					and pa.companyid is null
					and pa.contactid is null

			end



         COMMIT TRAN --Changes later 1/22/2014
      END TRY

      BEGIN CATCH
          IF ( Xact_state() <> 0 )
                ROLLBACK TRAN;
		  
		 Throw

      END Catch
  END





