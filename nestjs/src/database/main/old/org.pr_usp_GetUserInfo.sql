USE [PartnerPortal]
GO
/****** Object:  StoredProcedure [Org].[Usp_getuserinfo]    Script Date: 2/21/2022 3:21:46 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--exec org.usp_formfield
--exec [dbo].[usp_getuseinfo] 1323
--select * from [Org].[uf_FormFieldGetForOrg](25,1,0) where udformid = 48
ALTER PROCEDURE [Org].[Usp_getuserinfo](@userid INT)
AS
  BEGIN
      DECLARE @DocHandle    INT
              ,@XmlDocument NVARCHAR(max)
              ,@orgid       INT
      --@userid INT = 1135
      DECLARE @eval TABLE
        ( FieldID    INT
         ,Datavalue VARCHAR(max))
      DECLARE @UserAccount TABLE
        ( Username         VARCHAR(75)
         ,emailaddress    VARCHAR(75)
         ,Userid          INT
         ,Orgid           INT
         ,[Password]      VARCHAR(100)
         ,isActive        BIT
         ,CreateUser      VARCHAR(75)
         ,CreateDate      DATE
         ,ModifyUser      VARCHAR(75)
         ,ModifyDate      DATE
         ,ContactID       INT
         ,isNewPWRequired BIT
         ,UDF             NVARCHAR(max)
         ,CompanyID       INT
         ,UDFormID        INT
         ,RoleID          INT
		 ,LangID		  INT)
      DECLARE @OrgContact TABLE
        ( [ContactId]        [INT] NOT NULL
         ,[OwnerId]         [INT] NOT NULL
         ,[CompanyID]       [INT] NULL
         ,[EmailAddress]    [VARCHAR](100) NULL
         ,[NameSalutation]  [VARCHAR](10) NULL
         ,[FirstName]       [VARCHAR](50) NULL
         ,[LastName]        [VARCHAR](50) NULL
         ,[Initials]        [VARCHAR](3) NULL
         ,[Title]           [VARCHAR](200) NULL
         ,[Department]      [VARCHAR](30) NULL
         ,[Division]        [VARCHAR](30) NULL
         ,[LeadSourceID]    [INT] NULL
         ,[StreetAddress]   [NVARCHAR](200) NULL
         ,[City]            [NVARCHAR](100) NULL
         ,[PostalCode]      [VARCHAR](20) NULL
         --[TerritoryID] [INT] NULL,
         ,ProvinceStateCode [VARCHAR](5) NULL
         ,Country3          [VARCHAR](3) NULL
         ,[PrimaryPhone]    [VARCHAR](20) NULL
         ,[Fax]             [VARCHAR](20) NULL
         ,[MobilePhone]     [VARCHAR](20) NULL
         ,[OtherPhone]      [VARCHAR](20) NULL
         ,[Notes]           [VARCHAR](max) NULL
         ,[IsActive]        [BIT] NOT NULL
         ,[CreateUser]      [VARCHAR](100) NOT NULL
         ,[CreateDate]      [SMALLDATETIME] NOT NULL
         ,[ModifyUser]      [VARCHAR](100) NULL
         ,[ModifyDate]      [SMALLDATETIME] NULL
         ,[UDF]             NVARCHAR(max))
      DECLARE @OrgCompany TABLE
        ( CompanyId              INT
         ,OwnerID               INT
         ,ParentID              INT
         ,CompanyName           NVARCHAR(200)
         ,LeadSourceID          INT
         ,BillingStreetAddress  NVARCHAR(400)
         ,BillingCity           NVARCHAR(200)
         ,BillingStateCode      NVARCHAR(20)
         ,BillingPostalCode     VARCHAR(20)
         ,BillingTerritoryID    INT
         ,BillingCountryCode    NVARCHAR(20)
         ,ShippingStreetAddress NVARCHAR(400)
         ,ShippingCity          NVARCHAR(200)
         ,ShippingStateCode     NVARCHAR(20)
         ,ShippingPostalCode    VARCHAR(20)
         ,ShippingTerritoryID   INT
         ,ShippingCountryCode   NVARCHAR(20)
         ,PrimaryPhone          VARCHAR(50)
         ,Fax                   VARCHAR(20)
         ,NumLocationsID        INT
         ,OwnershipTypeID       INT
         ,IndustryID            INT
         ,NumEmployeesID        INT
		 ,Website				VARCHAR(100)
         ,Notes                 VARCHAR(max)
         ,IsActive              BIT
         ,UDF                   NVARCHAR(max)
         ,CreateUser            VARCHAR(100)
         ,CreateDate            SMALLDATETIME
         ,ModifyUser            VARCHAR(100)
         ,ModifyDate            SMALLDATETIME)

      INSERT INTO @UserAccount
      SELECT UserName
             ,EmailAddress
             ,UserID
             ,OrgID
             ,Password
             ,isActive
             ,CreateUser
             ,CreateDate
             ,ModifyUser
             ,ModifyDate
             ,Contactid
             ,IsNewPWRequired
             ,CASE
                WHEN UDF = '' THEN NULL
                ELSE UDF
              END
             ,CompanyID
             ,UDFormID
             ,ROLEID
			 ,LangID
      FROM   sec.Useraccount
      WHERE  userid = @userid

      DECLARE @udField TABLE
        ( udFieldlD    INT
         ,maptoColumn VARCHAR(200)
         ,maptoTable  VARCHAR(200)
		 ,LookUpColumn VARCHAR(128) null	--10/11/2018 cmrThanh
         ,LookUpTable  VARCHAR(200) null	--10/11/2018 cmrThanh
		 )

      INSERT INTO @UDField
      SELECT udf.udFieldID
             ,udf.MaptoColumn
             ,udf.maptoTable
			 ,udf.LookUpColumn	--10/11/2018 cmrThanh
			 ,udf.LookUpTable	--10/11/2018 cmrThanh
      FROM   org.Udfield udf
             INNER JOIN org.Udformfield udff
                     ON udff.UDFieldID = udf.UDFieldId
      WHERE  udff.UDformid = (SELECT UDFormid
                              FROM   @UserAccount)

      --and udf.maptoTable = 'UserAccount' AND udf.MapToSchema = 'Sec'
      --select * from @udField
      INSERT @eval
      VALUES ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'UserName' AND maptoTable   = 'UserAccount')
              ,(SELECT username
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'EmailAddress' AND maptoTable   = 'UserAccount')
              ,(SELECT EmailAddress
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'UserID' AND maptoTable   = 'UserAccount')
              ,(SELECT Cast (UserID AS VARCHAR(20))
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'OrgID' AND maptoTable   = 'UserAccount')
              ,(SELECT Cast (OrgID AS VARCHAR(20))
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'isActive' AND maptoTable   = 'UserAccount')
              ,(SELECT Cast (isActive AS VARCHAR(1))
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CreateUser' AND maptoTable   = 'UserAccount')
              ,(SELECT CreateUser
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CreateDate' AND maptoTable   = 'UserAccount')
              ,(SELECT CONVERT (VARCHAR(20), CreateDate, 101)
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ModifyUser' AND maptoTable   = 'UserAccount')
              ,(SELECT ModifyUser
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ModifyDate' AND maptoTable   = 'UserAccount')
              ,(SELECT CONVERT (VARCHAR(20), ModifyDate, 101)
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ContactID'AND maptoTable   = 'UserAccount')
              ,(SELECT Cast (ContactID AS VARCHAR(20))
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'IsNewPWRequired'AND maptoTable   = 'UserAccount')
              ,(SELECT Cast (IsNewPWRequired AS VARCHAR(1))
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CompanyID'AND maptoTable   = 'UserAccount')
              ,(SELECT Cast(CompanyID AS VARCHAR(20))
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ROleID'AND maptoTable   = 'UserAccount')
              ,(SELECT Cast(ROLEID AS VARCHAR(20))
                FROM   @UserAccount)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'LangID'AND maptoTable   = 'UserAccount')
              ,(SELECT Cast(LangID AS VARCHAR(20))
                FROM   @UserAccount))

      --Select * from @UserAccount
      SELECT @XmlDocument = UDF
      FROM   @UserAccount

      EXEC Sp_xml_preparedocument
        @DocHandle OUTPUT
        ,@XmlDocument

      INSERT @eval
      SELECT FieldID
             ,DataValue
      FROM   OPENXML (@DocHandle, '//Field', 11)
                WITH (FieldID    VARCHAR(20)
                      ,DataValue VARCHAR(1024) )

      EXEC Sp_xml_removedocument
        @DocHandle

      INSERT INTO @OrgContact
      SELECT [ContactId]
             ,[OwnerId]
             ,[CompanyID]
             ,[EmailAddress]
             ,[NameSalutation]
             ,[FirstName]
             ,[LastName]
             ,[Initials]
             ,[Title]
             ,[Department]
             ,[Division]
             ,[LeadSourceID]
             ,[StreetAddress]
             ,[City]
             ,[PostalCode]
             ,t.ProvinceStateCode
             ,t.Country3
             ,[PrimaryPhone]
             ,[Fax]
             ,[MobilePhone]
             ,[OtherPhone]
             ,[Notes]
             ,[IsActive]
             ,[CreateUser]
             ,[CreateDate]
             ,[ModifyUser]
             ,[ModifyDate]
             ,[UDF]
      FROM   [Org].[Contact] c
             LEFT JOIN dbo.Territory t
                    ON c.TerritoryID = t.TerritoryId
      WHERE  c.Contactid = (SELECT ContactId
                            FROM   @UserAccount)

      INSERT @eval
      VALUES ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'EmailAddress' AND maptoTable   = 'Contact')
              ,(SELECT [EmailAddress]
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'NameSalutation' AND maptoTable   = 'Contact')
              ,(SELECT Cast ([NameSalutation] AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'FirstName' AND maptoTable   = 'Contact')
              ,(SELECT Cast (FirstName AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'LastName' AND maptoTable   = 'Contact')
              ,(SELECT Cast (LastName AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Initials' AND maptoTable   = 'Contact')
              ,(SELECT Cast (Initials AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Title' AND maptoTable   = 'Contact')
              ,(SELECT Cast (Title AS VARCHAR(100))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Department' AND maptoTable   = 'Contact')
              ,(SELECT Cast (Department AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Division' AND maptoTable   = 'Contact')
              ,(SELECT Cast (Division AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'StreetAddress' AND maptoTable   = 'Contact')
              ,(SELECT Cast (StreetAddress AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'City' AND maptoTable   = 'Contact')
              ,(SELECT Cast (City AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'PostalCode' AND maptoTable   = 'Contact')
              ,(SELECT Cast (PostalCode AS VARCHAR(20))
                FROM   @OrgContact)),
			 ((SELECT udFieldlD
               FROM   @udField
               WHERE  MaptoTable = 'Contact' and lookuptable = 'Territory' and lookupcolumn = 'Provincestatename') --10/11/2018 cmrThanh
              ,(SELECT Cast (ProvinceStateCode AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  MaptoTable = 'Contact' and lookuptable = 'Territory' and lookupcolumn = 'CountryName') --10/11/2018 cmrThanh
              ,(SELECT Cast (Country3 AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'PrimaryPhone' AND maptoTable   = 'Contact')
              ,(SELECT Cast (PrimaryPhone AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Fax' AND maptoTable   = 'Contact')
              ,(SELECT Cast (Fax AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'MobilePhone' AND maptoTable   = 'Contact')
              ,(SELECT Cast (MobilePhone AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'OtherPhone' AND maptoTable   = 'Contact')
              ,(SELECT Cast (OtherPhone AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Notes' AND maptoTable   = 'Contact')
              ,(SELECT Cast (Notes AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'IsActive' AND maptoTable   = 'Contact')
              ,(SELECT Cast (IsActive AS VARCHAR(20))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CreateUser' AND maptoTable   = 'Contact')
              ,(SELECT CreateUser
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CreateDate' AND maptoTable   = 'Contact')
              ,(SELECT Cast (CreateDate AS VARCHAR(75))
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ModifyUser' AND maptoTable   = 'Contact')
              ,(SELECT ModifyUser
                FROM   @OrgContact)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ModifyDate' AND maptoTable   = 'Contact')
              ,(SELECT Cast (ModifyDate AS VARCHAR(75))
                FROM   @OrgContact))

      SELECT @XmlDocument = UDF
      FROM   @OrgContact

      EXEC Sp_xml_preparedocument
        @DocHandle OUTPUT
        ,@XmlDocument

      INSERT @eval
      SELECT FieldID
             ,DataValue
      FROM   OPENXML (@DocHandle, '//Field', 11)
                WITH (FieldID    VARCHAR(20)
                      ,DataValue VARCHAR(1024) )

      EXEC Sp_xml_removedocument
        @DocHandle

      INSERT INTO @OrgCompany
      SELECT CompanyId
             ,OwnerID
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
             ,NumEmployeesID
			 ,Website
             ,Notes
             ,IsActive
             ,UDF
             ,CreateUser
             ,CreateDate
             ,ModifyUser
             ,ModifyDate
      FROM   [Org].[Company]
      WHERE  CompanyID = (SELECT CompanyID
                          FROM   @UserAccount)

      INSERT @eval
      VALUES((SELECT udFieldlD
              FROM   @udField
              WHERE  maptoColumn = 'CompanyId' AND maptoTable   = 'Company')
             ,(SELECT Cast (CompanyId AS VARCHAR(20))
               FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'OwnerID' AND maptoTable   = 'Company')
              ,(SELECT Cast (OwnerID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ParentID' AND maptoTable   = 'Company')
              ,(SELECT Cast (ParentID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CompanyName' AND maptoTable   = 'Company')
              ,(SELECT CompanyName
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'LeadSourceID' AND maptoTable   = 'Company')
              ,(SELECT Cast (LeadSourceID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'BillingStreetAddress' AND maptoTable   = 'Company')
              ,(SELECT BillingStreetAddress
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'BillingCity' AND maptoTable   = 'Company')
              ,(SELECT BillingCity
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'BillingStateCode' AND maptoTable   = 'Company')
              ,(SELECT BillingStateCode
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'BillingPostalCode' AND maptoTable   = 'Company')
              ,(SELECT BillingPostalCode
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'BillingTerritoryID' AND maptoTable   = 'Company')
              ,(SELECT Cast (BillingTerritoryID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'BillingCountryCode' AND maptoTable   = 'Company')
              ,(SELECT BillingCountryCode
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ShippingStreetAddress' AND maptoTable   = 'Company')
              ,(SELECT ShippingStreetAddress
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ShippingCity' AND maptoTable   = 'Company')
              ,(SELECT ShippingCity
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'BillingStateCode' AND maptoTable   = 'Company')
              ,(SELECT BillingStateCode
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ShippingStateCode' AND maptoTable   = 'Company')
              ,(SELECT ShippingStateCode
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ShippingPostalCode' AND maptoTable   = 'Company')
              ,(SELECT ShippingPostalCode
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ShippingTerritoryID' AND maptoTable   = 'Company')
              ,(SELECT Cast (ShippingTerritoryID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ShippingCountryCode' AND maptoTable   = 'Company')
              ,(SELECT ShippingCountryCode
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'PrimaryPhone' AND maptoTable   = 'Company')
              ,(SELECT Cast (PrimaryPhone AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Fax' AND maptoTable   = 'Company')
              ,(SELECT Cast (Fax AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'NumLocationsID' AND maptoTable   = 'Company')
              ,(SELECT Cast (NumLocationsID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'OwnershipTypeID' AND maptoTable   = 'Company')
              ,(SELECT Cast (OwnershipTypeID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'IndustryID' AND maptoTable   = 'Company')
              ,(SELECT Cast (IndustryID AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'NumEmployeesID' AND maptoTable   = 'Company')
              ,(SELECT Cast (NumEmployeesID AS VARCHAR(20))
                FROM   @OrgCompany)),
				((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Website' AND maptoTable   = 'Company')
              ,(SELECT Website
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'Notes' AND maptoTable   = 'Company')
              ,(SELECT Notes
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'IsActive' AND maptoTable   = 'Company')
              ,(SELECT Cast (IsActive AS VARCHAR(20))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CreateUser' AND maptoTable   = 'Company')
              ,(SELECT CreateUser
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'CreateDate' AND maptoTable   = 'Company')
              ,(SELECT Cast (CreateDate AS VARCHAR(75))
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ModifyUser' AND maptoTable   = 'Company')
              ,(SELECT ModifyUser
                FROM   @OrgCompany)),
             ((SELECT udFieldlD
               FROM   @udField
               WHERE  maptoColumn = 'ModifyDate' AND maptoTable   = 'Company')
              ,(SELECT Cast (ModifyDate AS VARCHAR(75))
                FROM   @OrgCompany))

      SELECT @XmlDocument = UDF
      FROM   @OrgCompany

      EXEC Sp_xml_preparedocument
        @DocHandle OUTPUT
        ,@XmlDocument

      INSERT @eval
      SELECT FieldID
             ,DataValue
      FROM   OPENXML (@DocHandle, '//Field', 11)
                WITH (FieldID    VARCHAR(20)
                      ,DataValue VARCHAR(1024) )

      EXEC Sp_xml_removedocument
        @DocHandle

      SELECT distinct *
      FROM   @eval
      WHERE  fieldid IS NOT NULL
  END
