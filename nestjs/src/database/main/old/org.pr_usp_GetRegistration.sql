USE [DealReg]
GO
/****** Object:  StoredProcedure [org].[Usp_GetRegistration]    Script Date: 2/21/2022 2:52:33 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

ALTER PROCEDURE [org].[Usp_GetRegistration]
		(@RegID            INT
		,@LoginUserID      INT = NULL --04/17/2018
        ,@ProgramStatusID INT OUTPUT)
AS
  /****************************************************************     
  Author:  CMR DBA                  
    Date:  02/03/2014
  Purpose: get registration Data
  -----------------------------------------------------------------      
  CHANGE LOG              
  Date           Author				Description              
  -----------------------------------------------------------------              
  02/03/2014	cmrSunil		Create
  06/24/2014	cmrSunil		Registration status history grid
  07/02/2014	cmrSunil		Added Product registration history grid
  07/22/2014	cmrSunil		Added GrandTotal to Registration Product
  12/02/2014	cmrSunil		Removed call to upload. data for uplad is also present in  org.RegObjectData 
  02/10/2015	cmrSunil		Adding Start Date for comtrend meetcomp
  03/31/2015	cmrSunil		670 Products don't show up intermittently for DR in draft status
  07/20/2015	cmrSunil		Duplicate Check grid
  12/01/2015	cmrThanh		Added column DiscountPrice, TotalQuantity as part of RegistrationProduct entity
  02/10/2016	cmrThanh		Fixed RowNum case sensitive issue with OPENXML statement that reads data from table org.RegObjectData.
  08/18/2017	cmrArturo		Updated @RegNumber from nvarchar(10) to nvarchar(100) to match field in org.registration table, line 54.
  03/21/2018	cmrMegha		Modified price datattype to retain decimal values
  04/06/2018	cmrThanh		Add RowNum, GridTypeID values to table @eval for RegistrationContact.  
  04/17/2018	cmrThanh		Added @LoginUserID input parameter.
												Updated udfieldid in table @eval using regformid/multidistiformid from table dealreg.org.program
  04/24/2018	cmrThanh		Added join to new column Dealreg.org.RegistrationContact.IsActive
  07/16/2018	cmrThanh		Increased size of column 'Title' in table @RegistrationContact
  07/20/2018	cmrThanh		Made data type of ReqQuantity field in @RegistrationProduct table definition [reqQuantity] [INT] NULL (from [MONEY] NULL)
  07/30/2018	cmrThanh		Derive registration contact info for distributor from org.registrationcontactaudit table when applicable
  08/29/2018	cmrThanh		Increased size of Title file in table variable @RegistrationContact
  09/18/2018	cmrThanh		Considered other price types other than List Price when calculating product Total Price
  09/25/2018	cmrThanh		Eliminated duplicate Registration Contact Audit data from table dealreg.org.RegistrationContactAudit into table variable @RegistrationContact
												Pulled Reg Contact Company Name from table partnerportal.org.company for 
  10/12/2018	cmrThanh		Alterred JOIN type to table org.company in @RegistrationContact INSERT.  This is for pulling End User contacts where companyid don't exist.
												Retrieved End User Company Name from Registration Contact table instead of org.company table when contact companyid does not exist
												Added SessionId column to the join to table org.RegistrationContactAudit
  10/16/2018	cmrThanh		Fixed the Total Price data retrieval (table @RegistrationProduct)
  10/19/2018	cmrThanh		Fixed @RegistrationContact INSERT statement
  10/24/2018	cmrThanh		Applied dynamiccally either the approved quantity or requested quantity when only one quantity type should be used to calculate total price.
  10/25/2018	cmrThanh		Applied dynamiccally either the list price/approved price/requested price to calculate total price. 								  
  12/05/2018	cmrThanh		Added field mnfPartNumber to @RegRolloutSchedule table object
  01/07/2019	cmrThanh		Increased size of field Model in table @RegCompetitorInfo to varchar(100) from varchar(50) due to prod issue.
  02/01/2019	cmrThanh		Fixed TotalPrice calculation in @RegistrationProduct 
												ONLY FOR COMTREND client: if total price exists, show it even when it's 0.  otherwise, calculate base on formula (list price/app price/req price) * (app quantity/req quantity)
												FOR OTHER CLIENTS OTHER THAN COMTREND if total price exists and not equals 0, show it.  otherwise, calculate base on formula (list price/app price/req price) * (app quantity/req quantity)
  08/10/2020	cmrKenny		Added ProductLine in @RegistrationProduct
  02/02/2021	cmrThanh		Added DiscountMultiplier in @RegistrationProduct
  09/03/2021	cmrThanh		Get field UDF value from table object org.RegistrationProduct
  09/29/2021	cmrThanh		Get UDF values from table object org.RegistrationProduct for all products
  11/29/2021    cmrArturo		Modified to return RegProductId from Org.RegistrationProduct table
  12/16/2021	cmrDaniel		Add DistyPrice to RegistrationProduct.  Show DistyPrice for Internal user.   Show ListPrice for External User regardless of what is actually there
  01/20/2022    cmrArturo		Modified UDF values for Registration Product to filter by RegProductId instead of productid 
  02/01/2022    cmrArturo       Modified to show Disty Price if Program CanDistyViewDistyPrice is true and loginuser is a distributor partner in the program
  ***************************************************************/
 /* 
 declare @RegID            INT
                                            ,@ProgramStatusID INT
											,@LoginUserID      INT = NULL
select @regid = 24900, @LoginUserID = 14521
*/
  BEGIN
      BEGIN TRY
          DECLARE @DocHandle     INT
                  ,@xmlDocument  NVARCHAR(MAX)
                  ,@orgid        INT
                  ,@DuplicateChk BIT = 0--07/20/2015
          DECLARE @eval TABLE
            ( UDFieldID    INT
             ,MaptoTable  NVARCHAR(150)
             ,MaptoColumn NVARCHAR(150)
             ,Datavalue   VARCHAR(MAX)
             ,Rownum      INT
             ,GridTypeID  INT
			 ,ProductID int null --09/29/2021
			 )

          DECLARE @Registration TABLE
            ( [RegID]                 [INT] NOT NULL
             ,[OrgID]                [INT] NULL
             ,[OwnerID]              [INT] NULL
             ,[RegNumber]            [NVARCHAR](100) NOT NULL
             ,[ProgramID]            [INT] NOT NULL
             ,[FormID]               [INT] NULL
             ,[ResellerID]           [INT] NULL
             ,[DistributorID]        [INT] NULL
             ,[EndUserId]            [INT] NULL
             ,[ReqType]              [VARCHAR](20) NULL
             ,[Comments]             [NVARCHAR](MAX) NULL
             ,[ExpirationDate]       VARCHAR(20)
             ,[EstCloseDate]         VARCHAR(20)
             ,[NextApproverID]       [INT] NULL
             ,[ProgramStatusID]      [INT] NULL
             ,[UDF]                  [NVARCHAR](MAX) NULL
             ,[IsActive]             [BIT] NULL
             ,[CreateUser]           [sec].[USERNAME] NOT NULL
             ,[CreateDate]           [SMALLDATETIME] NOT NULL
             ,[ModifyUser]           [sec].[USERNAME] NULL
             ,[ModifyDate]           [SMALLDATETIME] NULL
             ,[ForwardApplicationto] [VARCHAR](1024) null
             ,[EmailSend]            [BIT] null
             ,isRenew                BIT Null
             ,StartDate              SMALLDATETIME--02/10/215
             ,SessionID              [VARCHAR](50) NULL)--03/31/2015
          DECLARE @RegistrationStatus AS TABLE
            ( RegStatusRowNum     [INT] IDENTITY(1, 1)
             ,[RegStatusID]      [INT] NULL
             ,[OwnerID]          [INT] NOT NULL
             ,[RegID]            [INT] NOT NULL
             ,[ProgramStatusID]  [INT] NOT NULL
             ,[ReviewerComments] [NVARCHAR](MAX) NULL
             ,[InternalComments] [NVARCHAR](MAX) NULL
             ,[ReqType]          [VARCHAR](20) NULL
             ,[UDF]              [NVARCHAR](MAX) NULL
             ,[CreateUser]       [sec].[USERNAME] NOT NULL
             ,[CreateDate]       [SMALLDATETIME] NOT NULL)

          DECLARE @RegistrationContact AS TABLE
            ( [RegID]            [INT] NULL
             ,[CompanyId]       [INT] NULL
             ,[CompanyName]     [NVARCHAR](100) NULL
             ,[Department]      [NVARCHAR](30) NULL
             ,[Division]        [NVARCHAR](30) NULL
             ,[StreetAddress]   [NVARCHAR](200) NULL
             ,[City]            [NVARCHAR](100) NULL
             ,ProvinceStateCode NVARCHAR(5) NULL
             ,Country3          NVARCHAR(3) NULL
             ,[PostalCode]      [NVARCHAR](20) NULL
             ,[FirstName]       [NVARCHAR](50) NULL
             ,[LastName]        [NVARCHAR](50) NULL
             ,[Title]           [NVARCHAR](200) NULL --08/29/2018
             ,[EmailAddress]    [NVARCHAR](100) NULL
             ,[PrimaryPhone]    [NVARCHAR](20) NULL
             ,[Fax]             [NVARCHAR](20) NULL
             ,[MobilePhone]     [NVARCHAR](20) NULL
             ,[OtherPhone]      [NVARCHAR](20) NULL
             ,[Notes]           [NVARCHAR](MAX) NULL
             ,[Website]         [NVARCHAR](200) NULL
             ,[ContactTypeID]   [INT] NULL
             ,UDF               NVARCHAR(MAX)
			 ,RowNum tinyint --04/06/2018
			 ,ContactID int null --09/29/2021
			 )
          DECLARE @RegistrationProduct AS TABLE
            ( [RegistrationProductNum] int identity(1,1) not null --11/29/2021
			 ,[RegProductID]      [INT] --IDENTITY(1, 1) NOT NULL
             ,ProductID          [INT]
             ,[RegID]            [INT] NULL
             ,[SessionID]        [VARCHAR](50) NULL
             ,mnfpartnumber      NVARCHAR(100)
             ,ProductDescription NVARCHAR(MAX)
			 ,ProductLine		 [NVARCHAR](50) NULL --kenny 08102020
             ,[reqQuantity]      [INT] NULL --07/20/2018 replace MONEY data type with INT
             ,[appQuantity]      [INT] NULL
             ,[ListPrice]        [MONEY] NULL
             ,[reqPrice]         [MONEY] NULL
             ,[appPrice]         [MONEY] NULL
             ,[Discount]         [MONEY] NULL
             ,[GrandTotal]       [MONEY] NULL
             ,[IsActive]         [BIT] NOT NULL
             ,[UDF]              [NVARCHAR](MAX) NULL
             ,[CreateUser]       [sec].[USERNAME] NOT NULL
             ,[CreateDate]       [SMALLDATETIME] NOT NULL
             ,[ModifyUser]       [sec].[USERNAME] NULL
             ,[ModifyDate]       [SMALLDATETIME] NULL
			 ,TotalPrice         Money null
			 ,DiscountPrice         Money null --20151201
			 ,TotalQuantity int null --20151201
			 ,DiscountMultiplier money null --20210202
			 ,DistyPrice		[MONEY] NULL  --12/16/2021
			 )
          --07/02/2014 start
          DECLARE @regProductAudit AS TABLE
            ( regProductAuditRownum INT IDENTITY(1, 1)
             ,ProductId            [INT]
             ,[reGid]              [INT] NULL
             ,[SessionId]          [VARCHAR](50) NULL
             ,mnfPartNumber        NVARCHAR(100) NULL  --MB10122017
             ,[TotalPrice]              MONEY NULL
             ,[appQuantity]        [INT] NULL
             ,[ListPrice]          [MONEY] NULL
			 ,[DistyPrice]		   [MONEY] NULL   --12/16/2021
             ,[CreateUser]         [sec].[USERNAME] NOT NULL
             ,[CreateDate]         [SMALLDATETIME] NOT NULL)

          --07/02/2014 end
          DECLARE @RegCompetitorInfo AS TABLE
            ( [RegCompetitorInfoID] [INT] IDENTITY(1, 1) NOT NULL
             ,[RegID]              [INT] NULL
             ,[SessionID]          [VARCHAR](50) NULL
             ,[Brand]              [VARCHAR](50) NULL
             ,[Model]              [VARCHAR](100) NULL --01/07/2019
             ,[Price]              [MONEY] NULL
             ,[IsActive]           [BIT] NOT NULL
             ,[UDF]                [NVARCHAR](MAX) NULL
             ,[CreateUser]         [sec].[USERNAME] NOT NULL
             ,[CreateDate]         [SMALLDATETIME] NOT NULL
             ,[ModifyUser]         [sec].[USERNAME] NULL
             ,[ModifyDate]         [SMALLDATETIME] NULL)
          DECLARE @RegRolloutSchedule AS TABLE
            ( [RegRolloutScheduleID] [INT] IDENTITY(1, 1) NOT NULL
             ,[RegID]               [INT] NULL
             ,[SessionID]           [VARCHAR](50) NULL
             ,[RegProductID]        NVARCHAR(50)
			 ,mnfpartnumber			NVARCHAR(100) --12/05/2018
             ,[Quantity]            [INT] NULL
             ,[RolloutDate]         VARCHAR(20) NULL
             ,[Notes]               [NVARCHAR](MAX) NULL
             ,[UDF]                 [NVARCHAR](MAX) NULL
             ,[CreateUser]          [sec].[USERNAME] NOT NULL
             ,[CreateDate]          [SMALLDATETIME] NOT NULL
             ,[ModifyUser]          [sec].[USERNAME] NULL
             ,[ModifyDate]          [SMALLDATETIME] NULL)
          --07/20/2015
          DECLARE @chkDuplicatereg AS TABLE
            ( Id                      INT IDENTITY(1, 1)
             ,reGid                  INT
             ,SessionId              VARCHAR(50)
             ,reGnumBer              NVARCHAR(100)
             ,reSellerCompanyId      INT
             ,reSellerCompanyName    NVARCHAR(100)
             ,DistributorCompanyId   INT
             ,DistributorCompanyName NVARCHAR(100)
             ,EndUserCompanyId       INT
             ,EndUserCompanyName     NVARCHAR(100)
             ,CreateDate             SMALLDATETIME
             ,StatusName             NVARCHAR(50))

		--04/06/2018
		declare @multiDistiGridTypeid int
			,@inputAppQuantity bit = 0
			,@inputReqQuantity bit = 0
			,@inputListPrice bit = 0
			,@inputAppPrice bit = 0
			,@inputReqPrice bit = 0
			,@inputDistyPrice bit = 0  --12/16/2021

			,@AppQuantityUdfieldid int
			,@ReqQuantityUdfieldid int
			,@ListPriceUdfieldid int
			,@AppPriceUdfieldid int
			,@ReqPriceUdfieldid int
			,@comtrendOrgid int --02/01/2019
			,@DistyPriceUdfieldid int   --12/16/2021
			,@SecurityRoleTypeName varchar(255)
			,@PartnerLevel char(1)            --02/01/2022
			,@CanDistyViewDistyPrice bit = 0  --02/01/2022

		SELECT @SecurityRoleTypeName = srt.SecurityRoleTypeName     --12/16/2021
				 FROM   sec.UserAccount ua
								 INNER JOIN sec.securityrole sr
										 ON sr.securityroleid = ua.roleid
								INNER JOIN sec.SecurityRoleType srt on srt.SecurityRoleTypeID = sr.SecurityRoleTypeID
						  WHERE  ua.userid = @LoginUserID

		select @orgid = orgid from org.registration where regid = @regid --10/24/2018
		select @multiDistiGridTypeid = gridtypeid from gridtype where gridtype = 'Multi Disti Grid' and isactive = 1
		select @comtrendOrgid = orgid  from partnerportal.sec.organization where orgname = 'Comtrend'	--02/01/2019

		
		--10/24/2018
		select @AppQuantityUdfieldid = udfieldid from org.udfield where fieldname in ('Approved Quantity') and maptotable = 'registrationproduct' and maptocolumn = 'AppQuantity'
		select @ReqQuantityUdfieldid = udfieldid from org.udfield where fieldname in ('Requested Quantity') and maptotable = 'registrationproduct' and maptocolumn = 'ReqQuantity'
		select @ListPriceUdfieldid = udfieldid from org.udfield where fieldname in ('List Price') and maptotable = 'registrationproduct' and maptocolumn = 'ListPrice'
		select @AppPriceUdfieldid = udfieldid from org.udfield where fieldname in ('AppPrice') and maptotable = 'registrationproduct' and maptocolumn = 'AppPrice'
		select @ReqPriceUdfieldid = udfieldid from org.udfield where fieldname in ('Requested Price') and maptotable = 'registrationproduct' and maptocolumn = 'ReqPrice'
		select @DistyPriceUdfieldid = udfieldid from org.udfield where fieldname in ('DistyPrice') and MapToTable = 'registrationproduct' and maptocolumn='distyprice'   --12/16/2021

		if exists (select 1 from org.udformgridfield where orgid = @orgid and udfieldid = @AppQuantityUdfieldid and datacomponent like '%input%')
			set @inputAppQuantity = 1
		if exists (select 1 from org.udformgridfield where orgid = @orgid and udfieldid = @ReqQuantityUdfieldid and datacomponent like '%input%')
			set @inputReqQuantity = 1	
		if exists (select 1 from org.udformgridfield where orgid = @orgid and udfieldid = @ListPriceUdfieldid and datacomponent like '%input%')
			set @inputListPrice = 1
		if exists (select 1 from org.udformgridfield where orgid = @orgid and udfieldid = @AppPriceUdfieldid and datacomponent like '%input%')
			set @inputAppPrice = 1
		if exists (select 1 from org.udformgridfield where orgid = @orgid and udfieldid = @ReqPriceUdfieldid and datacomponent like '%input%')
			set @inputReqPrice = 1
		
		 --12/16/2021
		if exists (select 1 from org.udformgridfield where orgid = @orgid and udfieldid = @DistyPriceUdfieldid and datacomponent like '%input%')
			set @inputDistyPrice = 1
		
		--02/01/2022
		SELECT @PartnerLevel = pc.PartnerLevel, @CanDistyViewDistyPrice = p.CanDistyViewDistyPrice
		FROM org.Program p
		LEFT JOIN sec.UserAccount ua
			ON ua.UserId = @LoginUserID
		LEFT JOIN Org.ProgramCompany pc
			ON pc.ProgramId = p.ProgramId AND pc.CompanyID = ua.CompanyID
		LEFT JOIN org.Registration r
			ON r.ProgramId = p.ProgramId
		WHERE r.REgId = @RegID


          --07/20/2015
          INSERT INTO @RegistrationContact
		  SELECT regct.[RegID]
            ,regct.[CompanyId]
            ,regct.[CompanyName]
            ,regct.[Department]
            ,regct.[Division]
            ,regct.[StreetAddress]
            ,regct.[City]
            ,regct.ProvinceStateCode
            ,regct.country3
            ,regct.[PostalCode]
            ,regct.[FirstName]
            ,regct.[LastName]
            ,regct.[Title]
            ,regct.[EmailAddress]
            ,regct.[PrimaryPhone]
            ,regct.[Fax]
            ,regct.[MobilePhone]
            ,regct.[OtherPhone]
            ,regct.[Notes]
            ,regct.[Website]
            ,regct.[ContactTypeID]
            ,regct.udf
			,row_number() over (partition by regct.contacttypeid order by regct.companyid) as RowNum --04/06/2018
			,regct.ContactID --09/29/2021
		from
		--07/30/2018 - derive data from org.registrationcontactaudit
			(select distinct 
				 rc.[RegID]
				,rc.[CompanyId]
				,coalesce(rc.companyname, c.[CompanyName]) CompanyName --10/12/2018
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[Department] else rc.[Department] end [Department]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[Division] else rc.[Division] end [Division]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[StreetAddress] else rc.[StreetAddress] end [StreetAddress]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[City] else rc.[City] end [City]
				,t.ProvinceStateCode
				,t.country3
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[PostalCode] else rc.[PostalCode] end [PostalCode]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[FirstName] else rc.[FirstName] end [FirstName]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[LastName] else rc.[LastName] end [LastName]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[Title] else rc.[Title] end [Title]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[EmailAddress] else rc.[EmailAddress] end [EmailAddress]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[PrimaryPhone] else rc.[PrimaryPhone] end [PrimaryPhone]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[Fax] else rc.[Fax] end [Fax]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[MobilePhone] else rc.[MobilePhone] end [MobilePhone]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[OtherPhone] else rc.[OtherPhone] end [OtherPhone]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[Notes] else rc.[Notes] end [Notes]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[Website] else rc.[Website] end [Website]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[ContactTypeID] else rc.[ContactTypeID] end [ContactTypeID]
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.udf else rc.udf end udf
				,case when rca.regcontactid is not null and rca.[RegID] is not null and ( rc.IsCommitted = 0 or rc.TempIsActive = 1 ) then rca.[ContactID] else rc.[ContactID] end [ContactID]
			from   [org].[RegistrationContact] rc with (nolock)
			left join org.company c with (nolock)
				on c.companyid = rc.companyid
			left join DBO.territory t with (nolock)
				on t.TerritoryId = rc.TerritoryID
			left join org.registrationcontactaudit rca with (nolock)
				on rca.RegContactID = rc.RegContactId 
				and ( ( ( select count(*) from org.registrationcontactaudit where regcontactid = rc.regcontactid and sessionid = rc.sessionid ) > 1 
								and rca.createdate = ( select max(createdate) from org.registrationcontactaudit where regcontactid = rc.regcontactid and sessionid = rc.sessionid and IsCommitted = 1 ) )
						or ( select count(*) from org.registrationcontactaudit where regcontactid = rc.regcontactid ) = 1 )


			/*
			left join org.registrationcontactaudit rca with (nolock)
				on rca.RegContactID = rc.RegContactId 
				and coalesce(rca.SessionID, '') = coalesce(rc.SessionID, '') --10/12/2018
				--10/19/2018
				-- > 1 contact audit data lines and contact modifydate = last contact audit create date. if contact modify date doesn't exist, retrieve data line with latest contact audit create date.
				-- or = 1 contact audit data line
				and ( ( ( select count(*) from org.registrationcontactaudit where regcontactid = rc.regcontactid ) > 1 
						and ( rc.modifydate is not null and rc.modifydate = (select max(createdate) from org.registrationcontactaudit where regcontactid = rc.regcontactid ) 
								and rca.createdate = (select max(createdate) from org.registrationcontactaudit where regcontactid = rc.regcontactid ) )
							or ( rc.modifydate is null and rca.createdate = (select max(createdate) from org.registrationcontactaudit where regcontactid = rc.regcontactid ) ) 
							) 
						or ( select count(*) from org.registrationcontactaudit where regcontactid = rc.regcontactid ) = 1 
					   )  
			*/		     
			where rc.[RegID] = @RegID
			and coalesce(rc.isactive, 1) = 1 /* 04/24/2018 cmrThanh */
			) regct


          INSERT INTO @Registration
          SELECT DISTINCT r.[RegID]
                          ,r.[OrgID]
                          ,r.[OwnerID]
                          ,r.[RegNumber]
                          ,r.[ProgramID]
                          ,r.[FormID]
                          ,r.[ResellerID]
                          ,r.[DistributorID]
                          ,r.[EndUserId]
                          ,r.[ReqType]
                          ,r.[Comments]
                          ,CONVERT (VARCHAR(20), r.[ExpirationDate], 101)
                          ,CONVERT (VARCHAR(20), r.[EstCloseDate], 101)
                          ,r.[NextApproverID]
                          ,r.[ProgramStatusID]
                          ,r.[UDF]
                          ,r.[IsActive]
                          ,r.[CreateUser]
                          ,r.[CreateDate]
                          ,r.[ModifyUser]
                          ,r.[ModifyDate]
                          ,r.ForwardApplicationto
                          ,r.EmailSend
                          ,r.isRenew
                          ,r.StartDate--02/10/215
                          ,r.SessionID--03/31/2015
          FROM   ORG.registration R
          WHERE  r.RegID = @RegID

          INSERT INTO @eval
                      (MapTotAble
                       ,MapToColumn
                       ,DataValue)
          SELECT 'Registration'
                 ,Col
                 ,value
          FROM   (SELECT CAST([RegNumber] AS NVARCHAR(MAX))             AS [RegNumber]
                         ,CAST([ResellerID] AS NVARCHAR(MAX))           AS [ResellerID]
                         ,CAST([DistributorID] AS NVARCHAR(MAX))        AS [DistributorID]
                         ,CAST([EndUserId] AS NVARCHAR(MAX))            AS [EndUserId]
                         ,CAST([ReqType] AS NVARCHAR(MAX))              AS [ReqType]
                         ,CAST([Comments] AS NVARCHAR(MAX))             AS [Comments]
                         ,CAST([ExpirationDate] AS NVARCHAR(MAX))       AS [ExpirationDate]
                         ,CAST([EstCloseDate] AS NVARCHAR(MAX))         AS [EstCloseDate]
                         ,CAST([NextApproverID] AS NVARCHAR(MAX))       AS [NextApproverID]
                         ,CAST([ProgramStatusID] AS NVARCHAR(MAX))      AS [ProgramStatusID]
                         ,CAST([CreateUser] AS NVARCHAR(MAX))           AS [CreateUser]
                         ,CAST([CreateDate] AS NVARCHAR(MAX))           AS [CreateDate]
                         ,CAST([ModifyUser] AS NVARCHAR(MAX))           AS [ModifyUser]
                         ,CAST([ModifyDate] AS NVARCHAR(MAX))           AS [ModifyDate]
                         ,CAST([ForwardApplicationto] AS NVARCHAR(MAX)) AS ForwardApplicationto
                         ,CAST([EmailSend] AS NVARCHAR(MAX))            AS EmailSend
                         ,CAST([isRenew] AS NVARCHAR(MAX))              AS isRenew
                         ,CAST([StartDate] as NVARCHAR(MAX))            as StartDate --02/10/2015
                  FROM   @Registration)R
                 UNPIVOT (VALUE
                         FOR COL IN ( [RegNumber]
                                      ,[ResellerID]
                                      ,[DistributorID]
                                      ,[EndUserId]
                                      ,[ReqType]
                                      ,[Comments]
                                      ,[ExpirationDate]
                                      ,[EstCloseDate]
                                      ,[NextApproverID]
                                      ,[ProgramStatusID]
                                      ,[CreateUser]
                                      ,[CreateDate]
                                      ,[ModifyUser]
                                      ,[ModifyDate]
                                      ,[ForwardApplicationto]
                                      ,[EmailSend]
                                      ,[isRenew]
                                      ,STARTDATE )--02/10/2015
                 ) AS UNPVT

          SELECT @ProgramStatusID = ProgramStatusID
          FROM   @Registration;

          --/Start 6/24/2014 add registration status grid
          --WITH Cte
          --     AS (
          INSERT INTO @RegistrationStatus
          SELECT RegStatusID
                 ,ownerid
                 ,RegID
                 ,ProgramStatusID
                 ,ReviewerComments
                 ,InternalComments
                 ,ReqType
                 ,UDF
                 ,CreateUser
                 ,CreateDate
          FROM   ORG.RegistrationStatus
          WHERE  RegID = @RegID
          ORDER  BY CreateDate DESC

          --),
          --     Cte2_ReviewerComments
          --     AS (SELECT Cast((SELECT CONVERT(VARCHAR(20), CreateDate, 101) + ' '
          --                             + Createuser + ': ' + ReviewerComments + ';'
          --                             + Char(10)
          --                      FROM   Cte
          --                      ORDER  BY CreateDate DESC
          --                      FOR xml path('')) AS VARCHAR(max)) AS ReviewerCommentsReadonly),
          --     Cte3_InternalComments
          --     AS (SELECT Cast((SELECT CONVERT(VARCHAR(20), CreateDate, 101) + ' '
          --                             + Createuser + ': ' + InternalComments + ';'
          --                             + Char(10)
          --                      FROM   Cte
          --                      ORDER  BY CreateDate DESC
          --                      FOR xml path('')) AS VARCHAR(max)) AS InternalCommentsReadonly)
          --INSERT INTO @RegistrationStatus
          --            (ProgramStatusID,RegID,ownerid,CreateDate,CreateUser,ModifyDate,ModifyUser,InternalComments,ReviewerComments,UDF,ReviewerCommentsReadonly,InternalCommentsReadonly)
          --SELECT TOP 1 ProgramStatusID
          --             , RegID
          --             , ownerid
          --             , CreateDate
          --             , CreateUser
          --             , ModifyDate
          --             , ModifyUser
          --             , InternalComments
          --             , ReviewerComments
          --             , udf
          --             , ReviewerCommentsReadonly
          --             , InternalCommentsReadonly
          --FROM   Cte,
          --       Cte2_ReviewerComments,
          --       Cte3_InternalComments
          --WHERE  ProgramStatusID = @ProgramStatusID
          --ORDER  BY CreateDate DESC
          --/End 6/24/2014 add registration status grid

          INSERT INTO @eval
                      (MapTotAble
                       ,MapToColumn
                       ,DataValue)
          SELECT 'RegistrationStatus'
                 ,Col
                 ,value
          FROM   (SELECT TOP 1 CAST(ProgramStatusID AS NVARCHAR(MAX)) AS ProgramStatusID
                               ,CAST(RegID AS NVARCHAR(MAX))          AS RegID
                               ,CAST(CreateDate AS NVARCHAR(MAX))     AS CreateDate
                               ,CAST(CreateUser AS NVARCHAR(MAX))     AS CreateUser
                  --, Cast(InternalComments AS NVARCHAR)         AS InternalComments
                  --, Cast(ReviewerComments AS NVARCHAR)         AS ReviewerComments
                  FROM   @RegistrationStatus
                  WHERE  ProgramStatusID = @ProgramStatusID
                  ORDER  BY CreateDate DESC)Rs
                 UNPIVOT (VALUE
                         FOR COL IN ( PROGRAMSTATUSID
                                      ,REGID
                                      ,CREATEDATE
                                      ,CREATEUSER
                 -- ,InternalComments
                 --  ,ReviewerComments
                 ) ) AS UNPVT

          SELECT @XmlDocument = UDF
          FROM   @RegistrationStatus

          EXEC sp_xml_PrepareDocument
            @DocHandle OUTPUT
            ,@XmlDocument

          INSERT @eval
                 (UDFieldID
                  ,Datavalue)
          SELECT FieldID
                 ,DataValue
          FROM   OPENXML (@DocHandle, '//Field', 11)
                    WITH (FieldID    VARCHAR(10)
                          ,DataValue VARCHAR(1024) )

          EXEC sp_xml_RemoveDocument
            @DocHandle

          --/Start 6/24/2014 add registration status grid Adding table output
          DECLARE @RegistrationStatusGridTypeId INT

          SELECT @RegistrationStatusGridTypeId = GridTypeId
          FROM   GridType
          WHERE  GridType = 'Registation Status Grid'

          INSERT INTO @eval
                      (MapTotAble
                       ,MapToColumn
                       ,DataValue
                       ,Rownum
                       ,GridTypeId)
          SELECT 'RegistrationStatusGrid'
                 ,Col
                 ,value
                 ,RegStatusRowNum
                 ,@RegistrationStatusGridtypeid
          FROM   (SELECT CAST(rs.RegStatusRowNum AS NVARCHAR(MAX)) AS RegStatusRowNum
                         ,CAST(ps.StatusName AS NVARCHAR(MAX))     AS StatusName
                         ,CAST(rs.CreateDate AS NVARCHAR(MAX))     AS CreateDate
                         ,CAST(rs.CreateUser AS NVARCHAR(MAX))     AS CreateUser
                         ,CAST(InternalComments AS NVARCHAR(MAX))  AS InternalComments
                         ,CAST(ReviewerComments AS NVARCHAR(MAX))  AS ReviewerComments
                  FROM   @RegistrationStatus rs
                         INNER JOIN ORG.programStatus ps
                                 ON ps.ProgramStatusID = rs.ProgramStatusID)Rs
                 UNPIVOT (VALUE
                         FOR COL IN ( STATUSNAME
                                      ,CREATEDATE
                                      ,CREATEUSER
                                      ,INTERNALCOMMENTS
                                      ,REVIEWERCOMMENTS) ) AS UNPVT

          --/End 6/24/2014 add registration status grid Adding table output
          INSERT INTO @eval
                      (MapTotAble
                       ,MapToColumn
                       ,DataValue
					   ,Rownum --04/06/2018
					   ,GridTypeID --04/06/2018 
					   )
          SELECT 'RegistrationContact'
                 ,Col
                 ,value
				 ,Rownum --04/06/2018
				 ,null --,@multiDistiGridTypeid --04/06/2018 
          FROM   (SELECT CAST([CompanyId] AS NVARCHAR(MAX))        AS [ResellerID]
                         ,CAST([CompanyName] AS NVARCHAR(MAX))     AS [ResellerCompanyName]
                         ,CAST([Department] AS NVARCHAR(MAX))      AS [ResellerDepartment]
                         ,CAST([Division] AS NVARCHAR(MAX))        AS [ResellerDivision]
                         ,CAST([StreetAddress] AS NVARCHAR(MAX))   AS [ResellerStreetAddress]
                         ,CAST([City] AS NVARCHAR(MAX))            AS [ResellerCity]
                         ,CAST(ProvinceStateCode AS NVARCHAR(MAX)) AS [ResellerState]
                         ,CAST(Country3 AS NVARCHAR(MAX))          AS [ResellerCountry]
                         ,CAST([PostalCode] AS NVARCHAR(MAX))      AS [ResellerPostalCode]
                         ,CAST([FirstName] AS NVARCHAR(MAX))       AS [ResellerFirstName]
                         ,CAST([LastName] AS NVARCHAR(MAX))        AS [ResellerLastName]
                         ,CAST(Title AS NVARCHAR(MAX))             AS ResellerTitle
                         ,CAST([EmailAddress] AS NVARCHAR(MAX))    AS [ResellerEmailAddress]
                         ,CAST([PrimaryPhone] AS NVARCHAR(MAX))    AS [ResellerPrimaryPhone]
                         ,CAST([Fax] AS NVARCHAR(MAX))             AS [ResellerFax]
                         ,CAST([MobilePhone] AS NVARCHAR(MAX))     AS [ResellerMobilePhone]
                         ,CAST([OtherPhone] AS NVARCHAR(MAX))      AS [ResellerOtherPhone]
                         ,CAST([Notes] AS NVARCHAR(MAX))           AS [ResellerNotes]
                         ,CAST([Website] AS NVARCHAR(MAX))         AS [ResellerWebsite]
						 ,CAST([RowNum] AS NVARCHAR(MAX))        AS [RowNum] --04/06/2018
                  FROM   @RegistrationContact
                  WHERE  ContactTypeID = 1) Rc
                 UNPIVOT (VALUE
                         FOR COL IN ( [ResellerID]
                                      ,[ResellerCompanyName]
                                      ,[ResellerDepartment]
                                      ,[ResellerDivision]
                                      ,[ResellerStreetAddress]
                                      ,[ResellerCity]
                                      ,[ResellerState]
                                      ,[ResellerCountry]
                                      ,[ResellerPostalCode]
                                      ,[ResellerFirstName]
                                      ,[ResellerLastName]
                                      ,RESELLERTITLE
                                      ,[ResellerEmailAddress]
                                      ,[ResellerPrimaryPhone]
                                      ,[ResellerFax]
                                      ,[ResellerMobilePhone]
                                      ,[ResellerOtherPhone]
                                      ,[ResellerNotes]
                                      ,[ResellerWebsite]
									  ))AS UNPVT

          INSERT INTO @eval
                      (Maptotable
                       ,MaptoColumn
                       ,Datavalue
					   ,Rownum --04/06/2018
					   ,GridTypeID --04/06/2018 
					   )
          SELECT 'RegistrationContact'
                 ,Col
                 ,value
				 ,Rownum --04/06/2018
				 ,@multiDistiGridTypeid --04/06/2018
          FROM   (SELECT CAST([CompanyId] AS NVARCHAR(MAX))       AS [DistributorID]
                         ,CAST([CompanyName] AS NVARCHAR(MAX))    AS [DistributorCompanyName]
                         ,CAST([Department] AS NVARCHAR(MAX))     AS [DistributorDepartment]
                         ,CAST([Division] AS NVARCHAR(MAX))       AS [DistributorDivision]
                         ,CAST([StreetAddress] AS NVARCHAR(MAX))  AS [DistributorStreetAddress]
                         ,CAST([City] AS NVARCHAR(MAX))           AS [DistributorCity]
                         ,CAST(ProvinceStateCode AS NVARCHAR(MAX))AS [DistributorState]
                         ,CAST(Country3 AS NVARCHAR(MAX))         AS [DistributorCountry]
                         ,CAST([PostalCode] AS NVARCHAR(MAX))     AS [DistributorPostalCode]
                         ,CAST([FirstName] AS NVARCHAR(MAX))      AS [DistributorFirstName]
                         ,CAST([LastName] AS NVARCHAR(MAX))       AS [DistributorLastName]
                         ,CAST(Title AS NVARCHAR(MAX))            AS DistributorTitle
                         ,CAST([EmailAddress] AS NVARCHAR(MAX))   AS [DistributorEmailAddress]
                         ,CAST([PrimaryPhone] AS NVARCHAR(MAX))   AS [DistributorPrimaryPhone]
                         ,CAST([Fax] AS NVARCHAR(MAX))            AS [DistributorFax]
                         ,CAST([MobilePhone] AS NVARCHAR(MAX))    AS [DistributorMobilePhone]
                         ,CAST([OtherPhone] AS NVARCHAR(MAX))     AS [DistributorOtherPhone]
                         ,CAST([Notes] AS NVARCHAR(MAX))          AS [DistributorNotes]
                         ,CAST([Website] AS NVARCHAR(MAX))        AS [DistributorWebsite]
						 ,CAST([RowNum] AS NVARCHAR(MAX))		  AS [RowNum] --04/06/2018
						 ,CAST([ContactID] AS NVARCHAR(MAX))		  AS [DistributorContactID] --09/29/2021
                  FROM   @RegistrationContact
                  WHERE  ContactTypeID = 2) Rc
                 UNPIVOT (VALUE
                         FOR COL IN ( [DistributorID]
                                      ,[DistributorCompanyName]
                                      ,[DistributorDepartment]
                                      ,[DistributorDivision]
                                      ,[DistributorStreetAddress]
                                      ,[DistributorCity]
                                      ,[DistributorState]
                                      ,[DistributorCountry]
                                      ,[DistributorPostalCode]
                                      ,[DistributorFirstName]
                                      ,[DistributorLastName]
                                      ,DISTRIBUTORTITLE
                                      ,[DistributorEmailAddress]
                                      ,[DistributorPrimaryPhone]
                                      ,[DistributorFax]
                                      ,[DistributorMobilePhone]
                                      ,[DistributorOtherPhone]
                                      ,[DistributorNotes]
                                      ,[DistributorWebsite]
									  ,[DistributorContactID] --09/29/2021
									  ))AS UNPVT

          INSERT INTO @eval
                      (MapTotAble
                       ,MapToColumn
                       ,DataValue
					   ,Rownum --04/06/2018
					   ,GridTypeID --04/06/2018
					   )
          SELECT 'RegistrationContact'
                 ,Col
                 ,value
				 ,Rownum --04/06/2018
				 ,null -- ,@multiDistiGridTypeid --04/06/2018
          FROM   (SELECT CAST([CompanyId] AS NVARCHAR(MAX))       AS [EndUserID]
                         ,CAST([CompanyName] AS NVARCHAR(MAX))    AS [EndUserCompanyName]
                         ,CAST([Department] AS NVARCHAR(MAX))     AS [EndUserDepartment]
                         ,CAST([Division] AS NVARCHAR(MAX))       AS [EndUserDivision]
                         ,CAST([StreetAddress] AS NVARCHAR(MAX))  AS [EndUserStreetAddress]
                         ,CAST([City] AS NVARCHAR(MAX))           AS [EndUserCity]
                         ,CAST(ProvinceStateCode AS NVARCHAR(MAX))AS [EndUserState]
                         ,CAST(Country3 AS NVARCHAR(MAX))         AS [EndUserCountry]
                         ,CAST([PostalCode] AS NVARCHAR(MAX))     AS [EndUserPostalCode]
                         ,CAST([FirstName] AS NVARCHAR(MAX))      AS [EndUserFirstName]
                         ,CAST([LastName] AS NVARCHAR(MAX))       AS [EndUserLastName]
                         ,CAST(Title AS NVARCHAR(MAX))            AS EndUserTitle
                         ,CAST([EmailAddress] AS NVARCHAR(MAX))   AS [EndUserEmailAddress]
                         ,CAST([PrimaryPhone] AS NVARCHAR(MAX))   AS [EndUserPrimaryPhone]
                         ,CAST([Fax] AS NVARCHAR(MAX))            AS [EndUserFax]
                         ,CAST([MobilePhone] AS NVARCHAR(MAX))    AS [EndUserMobilePhone]
                         ,CAST([OtherPhone] AS NVARCHAR(MAX))     AS [EndUserOtherPhone]
                         ,CAST([Notes] AS NVARCHAR(MAX))          AS [EndUserNotes]
                         ,CAST([Website] AS NVARCHAR(MAX))        AS [EndUserWebsite]
						 ,CAST([RowNum] AS NVARCHAR(MAX))        AS [RowNum] --04/06/2018
                  FROM   @RegistrationContact
                  WHERE  ContactTypeID = 3) Rc
                 UNPIVOT (VALUE
                         FOR COL IN ( [EndUserID]
                                      ,[EndUserCompanyName]
                                      ,[EndUserDepartment]
                                      ,[EndUserDivision]
                                      ,[EndUserStreetAddress]
                                      ,[EndUserCity]
                                      ,[EndUserState]
                                      ,[EndUserCountry]
                                      ,[EndUserPostalCode]
                                      ,[EndUserFirstName]
                                      ,[EndUserLastName]
                                      ,ENDUSERTITLE
                                      ,[EndUserEmailAddress]
                                      ,[EndUserPrimaryPhone]
                                      ,[EndUserFax]
                                      ,[EndUserMobilePhone]
                                      ,[EndUserOtherPhone]
                                      ,[EndUserNotes]
                                      ,[EndUserWebsite]
									  )) AS UNPVT
	
			
          INSERT INTO @RegistrationProduct
          SELECT  rp.RegProductID
				 ,rp.ProductID
                 ,rp.[RegID]
                 ,rp.[SessionID]
                 ,p.mnfpartnumber --[ProductID]
                 ,p.ProductDescription
				 ,p.ProductLine --kenny 08102020
                 ,rp.[ReqQuantity]
                 ,rp.[AppQuantity]
                 ,rp.[ListPrice]
                 ,rp.[ReqPrice]
                 ,rp.[AppPrice]
                 ,rp.[Discount]
                 ,rp.[GrandTotal]
                 ,rp.[IsActive]
                 ,coalesce(rp.[UDF], '') as UDF --9/7/2021
                 ,rp.[CreateUser]
                 ,rp.[CreateDate]
                 ,rp.[ModifyUser]
                 ,rp.[ModifyDate]
				 --ONLY FOR COMTREND client: if total price exists, show it even when it's 0.  otherwise, calculate base on formula (list price/app price/req price) * (app quantity/req quantity)
				 --FOR OTHER CLIENTS OTHER THAN COMTREND if total price exists and not equals 0, show it.  otherwise, calculate base on formula (list price/app price/req price) * (app quantity/req quantity)
				 ,case when @orgid = @comtrendOrgid and rp.TotalPrice is not null then rp.totalprice						--02/01/2019
					when @orgid <> @comtrendOrgid and nullif(rp.TotalPrice, 0.00) is not null then rp.totalprice		--02/01/2019
					else ( case when @inputListPrice = 1 and nullif(rp.ListPrice, 0) is not null and nullif(rp.AppPrice, 0) is null and nullif(rp.ReqPrice, 0) is null then rp.[ListPrice] 
							when @inputAppPrice = 1 and nullif(rp.AppPrice, 0) is not null and nullif(rp.ReqPrice, 0) is null then rp.appprice 
							when @inputReqPrice = 1 and nullif(rp.ReqPrice, 0) is not null and nullif(rp.AppPrice, 0) is null then rp.reqprice 
							else 0 end )
						* ( case when @inputAppQuantity = 1 then rp.AppQuantity 
							when @inputReqQuantity = 1 then rp.ReqQuantity 
							else 0 end ) end TotalPrice /* 10/25/2018 */			 
				 ,coalesce(nullif(rp.[DiscountPrice], 0),nullif(rp.TotalPrice, 0), 0)  -- discountprice 20151207 
				 ,rp.TotalQuantity

				 /*orig: else coalesce(nullif(rp.[ListPrice], 0), nullif(rp.appprice, 0), nullif(rp.reqprice, 0), 0) 
						* coalesce(nullif(rp.[AppQuantity], 0), nullif(rp.ReqQuantity, 0)) */
				,rp.DiscountMultiplier --20210202
				,case when (@SecurityRoleTypeName = 'Internal' OR (@PartnerLevel = 'D' AND @CanDistyViewDistyPrice = 1)) then rp.DistyPrice else rp.ListPrice end [DistyPrice] --12/16/2021 --02/01/2022
          FROM   [org].[RegistrationProduct] rp
                 LEFT JOIN [Org].[Product] p
                        ON rp.ProductID = p.ProductID
          WHERE  
					( regid = @RegID
							--03/31/2015
							or Sessionid = (Select SessionID from   @Registration) 
					)	
					and ( rp.tempisActive = 1  or rp.isActive = 1 ) 
					and not ( rp.tempisActive = 0 and rp.isActive = 1 ) 


          --03/31/2015
          INSERT INTO @eval
                      (Maptotable
                       ,MaptoColumn
                       ,Datavalue
                       ,rownum
                       ,GridTypeID)
          SELECT 'RegistrationProduct' MaptoTable
                 ,MaptoColumn
                 ,value
				  ,[RegistrationProductNum]       AS rownum --11/29/2021
                 --,[RegProductID]       AS rownum
                 ,'3'                  GridTypeID
          FROM   (SELECT CAST([ProductID] AS NVARCHAR(MAX))         AS [ProductID]
			,CAST([RegistrationProductNum] AS NVARCHAR(MAX))     AS [RegistrationProductNum]
            ,CAST([RegProductID] AS NVARCHAR(MAX))     AS [RegProductID]
            ,CAST(mnfpartnumber AS NVARCHAR(MAX))      AS mnfpartnumber
            ,CAST(ProductDescription AS NVARCHAR(MAX)) AS ProductDescription
            ,CAST(ProductLine AS NVARCHAR(MAX)) AS ProductLine --kenny 08102020
            ,CAST([ReqQuantity] AS NVARCHAR(MAX))      AS [ReqQuantity]
            ,CAST([AppQuantity] AS NVARCHAR(MAX))      AS [AppQuantity]
            ,CAST(CAST([ListPrice] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))        AS [ListPrice] --Modified price datattype to retain decimal values MB 03/21/2018
            ,CAST(CAST([ReqPrice] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))        AS [ReqPrice]--Modified price datattype to retain decimal values MB 03/21/2018
            ,CAST(CAST([AppPrice] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))        AS [AppPrice]--Modified price datattype to retain decimal values MB 03/21/2018
            ,CAST([Discount] AS NVARCHAR(MAX))        AS [Discount]
            ,CAST(CAST([GrandTotal] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))       AS [GrandTotal]--Modified price datattype to retain decimal values MB 03/21/2018
            ,CAST([IsActive] AS NVARCHAR(MAX))         AS [IsActive]
            ,CAST([CreateUser] AS NVARCHAR(MAX))       AS [CreateUser]
            ,CAST([CreateDate] AS NVARCHAR(MAX))       AS [CreateDate]
            ,CAST([ModifyUser] AS NVARCHAR(MAX))       AS [ModifyUser]
            ,CAST([ModifyDate] AS NVARCHAR(MAX))       AS [ModifyDate]
            ,CAST(CAST([TotalPrice] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))       AS [TotalPrice]--Modified price datattype to retain decimal values MB 03/21/2018						 
			,CAST(CAST([DiscountPrice] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))      AS [DiscountPrice]	 --Modified price datattype to retain decimal values MB 03/21/2018
			,CAST([TotalQuantity] AS NVARCHAR(MAX))       AS [TotalQuantity]	 --20151201
			,CAST(DiscountMultiplier AS NVARCHAR(MAX))       AS DiscountMultiplier	 --20210202
			,CAST(CAST([DistyPrice] as DECIMAL(30,4)) as NVARCHAR(MAX))			AS [DistyPrice] --12/16/2021
                  FROM   @RegistrationProduct) rp
                 UNPIVOT (VALUE
                         FOR MAPTOCOLUMN IN ( [mnfpartnumber]
                                              ,[ProductDescription]
											  ,[ProductLine] --kenny 08102020
											  ,[RegProductId]
                                              ,[ProductID]
                                              ,[ReqQuantity]
                                              ,[AppQuantity]
                                              ,[ListPrice]
                                              ,[ReqPrice]
                                              ,[AppPrice]
                                              ,[Discount]
                                              ,[GrandTotal]
                                              ,[IsActive]
                                              ,[CreateUser]
                                              ,[CreateDate]
                                              ,[ModifyUser]
                                              ,[ModifyDate]
											  ,[TotalPrice]
											  ,[DiscountPrice] --20151201
											  ,[TotalQuantity] --20151201
											  ,DiscountMultiplier --02/02/2021
											  ,[DistyPrice] --12/16/2021
											  )) AS UNPVT

          --/Start 07/02/2014 add registration status grid Adding table output
          INSERT INTO @RegProductAudit
                      (ProductID
                       ,[RegID]
                       ,[SessionID]
                       ,mnfpartnumber
                       ,[TotalPrice]
                       ,[AppQuantity]
                       ,[ListPrice]
					   ,[DistyPrice]  --12/16/2021
                       ,[CreateUser]
                       ,[CreateDate])
          SELECT pa.ProductID
                 ,pa.[RegID]
                 ,pa.[SessionID]
                 ,p.MnfPartNumber
                 ,pa.[TotalPrice]
                 ,pa.[AppQuantity]
                 ,pa.[ListPrice]
				 ,pa.[DistyPrice]  --12/16/2021
                 ,pa.[CreateUser]
                 ,pa.[CreateDate]
          FROM   ORG.RegistrationProductAudit pa
                 INNER JOIN ORG.Product p
                         ON p.ProductID = pa.ProductID
          WHERE  pa.regid = @RegID
          order  by pa.RegProductAuditID desc

          DECLARE @ProductHistoryGridtypeid INT

          SELECT @ProductHistoryGridtypeid = GridTypeID
          FROM   GridType
          WHERE  GridType = 'Registation Product Status Grid'

          INSERT INTO @eval
                      (Maptotable
                       ,MaptoColumn
                       ,Datavalue
                       ,rownum
                       ,GridTypeID)
          SELECT 'ProductStatusGrid'
                 ,Col
                 ,value
                 ,RegProductAuditrownum
                 ,@ProductHistoryGridtypeid
          FROM   (SELECT CAST(RegProductAuditrownum AS NVARCHAR(MAX)) AS RegProductAuditrownum
                         ,CAST(mnfpartnumber AS NVARCHAR(MAX))        AS mnfpartnumber
                         ,CAST(CAST([TotalPrice] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))       AS [TotalPrice]
                         ,CAST(AppQuantity AS NVARCHAR(MAX))          AS AppQuantity
                         ,CAST(CAST([ListPrice] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))        AS [ListPrice]
                         ,CAST(CreateDate AS NVARCHAR(MAX))           AS [CreateDate]
                         ,CAST(CreateUser AS NVARCHAR(MAX))           AS CreateUser
                  FROM   @RegProductAudit) pa
                 UNPIVOT (VALUE
                         FOR COL IN ( MNFPARTNUMBER
                                      ,TOTALPRICE
                                      ,APPQUANTITY
                                      ,LISTPRICE
                                      ,CREATEDATE
                                      ,CREATEUSER ) ) AS UNPVT

          --/End 6/24/2014 add registration status grid Adding table output
          INSERT INTO @RegCompetitorInfo
          SELECT [RegID]
                 ,[SessionID]
                 ,[Brand]
                 ,[Model]
                 ,[Price]
                 ,[IsActive]
                 ,[UDF]
                 ,[CreateUser]
                 ,[CreateDate]
                 ,[ModifyUser]
                 ,[ModifyDate]
          FROM   [org].RegCompetitorInfo
          WHERE  regid = @RegID

          INSERT INTO @eval
                      (Maptotable
                       ,MaptoColumn
                       ,Datavalue
                       ,rownum
                       ,GridTypeID)
          SELECT 'RegCompetitorInfo'  MaptoTable
                 ,MaptoColumn
                 ,value
                 ,RegCompetitorInfoID AS rownum
                 ,'2'                 GridTypeID
          FROM   (SELECT CAST(RegCompetitorInfoID AS NVARCHAR(MAX)) AS RegCompetitorInfoID
                         ,CAST([Brand] AS NVARCHAR(MAX))            AS [Brand]
                         ,CAST([Model] AS NVARCHAR(MAX))            AS [Model]
                         ,CAST(CAST([Price] AS DECIMAL(30, 4)) AS NVARCHAR(MAX))       AS [Price]
                         ,CAST([IsActive] AS NVARCHAR(MAX))         AS [IsActive]
                         ,CAST([CreateUser] AS NVARCHAR(MAX))       AS [CreateUser]
                         ,CAST([CreateDate] AS NVARCHAR(MAX))       AS [CreateDate]
                         ,CAST([ModifyUser] AS NVARCHAR(MAX))       AS [ModifyUser]
                         ,CAST([ModifyDate] AS NVARCHAR(MAX))       AS [ModifyDate]
                  FROM   @RegCompetitorInfo)RC
                 UNPIVOT (VALUE
                         FOR MAPTOCOLUMN IN ( [Brand]
                                              ,[Model]
                                              ,[Price]
                                              ,[IsActive]
                                              ,[CreateUser]
                                              ,[CreateDate]
                                              ,[ModifyUser]
                                              ,[ModifyDate])) AS UNPVT

          INSERT INTO @RegRolloutSchedule
		  	([RegID]
             ,[SessionID]
             ,[RegProductID]       
			 ,mnfpartnumber			
             ,[Quantity]           
             ,[RolloutDate]        
             ,[Notes]              
             ,[UDF]                
             ,[CreateUser]         
             ,[CreateDate]         
             ,[ModifyUser]         
             ,[ModifyDate]         
			 )
          SELECT rr.[RegID]
                 ,rr.[SessionID]
                 ,rp.RegProductID 
				 ,p.mnfpartnumber --12/05/2018
                 ,rr.[Quantity]
                 ,CONVERT (VARCHAR(20), rr.[RolloutDate], 101)
                 ,rr.Notes
                 ,rr.[UDF]
                 ,rr.[CreateUser]
                 ,rr.[CreateDate]
                 ,rr.[ModifyUser]
                 ,rr.[ModifyDate]
          FROM   [org].RegRolloutSchedule rr
                 INNER JOIN ORG.RegistrationProduct rp
                         ON rp.RegProductID = rr.RegProductID
                 LEFT JOIN [Org].[Product] p
                        ON rp.ProductID = p.ProductID
          WHERE  rr.regid = @RegID

          INSERT INTO @eval
                      (Maptotable
                       ,MaptoColumn
                       ,Datavalue
                       ,rownum
                       ,GridTypeID)
          SELECT 'RegRolloutSchedule '   MaptoTable
                 ,MaptoColumn
                 ,value
                 ,[RegRolloutScheduleID] AS rownum
                 ,'1'                    GridTypeID
          FROM   (SELECT CAST([RegRolloutScheduleID] AS NVARCHAR(MAX)) AS [RegRolloutScheduleID]
                         ,CAST([RegID] AS NVARCHAR(MAX))               AS [RegID]
                         ,CAST([SessionID] AS NVARCHAR(MAX))           AS [SessionID]
                         ,CAST([RegProductID] AS NVARCHAR(MAX))        AS [RegProductID]
						 ,CAST([mnfpartnumber] AS NVARCHAR(MAX))       AS [mnfpartnumber] --12/05/2018
                         ,CAST([Quantity] AS NVARCHAR(MAX))            AS [Quantity]
                         ,CAST([RolloutDate] AS NVARCHAR(MAX))         AS [RolloutDate]
                         ,CAST([Notes] AS NVARCHAR(MAX))               AS [Notes]
                         ,CAST([UDF] AS NVARCHAR(MAX))                 AS [UDF]
                         ,CAST([CreateUser] AS NVARCHAR(MAX))          AS [CreateUser]
                         ,CAST([CreateDate] AS NVARCHAR(MAX))          AS [CreateDate]
                         ,CAST([ModifyUser] AS NVARCHAR(MAX))          AS [ModifyUser]
                         ,CAST([ModifyDate] AS NVARCHAR(MAX))          AS [ModifyDate]
                  FROM   @RegRolloutSchedule)RR
                 UNPIVOT (VALUE
                         FOR MAPTOCOLUMN IN ( [RegID]
                                              ,[SessionID]
                                              ,[RegProductID]
											  ,[mnfpartnumber] --12/05/2018
                                              ,[Quantity]
                                              ,[RolloutDate]
                                              ,[Notes]
                                              ,[UDF]
                                              ,[CreateUser]
                                              ,[CreateDate]
                                              ,[ModifyUser]
                                              ,[ModifyDate])) AS UNPVT

          SELECT @XmlDocument = UDF
          FROM   @Registration
		  
          EXEC Sp_xml_preparedocument
            @DocHandle OUTPUT
            ,@XmlDocument

          INSERT @eval
                 (UDfieldiD
                  ,DataValue)
          SELECT FieldID
                 ,DataValue
          FROM   OPENXML (@DocHandle, '//Field', 11)
                    WITH (FieldID    VARCHAR(20)
                          ,DataValue VARCHAR(MAX) )

          EXEC Sp_xml_removedocument
            @DocHandle

          SELECT @XmlDocument = UDF
          FROM   @RegistrationContact
          WHERE  ContactTypeID = 1

          EXEC Sp_xml_preparedocument
            @DocHandle OUTPUT
            ,@XmlDocument

          INSERT @eval
                 (UDfieldID
                  ,DataValue)
          SELECT FieldID
                 ,DataValue
          FROM   OPENXML (@DocHandle, '//Field', 11)
                    WITH (FieldID    VARCHAR(20)
                          ,DataValue VARCHAR(MAX) )

          EXEC Sp_xml_removedocument
            @DocHandle

          SELECT @XmlDocument = UDF
          FROM   @RegistrationContact
          WHERE  ContactTypeID = 2

          EXEC Sp_xml_preparedocument
            @DocHandle OUTPUT
            ,@XmlDocument

          INSERT @eval
                 (UDfieldiD
                  ,DataValue)
          SELECT FieldID
                 ,DataValue
          FROM   OPENXML (@DocHandle, '//Field', 11)
                    WITH (FieldID    VARCHAR(20)
                          ,DataValue VARCHAR(MAX) )

          EXEC Sp_xml_removedocument
            @DocHandle

          SELECT @XmlDocument = UDF
          FROM   @RegistrationContact
          WHERE  ContactTypeID = 3

          EXEC Sp_xml_preparedocument
            @DocHandle OUTPUT
            ,@XmlDocument

          INSERT @eval
                 (UDfieldiD
                  ,DataValue)
          SELECT FieldID
                 ,DataValue
          FROM   OPENXML (@DocHandle, '//Field', 11)
                    WITH (FieldID    VARCHAR(20)
                          ,DataValue VARCHAR(MAX) )

          EXEC sp_xml_RemoveDocument
            @DocHandle


		-- RegistrationProduct
		declare @regProductID int
		declare @rownumber int      --01/20/2022
		while (select count(*) from @RegistrationProduct)  > 0
		begin
				--set @regProductID = (select top 1 productid from @RegistrationProduct)
				select top 1 @regProductID = RegProductId, @rownumber = RegistrationProductNum from @RegistrationProduct  --01/20/2022

				SELECT @XmlDocument = UDF
				FROM   @RegistrationProduct
				where coalesce(udf, '') <> ''
				--and productid = @regProductID
				AND RegProductId = @regProductID  --01/20/2022

				EXEC Sp_xml_preparedocument
						@DocHandle OUTPUT
						,@XmlDocument

				INSERT @eval
						(UDfieldiD
						,DataValue
						,ProductID
						,rownum
						)
				SELECT FieldID
						,DataValue
						,@regProductID --ProductID
						,@rownumber
				FROM   OPENXML (@DocHandle, '//Field', 11)
						WITH (FieldID    VARCHAR(20)
								,DataValue VARCHAR(MAX) )

				EXEC sp_xml_RemoveDocument
				@DocHandle
	
				--delete from @RegistrationProduct where productid = @regProductID
				delete from @RegistrationProduct where RegProductId = @regProductID  --01/20/2022
		end



          --07/20/2015
          Select @DuplicateChk = DuplicateChk
          from   ORG.Program
          Where  ProgramID = (Select Programid 
                              from   @Registration)

          if ( @DuplicateChk = 1 )
            Begin
                INSERT INTO @chkDuplicatereg
                            (reGid
                             ,SessionID
                             ,reGnumBer
                             ,reSellerCompanyId
                             ,reSellerCompanyName
                             ,DistributorCompanyId
                             ,DistributorCompanyName
                             ,EndUserCompanyId
                             ,EndUserCompanyName
                             ,CreateDate
                             ,StatusName)
                SELECT reGid
                       ,SessionID
                       ,reGnumBer
                       ,reSellerCompanyId
                       ,reSellerCompanyName
                       ,DistributorCompanyId
                       ,DistributorCompanyName
                       ,EndUserCompanyId
                       ,EndUserCompanyName
                       ,CreateDate
                       ,StatusName
                FROM   [org].[fn_chkDuplicateRegistration] (@reGid)

                INSERT INTO @eval
                            (MapTotAble
                             ,MapToColumn
                             ,DataValue
                             ,Rownum
                             ,GridTypeId)
                SELECT 'DuplicateCheck ' MapTotAble
                       ,MapToColumn
                       ,Value
                       ,Id               AS Rownum
                       ,'9'             GridTypeId --9 on demo
                FROM   (SELECT CAST(Id AS NVARCHAR(MAX))                                                       AS Id
                               ,CAST([reGid] AS NVARCHAR(MAX))                                                 AS [reGid]
                               ,CAST('<a href="/DealReg/DealRegistration/OpportunityView?RegFormID='
                                     + CAST(reGid AS VARCHAR(20)) + '&SessionID=' + SessionID
                                     + '&IsRenew=0" target=”_blank”>' + [reGnumBer] + '</a>' AS NVARCHAR(MAX)) AS [reGnumBer]
                               ,CAST([reSellerCompanyId] AS NVARCHAR(MAX))                                     AS reSellerCompanyId
                               ,CAST([reSellerCompanyName] AS NVARCHAR(MAX))                                   AS reSellerCompanyName
                               ,CAST([DistributorCompanyId] AS NVARCHAR(MAX))                                  AS DistributorCompanyId
                               ,CAST([DistributorCompanyName] AS NVARCHAR(MAX))                                AS DistributorCompanyName
                               ,CAST([EndUserCompanyId] AS NVARCHAR(MAX))                                      AS EndUserCompanyId
                               ,CAST([EndUserCompanyName] AS NVARCHAR(MAX))                                    AS EndUserCompanyName
                               ,CAST([Createdate] AS NVARCHAR(MAX))                                            as CreateDate
                               ,CAST([StatusName] AS NVARCHAR(MAX))                                            as StatusName
                        FROM   @chkDuplicatereg)rr
                       UNPIVOT (VALUE
                               FOR MAPTOCOLUMN IN ( [RegID]
                                                    ,REGNUMBER
                                                    ,RESELLERCOMPANYID
                                                    ,RESELLERCOMPANYNAME
                                                    ,DISTRIBUTORCOMPANYID
                                                    ,DISTRIBUTORCOMPANYNAME
                                                    ,ENDUSERCOMPANYID
                                                    ,ENDUSERCOMPANYNAME
                                                    ,CREATEDATE
                                                    ,STATUSNAME )) AS UNPVT
            End --07/20/2015




		--04/17/2018 
		--if distributor user, use dealreg formid
		--if admin user or reseller user, use multi-disti-otter formid
		declare @isDistiUser bit = 0,
			@isMultiDisti bit = 0

		
		if @LoginUserID is not null
			and exists ( select 1
					from partnerportal.sec.useraccount ua with (nolock)
					left join partnerportal.sec.securityrole sr with (nolock) on sr.securityroleid = ua.roleid
					left join dealreg.org.programcompany pc with (nolock) on pc.companyid = ua.companyid
					left join dealreg.org.registration r with (nolock) on r.programid = pc.programid
					where ua.isactive = 1
					and sr.isactive = 1
					and sr.SecurityRoleId not in (1)
					and userid = @LoginUserID
					and r.regid = @regid
					and pc.partnerlevel in ('D') )
			set @isDistiUser = 1

		if @LoginUserID is not null
			and exists ( select 1
					from dealreg.org.program p with (nolock)
					join dealreg.org.registration r with (nolock) on r.programid = p.programid
					where p.isactive = 1
					and r.isactive = 1
					and r.regid = @regid
					and p.MultiDistiFormID is not null )
			set @isMultiDisti = 1

		 
		if @isMultiDisti = 1 and @isDistiUser = 1
		begin
			UPDATE e
			SET    e.UDFieldID = udf.UDFieldId
			FROM   ORG.UDFormField udff
					LEFT JOIN ORG.udfield udf
						ON udff.UDFieldID = udf.UDFieldId
					LEFT JOIN @eval e
						ON e.MaptoTable = udf.MapToTable AND e.MaptoColumn = udf.MaptoColumn
			WHERE  udff.UDFormid = (select distinct regformid from org.registration r join org.program p on p.programid = r.programid where r.regid = @RegID)

			UPDATE e
			SET    e.UDFieldID = udf.UDFieldId
			FROM   ORG.UDFormGridField ufgf
					LEFT JOIN ORG.udfield udf
						ON ufgf.UDFieldID = udf.UDFieldId
					LEFT JOIN @eval e
						ON e.MaptoTable = udf.MapToTable AND e.MaptoColumn = udf.MaptoColumn
			WHERE  ufgf.UDFormid = (select distinct regformid from org.registration r join org.program p on p.programid = r.programid where r.regid = @RegID)

		end
		else if @isMultiDisti = 1 and @isDistiUser = 0
		begin
			UPDATE e
			SET    e.UDFieldID = udf.UDFieldId
			FROM   ORG.UDFormField udff
					LEFT JOIN ORG.udfield udf
						ON udff.UDFieldID = udf.UDFieldId
					LEFT JOIN @eval e
						ON e.MaptoTable = udf.MapToTable AND e.MaptoColumn = udf.MaptoColumn
			WHERE  udff.UDFormid = (select distinct MultiDistiFormID from org.registration r join org.program p on p.programid = r.programid where r.regid = @RegID)

			UPDATE e
			SET    e.UDFieldID = udf.UDFieldId
			FROM   ORG.UDFormGridField ufgf
					LEFT JOIN ORG.udfield udf
						ON ufgf.UDFieldID = udf.UDFieldId
					LEFT JOIN @eval e
						ON e.MaptoTable = udf.MapToTable AND e.MaptoColumn = udf.MaptoColumn
			WHERE  ufgf.UDFormid = (select distinct MultiDistiFormID from org.registration r join org.program p on p.programid = r.programid where r.regid = @RegID)
		end
		else
		begin
			UPDATE e
			SET    e.UDFieldID = udf.UDFieldId
			FROM   ORG.UDFormField udff
					LEFT JOIN ORG.udfield udf
						ON udff.UDFieldID = udf.UDFieldId
					LEFT JOIN @eval e
						ON e.MaptoTable = udf.MapToTable AND e.MaptoColumn = udf.MaptoColumn
			WHERE  udff.UDFormid = (SELECT DISTINCT Formid FROM @Registration)
		
			UPDATE e
			SET    e.UDFieldID = udf.UDFieldId
			FROM   ORG.UDFormGridField ufgf
					LEFT JOIN ORG.udfield udf
						ON ufgf.UDFieldID = udf.UDFieldId
					LEFT JOIN @eval e
						ON e.MaptoTable = udf.MapToTable AND e.MaptoColumn = udf.MaptoColumn
			WHERE  ufgf.UDFormid = (SELECT DISTINCT Formid FROM @Registration)
		end

          

          --SELECT Distinct Formid FROM   @Registration
          --Custom Grid
          DECLARE @RegObjectData TABLE
            (id          INT IDENTITY(1, 1)
             ,Objectid   INT
             ,udf        NVARCHAR(MAX)
             ,gridtypeid INT)
          DECLARE @max         INT
                  ,@min        INT=1
                  ,@Objectid   INT
                  ,@gridTypeid INT

          INSERT INTO @RegObjectData
                      (Objectid
                       ,udf
                       ,gridtypeid)
          SELECT rod.Objectid
                 ,UDF
                 ,gto.GridTypeID
          FROM   [org].[RegObjectData] rod
                 LEFT JOIN [dbo].[GridTypeObject] gto
                        ON gto.ObjectID = rod.ObjectID
          WHERE  ID = @RegID

          SELECT @max = MAX(id)
          FROM   @RegObjectData

          WHILE @max >= @min
            BEGIN
                SELECT @XmlDocument = UDF
                       ,@Objectid = Objectid
                       ,@gridtypeid = gridtypeid
                FROM   @RegObjectData
                WHERE  id = @min

                EXEC Sp_xml_preparedocument
                  @DocHandle OUTPUT
                  ,@XmlDocument

                INSERT @eval
                       (UDfieldiD
                        ,DataValue
                        ,RowNum
                        ,gridtypeid)
                SELECT FieldID
                       ,DataValue
                       ,RowNum
                       ,@gridtypeid
                FROM   OPENXML (@DocHandle, '//Field', 11)
                          WITH (FieldID    VARCHAR(20)
                                ,DataValue VARCHAR(MAX)
                                ,RowNum    VARCHAR(20) ) --02/10/2016

                EXEC Sp_xml_removedocument
                  @DocHandle

                SET @min +=1
            END

          --Custom Grid With FileUpad
          --DECLARE @Upload TABLE
          --  ( UploadID    INT
          --   ,[ObjectID] [INT] NOT NULL
          --   ,[ID]       [INT] NULL
          --   ,[RowNum]   [INT] NULL)
          -- ,[SessionID]  [VARCHAR](50) NULL
          --  ,[UploadName] [VARCHAR](200) NULL
          --,[UDF]        [NVARCHAR](max) NULL)
          --INSERT INTO @Upload
          --SELECT UploadID
          --       , ObjectiD
          --       , ID
          --       , RowNum
          ----   , SessionID
          ---- , UploadName
          ---- , UDF
          --FROM   org.Upload
          --WHERE  ID = @RegID AND isActive = 1
          --Upload Change 5/28
          --Select * from @Upload
          --	  Select udf.UDFieldId,u.UploadID,u.RowNum,gto.GridTypeID
          --From @Upload u 
          --inner join dbo.GridTypeObject gto on gto.ObjectID = u.ObjectID
          --Inner Join org.UDfield udf on u.ObjectID  = udf.ObjectID
          --where udf.MaptoColumn = 'UploadID'
          --insert into @eval
          --(UDfieldid ,DataValue,RowNum,GridTypeID)
          --Select udf.UDFieldId,u.UploadID,u.RowNum,gto.GridTypeID
          --From @Upload u 
          --inner join dbo.GridTypeObject gto on gto.ObjectID = u.ObjectID
          --Inner Join org.UDfield udf on u.ObjectID  = udf.ObjectID
          --where udf.MaptoColumn = 'UploadID'
          --Upload Change 5/28
          --INSERT INTO @eval
          --            (UDfieldid,DataValue,RowNum,GridTypeID)
          --SELECT txml.c.value('@FieldID', 'int')              AS UDFieldID
          --       , txml.c.value('@DataValue', 'varchar(max)') AS Datavalue
          --       , U.RowNum
          --       , u.GridTypeID
          --FROM   (SELECT UploadID
          --               , Cast (UDF AS XML) udf
          --               , u.rownum
          --               , gto.GridTypeID
          --        FROM   @Upload U
          --               INNER JOIN dbo.GridTypeObject gto
          --                       ON gto.ObjectID = u.ObjectID
          --        WHERE  ID = @RegID) U
          --       CROSS apply u.udf.nodes('CustomField/Field') AS txml(c)
          --            Select distinct uf.UDfieldID,UploadName,RowNum,uf.GridTypeID
          --from @Upload up
          --inner join org.UDField uf on uf.ObjectID = Up.ObjectiD and uf.FieldType = 'FileUpload'
          --     INSERT INTO @eval
          --                 (UDfieldid,DataValue,RowNum,GridTypeID)
          --            Select distinct uf.UDfieldID,UploadName,RowNum,uf.GridTypeID
          --from @Upload up
          --inner join org.UDField uf on uf.ObjectID = Up.ObjectiD and uf.FieldType = 'FileUpload'
          --select * from @Upload
          --         Select distinct uf.UDfieldID,UploadID,RowNum,uf.GridTypeID
          --from @Upload up
          --inner join org.UDField uf on uf.ObjectID = Up.ObjectiD and uf.FieldType = 'UploadID'
          --     INSERT INTO @eval
          --                 (UDfieldid,DataValue,RowNum,GridTypeID)
          --            Select distinct uf.UDfieldID,UploadID,RowNum,uf.GridTypeID
          --from @Upload up
          --inner join org.UDField uf on uf.ObjectID = Up.ObjectiD and uf.FieldType = 'UploadID'

		  
		  --09/03/2021
		  ; with _cEval ( udfieldid, maptotable, MaptoColumn, GridTypeID, rownum )
		  as
		  ( select udf.udfieldid, udf.maptotable, udf.MaptoColumn, udf.GridTypeID, row_number() over (partition by udf.maptotable, udf.MaptoColumn order by udf.udfieldid )
		  from @eval e
		  join org.udfield udf on udf.udfieldid = e.UDFieldID 
		  where coalesce(e.maptotable, '') <> coalesce(udf.maptotable, '') 
		  or coalesce(e.maptocolumn, '') <> coalesce(udf.maptocolumn, '') 
		  )

		  update e 
		  set maptotable = ce.maptotable
			  , maptocolumn = ce.MaptoColumn
			  , GridTypeID = ce.GridTypeID
			  , Rownum = ce.rownum
		  from @eval e
		  join _cEval ce on ce.udfieldid = e.UDFieldID  and ce.rownum = e.Rownum

		  	--09/29/2021
			--update e
			--set Rownum = e2.Rownum
			--from @eval e
			--join @eval e2 on e2.maptotable = e.maptotable 
			--		and e.MaptoColumn = 'UDF'
			--		and e2.MaptoColumn = 'ProductID'
			--		and e2.Datavalue = e.ProductID 
			--where e.maptotable = 'RegistrationProduct' 

          SELECT UDFieldID, MaptoTable, MaptoColumn, Datavalue, Rownum, GridTypeID
          FROM   @eval
          WHERE  UDfieldiD IS NOT NULL


      END TRY

      BEGIN CATCH ;
          Throw
      END CATCH
  END

