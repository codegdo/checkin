USE [PartnerPortal]
GO
/****** Object:  StoredProcedure [dbo].[usp_GetLookUpValue]    Script Date: 2/26/2022 4:10:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO


--Exec [dbo].[usp_GetLookUpValue]  'Coop','programStatus','StatusName','ProgramStatusID',4470,2737,66,1,'367',147,ProgramStatusID,36,1,NULL,NULL,13831
ALTER PROCEDURE [dbo].[usp_GetLookUpValue] (@LookUpSchema         VARCHAR(20)
                                            ,@LookUpTable         VARCHAR(100)
                                            ,@LookUpColumn        VARCHAR(50)
                                            ,@LookUpIDColumn      VARCHAR(50)

                                            ,@orgID               INT
                                            ,@UserID              INT = NULL
                                            ,@UDFormID            INT = NULL
                                            ,@ProgramID           INT = NULL
                                            
                                            ,@isDependent         BIT = NULL
                                            ,@value               VARCHAR(500) = NULL
                                            
                                            ,@filterField         VARCHAR(200)=NULL
                                            ,@ApprovalHierarhcyID INT = NULL
                                            ,@UserHasRights       INT = NULL
                                            ,@RegID               INT =NULL
                                            ,@PriorApprovalID INT = NULL
                                            ,@ClaimID INT = NULL)
WITH EXECUTE AS owner
AS
/****************************************************************                  
Author:  CMR DBA                    
  Date:  11/09/2013
Purpose: Process all the look queries     
---------------------------------------------------------------      
CHANGE LOG              
Date           Author           Description              
---------------------------------------------------------------              
11/09/2013  CMR DBA		Created   
10/01/2014  cmrSunil	Added check for the DrProgramStatus to exclude draft status
06/01/2015  cmrSunil	Added Stand Alone Claim formtype for coop status filter	
08/24/2015  cmrSunil    766 Hide id's 	
10/26/2015  cmrSunil    Deal reg changes for closed won and closed loss
11/23/2015	cmrThanh	Added 'status' object to list.  
12/30/2015	cmrSunil    added isActive check for dropodown on dealreg form
05/12/2016	cmrMegha	Modified Company query to Get Companies for Internal users with no program constraint
05/12/2016	cmrThanh	Added ProgramID filter for Claim object data retrieval
06/14/2016	cmrmegha	modified whole piece of query to fetch Distributors based on their mapping to reseller
07/14/2016	cmrSunil    Activity Name for coop 
08/09/2016	cmrSUnil    to get approval level for new request for internal user status dropdown
09/20/2017	cmrAlex		Reworked approval claim/pa approval hierarchy section
04/10/2018	cmrThanh	Added filter to prevent returning Distributor name into Reseller CompanyID lookup column (PRINT'8')
06/06/2018	cmrAlex		Fixed issue with disti list showing in reseller lookup
11/11/2019	cmrThanh	Added logic for RebateSpiff objects
11/20/2019	cmrThanh	Added TradeIn lookup logic
04-16-2020	cmrArturo	Added AccountNumber lookup from org.company table 
09/10/2020	cmrKenny	Added logic to not return the program status if IsDefaultEmailNotification flag is true
08-19-2021  cmrArturo   Added logic to return currency code from dbo.currency table
09/14/2021	cmrThanh	Added lookup for Org.Contact info 
09/23/2021	cmrThanh	Returned Org.Contact info only when contact is a system user
09/24/2021	cmrDaniel	Filtered Company by FormID
10/20/2021	cmrThanh	Returned Reseller Company from available POS transactions for a given Distributor
12/17/2021	cmrKenny	added isDraft = 0 so the Draft status is not returned to the drop down	
01/06/2021  cmrArturo   added nullif check for @Value in Contact lookup section
****************************************************************/

  BEGIN
      SET NOCount ON

      BEGIN TRY

/*
  declare
  @LookUpSchema         VARCHAR(20)
                                                ,@LookUpTable         VARCHAR(100)
                                                ,@LookUpColumn        VARCHAR(50)
                                                ,@LookUpIDColumn      VARCHAR(50)
                                                ,@UserID              INT = NULL
                                                ,@UDFormID            INT = NULL
                                                ,@ProgramID           INT = NULL
                                                ,@isDependent         BIT = NULL
                                                ,@value               VARCHAR(500) = NULL
                                                ,@orgID               INT
                                                ,@filterField         VARCHAR(200)=NULL
                                                ,@ApprovalHierarhcyID INT = NULL
                                                ,@UserHasRights       INT = NULL
                                                ,@RegID               INT =NULL
												,@PriorApprovalID INT = NULL
												,@ClaimID INT = NULL

select					@LookUpSchema = 'Org' --@LookUpSchema
                              ,@LookUpTable = 'Contact' --@LookUpTable
                              ,@LookUpColumn = 'ContactID' --@LookUpColumn
                              ,@LookUpIDColumn = 'CompanyID' --@LookUpIDColumn
                              ,@UserID = 1632 --@LoginUserID
                              ,@UDFormID = 544 --@UDFormID
                              ,@ProgramID = 1062 --@ProgramID
                              ,@isDependent = 1 --@isDependent
                              ,@Value = '1342' --'3344473' --@Value
                              ,@orgID = 76 --@OrgID
                              ,@FilterField = 'ContactID' --@FilterField


*/

          DECLARE @SELECT           VARCHAR(100) = ' SELECT Distinct '
                  ,@From            VARCHAR(10) = ' From '
                  ,@Where           VARCHAR(1000) = ' Where (OrgID = @OrgID or OrgID is null)'
                  ,@SQL             NVARCHAR(4000)
                  ,@Join            NVARCHAR(max) = '' --06142016 MB inner join to match resellerID and get mapped Distributors
                  -- ,@OrgID        INT
                  ,@isExternal      BIT = 0
                  ,@CompanyID       INT
                  ,@FormTypeID      INT
                  ,@FormTypeName    VARCHAR(20)
                  ,@iscloased       BIT = 0
                  ,@isviewAll       BIT
                  ,@isRenew         BIT
                  ,@isRevision      BIT
                  ,@isClosed        BIT = 0
                  ,@Orderby         NVARCHAR(200) = ' Order by 2 '
                  ,@statusToDisplay INT = NULL
				  ,@HasResellerPOSCompany bit = 0 --10/20/2021

        DECLARE @SecurityRoleTypeName VARCHAR(20)
                ,@PartnerLevel        VARCHAR(2)

		SELECT @SecurityRoleTypeName = srt.SecurityRoleTypeName
                ,@CompanyID = ua.CompanyID
                ,@IsViewAll = sr.IsViewAll
        FROM   Sec.Useraccount ua
                INNER JOIN sec.Securityrole sr
                        ON sr.SecurityRoleId = ua.RoleID
                INNER JOIN sec.Securityroletype srt
                        ON srt.SecurityRoleTypeID = sr.SecurityRoleTypeID
        WHERE  ua.userid = @UserID

		--10/20/2021
		if exists ( select 1 from dr.Program where @ProgramID is not null and programid = @ProgramID and HasResellerPOSCompany = 1)
				set @HasResellerPOSCompany = 1

          IF (  (
               @isDependent = 0
               AND @value IS NULL
              )
              OR
             (
               @isDependent = 1
               AND
               (
                 @value IS NOT NULL
                  OR @LookUpColumn = 'CountryName'
                  OR
                 (
                   @Lookupschema = 'coop' AND @lookuptable = 'ProgramStatus'
                  )
				  OR  ( @LookUpSchema = 'Reb'	and @LookUpTable    = 'ProgramAccount' ) --11/14/2019
                )
              )
             )
            BEGIN

                IF ( @LookUpTable = 'Territory'
                     AND @LookUpColumn = 'CountryName' )
                  BEGIN
                      SET @where =''
                      SET @SQL = ' Select  DDValue , DDText from (  Select Distinct '
                                 + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText '
                                 + ' , Case when Country3 = ''USA'' then 0
							                                       ELSE 1 end c'
                                 --+ @From+ + @LookUpSchema + '.' + @LookUpTable + @where
                                 + @From
                                 + ' org.Uf_getprogramcountry( @ProgramID ) '
                                 + @where + ') a Order by c,2' -- populate the Country names alphabetically. 04202016 Megha Bhagat
                      -- PRINT @sql
                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramID int'
                        ,@ProgramID = @ProgramID
                  END
                ELSE IF ( @LookUpTable = 'Territory'
                     AND @LookUpColumn = 'Provincestatename' )
                  BEGIN
                      SET @where =''-- ' Country3 = ''usa'''
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where

                       print @sql
					   --select '@value', @value
                      IF ( @value IS NOT NULL )
                        BEGIN
						--select 'here'
                            SET @where = ' Where ' + @FilterField + ' = @value'
                            SET @sql = @sql + @where + @Orderby

                            PRINT @sql + @value
                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@value varchar(200)'
                              ,@value = @value
                        END
                      ELSE
                        BEGIN
                            EXECUTE Sp_executesql
                              @SQL
                        END
                  END
                ELSE IF ( @LookUpSchema = 'dr'
                     AND @LookUpTable = 'ProgramCompany' )
                  BEGIN
                      CREATE TABLE #CompanyID
                        (
                           CompanyId INT
                        )--02/16/2015

                      SET @where = ' Where ProgramID = @ProgramID '

                      SELECT @SecurityRoleTypeName = srt.SecurityRoleTypeName
                             ,@CompanyID = ua.CompanyID
                             ,@PartnerLevel = pc.PartnerLevel
                             ,@IsViewAll = sr.IsViewAll
                      FROM   Sec.Useraccount ua
                             INNER JOIN sec.Securityrole sr
                                     ON sr.SecurityRoleId = ua.RoleID
                             INNER JOIN sec.Securityroletype srt
                                     ON srt.SecurityRoleTypeID = sr.SecurityRoleTypeID
                             LEFT JOIN [dr].[Programcompany] pc
                                    ON pc.companyID = ua.CompanyID
                      WHERE  ua.userid = @UserID



                      --02/16/2015
                      IF @IsViewAll = 0
                        BEGIN
                            INSERT INTO #CompanyID
                            SELECT pc.CompanyID
                            FROM   dr.Programcompany pc
                                   INNER JOIN org.company c
                                           ON c.companyid = pc.companyid
                                          AND c.isActive = 1
                                          AND pc.isActive = 1--12/30/2015 added isActive check 
                                   CROSS Apply org.Uf_repassignmentgetcurrentbycompanyid(pc.CompanyID, @OrgiD) rep
                            WHERE  rep.UserID = @UserID
                        END



                      -- PRINT @SecurityRoleTypeName
                      IF @SecurityRoleTypeName = 'Internal'
                        BEGIN
                            IF ( (SELECT Patindex ('%Reseller%', @LookUpIDColumn)) > 0 )
                              SET @Where = @where + ' AND  PartnerLevel = ''R'''

                            IF ( (SELECT Patindex ('%Distributor%', @LookUpIDColumn)) > 0 )
                              SET @Where = @where
                                           + ' AND PartnerLevel in ( ''D'' , ''M'')' -- 06132016 Added Partnerlevel type M for Multiple Distributor
                            IF @isviewAll = 0
                              BEGIN
                                  SET @SQL = @Select + 'c.'
                                             + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                                             + ' as DDValue , c.' + @LookUpColumn
                                             + ' as DDText ' + @From + @LookUpSchema + '.'
                                             + @LookUpTable
                                             + ' pc inner join org.company c on c.companyid = pc.companyid and c.isActive = 1 and pc.isActive = 1 '--12/30/2015 added isActive check 
                                             + '  CROSS Apply org.Uf_repassignmentgetcurrentbycompanyid(pc.CompanyID, @OrgiD) rep '
                                             + @Where + ' and rep.userid = @Userid '
                                             + @Orderby

                                  PRINT @sql

                                  EXECUTE Sp_executesql
                                    @SQL
                                    ,N'@ProgramID int,@OrgId int, @UserID int'
                                    ,@ProgramID = @ProgramID
                                    ,@OrgId = @OrgId
                                    ,@UserID = @UserId
                              END
                            ELSE
                              BEGIN
                                  SET @SQL = @Select + 'c.'
                                             + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                                             + ' as DDValue , c.' + @LookUpColumn
                                             + ' as DDText ' + @From + @LookUpSchema + '.'
                                             + @LookUpTable
                                             + ' pc inner join org.company c on c.companyid = pc.companyid  and c.isActive = 1 and pc.isActive = 1 '--12/30/2015 added isActive check 
                                             + @Where + @Orderby

                                  PRINT @sql

                                  EXECUTE Sp_executesql
                                    @SQL
                                    ,N'@ProgramID int'
                                    ,@ProgramID = @ProgramID
                              END
                        END

                      IF @SecurityRoleTypeName = 'External'
                        BEGIN
                            --print '1'
                            IF ( @PartnerLevel = 'R'
                                 AND (SELECT Patindex ('%Reseller%', @LookUpIDColumn)) > 0 )
                              BEGIN
                                  SET @Where = @Where + ' AND pc.CompanyID = @CompanyID '
                                  SET @SQL = @Select + 'c.'
                                             + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                                             + ' as DDValue , c.' + @LookUpColumn
                                             + ' as DDText ' + @From + @LookUpSchema + '.'
                                             + @LookUpTable
                                             + ' pc inner join org.company c on c.companyid = pc.companyid and c.isActive = 1 and pc.isActive = 1 '--12/30/2015 added isActive check 
                                             + @Where + @Orderby

                                  --print '2'+ 'companyid :' + cast (@CompanyID as  varchar(20)) + @sql
                                  EXECUTE Sp_executesql
                                    @SQL
                                    ,N'@ProgramID int, @CompanyID int'
                                    ,@ProgramID = @ProgramID
                                    ,@CompanyID = @CompanyID
                              END
                            ELSE IF ( @PartnerLevel IN ( 'D', 'M' )
                                 AND (SELECT Patindex ('%Distributor%', @LookUpIDColumn)) > 0 ) -- 06132016 Added Partnerlevel type M for Multiple Distributor
                              BEGIN
                                  SET @Where = @Where + ' AND pc.CompanyID = @CompanyID '
                                  SET @SQL = @Select + 'c.'
                                             + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                                             + ' as DDValue , c.' + @LookUpColumn
                                             + ' as DDText ' + @From + @LookUpSchema + '.'
                                             + @LookUpTable
                                             + ' pc inner join org.company c on c.companyid = pc.companyid and c.isActive = 1 and pc.isActive = 1 '--12/30/2015 added isActive check 
                                             + @Where + @Orderby

                                  print 'D'
                                  PRINT @SQL

                                  EXECUTE Sp_executesql
                                    @SQL
                                    ,N'@ProgramID int, @CompanyID int'
                                    ,@ProgramID = @ProgramID
                                    ,@CompanyID = @CompanyID
                              END
                            ELSE
                              BEGIN
                                  IF ( (SELECT Patindex ('%Reseller%', @LookUpIDColumn)) > 0 )
                                    SET @Where = @where + ' AND  PartnerLevel = ''R'''

                                  IF ( (SELECT Patindex ('%Distributor%', @LookUpIDColumn)) > 0 )
                                    SET @Where = @where
                                                 + ' AND PartnerLevel in ( ''D'' , ''M'')' -- 06132016 Added Partnerlevel type M for Multiple Distributor
                                  print 'D or M'
                              
                                  ---06142016 MB
                                  ------Added this piece to check for mapped distributor
                                  -----If Reseller is mapped to Distributor then populate dropdown with limited values
                                  -----If not then populate dropdown with all distis in Program
                                  ----Populate form Disti section with the Distributor name the deal was created 
                                  IF EXISTS(SELECT 1
                                            FROM   dealreg.org.registration reg
                                            WHERE  reg.resellerid = @CompanyID
                                                   AND reg.RegID = @RegID)
                                    BEGIN
                                        SET @where = ' where reg.regid = @Regid '
                                        SET @SQL = @Select + 'c.'
                                                   + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                                                   + ' as DDValue , c.' + @LookUpColumn
                                                   + ' as DDText '
                                                   + ' from dealreg.org.registration reg '
                                                   + ' inner join org.company c on c.companyid = reg.distributorid'
                                                   + @where + @Orderby

                                        Print 'After D and M'
                                        PRINT @SQL

                                        PRINT'6'

                                        EXECUTE Sp_executesql
                                          @SQL
                                          ,N'@ProgramID int, @RegID int'
                                          ,@ProgramID = @ProgramID
                                          ,@RegID = @RegID
                                    END
                                  ELSE IF EXISTS(SELECT 1
                                            FROM   dealreg.org.DistiMappedToReseller dmtr
                                            WHERE  dmtr.resellerid = @CompanyID
                                                   AND dmtr.IsActive = 1)
                                    BEGIN
                                        SET @Join = ' inner join dealreg.org.DistiMappedToReseller dmtr 
																		on dmtr.distributorid  = pc.companyid
																		AND dmtr.ResellerID = @CompanyID
																		AND dmtr.isactive = 1'
                                        SET @where = ' Where pc.ProgramID = @ProgramID AND PartnerLevel in ( ''D'' , ''M'')'
                                        SET @SQL = @Select + 'c.'
                                                   + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                                                   + ' as DDValue , c.' + @LookUpColumn
                                                   + ' as DDText ' + @From + @LookUpSchema + '.'
                                                   + @LookUpTable
                                                   + ' pc inner join org.company c on c.companyid = pc.companyid'
                                                   + @Join + @where + @Orderby

                                        PRINT '7'

                                        PRINT @sql

                                        EXECUTE Sp_executesql
                                          @SQL
                                          ,N'@ProgramID int, @CompanyID int, @Join nvarchar(max)'
                                          ,@ProgramID = @ProgramID
                                          ,@CompanyID = @CompanyID
                                          ,@Join = @Join
                                    END
                                  ELSE
                                    BEGIN
									--removed 6/6/2018
                                        --IF (NOT EXISTS(SELECT 1
                                        --              FROM   dealreg.org.DistiMappedToReseller dmtr
                                        --              WHERE  dmtr.resellerid = @CompanyID) and @PartnerLevel = 'R')
                                        --  SET @where = ' Where ProgramID = @ProgramID  AND PartnerLevel = ''D'' ' --@Where

                                        SET @SQL = @Select + 'c.'
                                                   + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                                                   + ' as DDValue , c.' + @LookUpColumn
                                                   + ' as DDText ' + @From + @LookUpSchema + '.'
                                                   + @LookUpTable
                                                   + ' pc inner join org.company c on c.companyid = pc.companyid and c.isActive = 1 and pc.isActive = 1 '
                                                   + @Where + @Orderby

                                        PRINT @SQL

                                        PRINT'8'

                                        EXECUTE Sp_executesql
                                          @SQL
                                          ,N'@ProgramID int, @CompanyID int'
                                          ,@ProgramID = @ProgramID
                                          ,@CompanyID = @CompanyID
                                    END
                              /* END of the mapped Distributor reseller Section */
                              -----------------------------------------------------------------------------------------------------------------------------------------------------------------
                              ------------------------------------------------------------------------------------------------------------------------------------------------------------------
                              --SET @SQL = @Select + 'c.'
                              --                       + Replace(Replace(@LookUpIDColumn, 'Reseller', ''), 'Distributor', '')
                              --                       + ' as DDValue , c.' + @LookUpColumn + ' as DDText ' + @From
                              --                       + @LookUpSchema + '.' + @LookUpTable
                              --                       + ' pc inner join org.company c on c.companyid = pc.companyid'
                              --                       + @Where + @Orderby
                              --            --PRINT @ProgramID
                              --            EXECUTE Sp_executesql
                              --              @SQL
                              --              ,N'@ProgramID int'
                              --              ,@ProgramID = @ProgramID
                              END
                        END
                  END
                ELSE IF ( @LookUpSchema = 'Coop'
                     AND @LookUpTable = 'ProgramStatus' )
                  BEGIN
                      IF @value IS NOT NULL
                        SELECT @iscloased = isclosed
                        FROM   coop.Programstatus
                        WHERE  ProgramStatusID = @value

                      SET @where = ' Where ' + @LookUpSchema + '.' + @LookUpTable + '.'
                                   + 'ProgramID = @ProgramID '

                      SELECT @FormTypeName = ft.FormTypeName
                      FROM   Org.Udform f
                             INNER JOIN dbo.Formtype ft
                                     ON ft.FormTypeID = f.FormTypeID
                      WHERE  UDFormid = @UDFormID

                      IF ( @FormTypeName = 'Prior Approval' )
                        BEGIN
                            SET @where = @Where + ' and isForPA = 1 and isclosed = '
                                         + Cast (@iscloased AS VARCHAR)

                            --08/09/2016 
                            DECLARE @ObjectID INT

                            SELECT @ObjectID = ObjectID
                            FROM   Object
                            WHERE  Objectname = 'Prior Approval Requests'
                        END

                      IF ( @FormTypeName = 'Claim'
                            OR @FormTypeName = 'StandAlone Claim' )
                        BEGIN
                            SET @where = @Where
                                         + ' and isForClaim = 1 and isclosed = '
                                         + Cast(@iscloased AS VARCHAR)

                            --08/09/2016
                            SELECT @ObjectID = ObjectID
                            FROM   Object
                            WHERE  Objectname = 'Claim Requests'
                        END

                      IF( @ApprovalHierarhcyID IS NOT NULL )
                        BEGIN
                            SELECT @statusToDisplay = ProgramStatusID
                            FROM   org.ApprovalHierarchy
                            WHERE  ApprovalHierarchyID = @ApprovalHierarhcyID

                            --SET @where += ' AND ((' + @LookupSchema + '.' + @LookupTable
                            --              + '.ProgramStatusID = @statusToDisplay AND @UserHasRights = 1) Or IsApproved = 0)'
                        END

                      IF( EXISTS (SELECT 1
                                  FROM   partnerportal.org.approvalhierarchy
                                  WHERE  programid = @programid) )
                        BEGIN
                            DECLARE @ApprovalHierarchyID INT
                                    ,@Output             XML
									,@NextStep INT
									,@CurrentStep INT
							
							IF @PriorApprovalID IS NOT NULL
							SELECT @NextStep = pa.NextApprovalLevelID
							,@CurrentStep = ah.ApprovalHierarchyID
							FROM coop.PriorApproval pa
							LEFT JOIN PartnerPortal.Org.ApprovalHierarchy ah
							ON pa.PAStatusID = ah.ProgramStatusID
							AND ah.ObjectID = @ObjectID
							WHERE PriorApprovalID = @PriorApprovalID

							IF @ClaimID IS NOT NULL
							SELECT @NextStep = c.NextApprovalLevelID
							,@CurrentStep = ah.ApprovalHierarchyID
							FROM coop.Claim c
							LEFT JOIN PartnerPortal.Org.ApprovalHierarchy ah
							ON c.ClaimStatusID = ah.ProgramStatusID
							AND ah.ObjectID = @ObjectID
							WHERE ClaimID = @ClaimID

                            IF Object_id('tempdb..#HierarchySteps') IS NOT NULL
                              DROP TABLE #HierarchySteps

                            CREATE TABLE #HierarchySteps
                              (
                                 ApprovalHierarchyID INT
                              )

                            INSERT INTO #HierarchySteps
                            SELECT ApprovalHierarchyID
                            FROM   PartnerPortal.Org.ApprovalHierarchy ah
                                   INNER JOIN MarketingProgram.Org.ProgramStatus ps
                                           ON ah.ProgramStatusID = ps.ProgramStatusID
                            WHERE  ah.Programid = @ProgramID
                                   AND ps.IsApproved = 1

                            IF Object_id('tempdb..#UserRights') IS NOT NULL
                              DROP TABLE #UserRights

                            CREATE TABLE #UserRights
                              (
                                 UserID               INT
                                 ,ApprovalHierarchyID INT
                              )

                            WHILE EXISTS(SELECT 1
                                         FROM   #HierarchySteps)
                              BEGIN
                                  SELECT TOP 1 @ApprovalHierarchyID = ApprovalHierarchyID
                                  FROM   #HierarchySteps

                                  EXEC marketingprogram.[Org].[Usp_getusersforapprovalprogram]
                                    @ProgramID = @ProgramId
                                    ,@ObjectID = @ObjectID
                                    ,@NextApprovalLevel = @ApprovalHierarchyID
                                    ,@Output = @OUTPUT output

                                  INSERT INTO #UserRights
                                              (UserID,ApprovalHierarchyID)
                                  SELECT Record.Col.value('@TextKey', 'NVARCHAR(max)')
                                         ,@ApprovalHierarchyID
                                  FROM   @OUTPUT.nodes('DATA/Users') AS Record(Col)

                                  DELETE FROM #HierarchySteps
                                  WHERE  ApprovalHierarchyID = @ApprovalHierarchyID
                              END


                            SET @Join += 'LEFT JOIN PartnerPortal.Org.ApprovalHierarchy ah
								  ON ' + @LookUpSchema + '.'
                                         + @LookUpTable + '.ProgramStatusID = ah.ProgramStatusID
								  AND ah.ProgramID = @ProgramID
								  LEFT JOIN PartnerPortal.Org.ApprovalHierarchy ns
								  ON @NextStep = ns.ApprovalHierarchyID
								  LEFT JOIN #UserRights ur
								  ON ah.ApprovalHierarchyID = ur.ApprovalHierarchyID
								  AND ur.UserID = @UserID'

                            SET @where += ' AND ((ah.ApprovalHierarchyID = @CurrentStep AND ur.UserID IS NOT NULL) OR (ns.ApprovalLevel >= ah.ApprovalLevel and ur.UserID IS NOT NULL) OR isApproved = 0 OR (ur.UserID IS NOT NULL AND (ah.AllowOverride = 1 OR ah.ApprovalHierarchyID = @NextStep)))'
                        END

						--SELECT @SELECT, @LookupSchema, @lookuptable, @Lookupidcolumn, @lookupcolumn, @lookupschema, @Lookuptable, @join, @where, @orderby

                      SET @SQL =  @Select + @LookUpSchema + '.' + @LookUpTable + '.'
                                 + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + ' ' + @Join
                                 + @where + @Orderby

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramID int, @statusToDisplay INT, @UserHasRights INT, @NextStep INT, @CurrentStep INT, @UserID INT'
                        ,@ProgramID = @ProgramID
                        ,@statusToDisplay = @statusToDisplay
                        ,@UserHasRights = @UserHasRights
						,@NextStep = @NextStep
						,@CurrentStep = @CurrentStep
						,@UserID = @UserID
                  END
                ELSE IF ( @LookUpTable = 'ProgramStatus' )
                  BEGIN
                      SET @where = ' Where ProgramID = @ProgramID  AND IsActive = 1 AND IsDefaultEmailNotification = 0 and isDraft = 0' --12/17/2021 added isDraft = 0 so the Draft status is not returned to the drop down

                      IF( @ApprovalHierarhcyID IS NOT NULL )
                        BEGIN
                            SELECT @statusToDisplay = ProgramStatusID
                            FROM   org.ApprovalHierarchy
                            WHERE  ApprovalHierarchyID = @ApprovalHierarhcyID

                            SET @where += ' AND ((ProgramStatusID = @statusToDisplay AND @UserHasRights = 1 ) Or IsApproved = 0)'
                        END

                      IF( @ApprovalHierarhcyID IS NULL
                          AND EXISTS (SELECT 1
                                      FROM   partnerportal.org.approvalhierarchy
                                      WHERE  programid = @programid) )
                        BEGIN
                            SET @where += ' AND isApproved = 0'
                        END

                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + @Orderby

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramID int, @statusToDisplay INT, @UserHasRights INT'
                        ,@ProgramID = @ProgramID
                        ,@statusToDisplay = @statusToDisplay
                        ,@UserHasRights = @UserHasRights
                  END
                ELSE IF ( @LookUpTable = 'SubActivity' )
                  BEGIN
                      SET @where = ' Where ProgramActivityID = @ProgramActivityID '
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + @Orderby

                      -- PRINT @SQL + '::' + Cast(@value AS VARCHAR(20))
                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramActivityID int'
                        ,@ProgramActivityID = @value
                  END
                ELSE IF ( @LookUpTable = 'SecurityRole' )
                  BEGIN
                      SET @SQL = @Select + @LookUpIDColumn
                                 + ' as DDValue , Coalesce(' + @LookUpColumn
                                 + ','''') as DDText ' + @From + @LookUpSchema + '.'
                                 + @LookUpTable + @Where
                                 + ' And securityroletypeid = 2 and isActive=1'
                                 + @Orderby --Need to removed
                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgID int'
                        ,@OrgID = @OrgID
                  END
                ELSE IF ( @LookUpTable = 'Claim'
                     AND @LookUpColumn = 'CLNumber'
                     AND @LookUpIDColumn = 'ClaimID' ) --08/24/2015 --changes claimid to claimnumber
                  BEGIN
                      PRINT 'adasdsadsaaadda'

                      --SET @where = ' Where c.Orgid = @Orgid '
                      SET @SQL = @Select + + @LookUpIDColumn
                                 + ' as DDValue , Coalesce( Cast ( '
                                 + @LookUpColumn
                                 + '  as varchar(20)),'''') + '' - '' + Coalesce(ClaimDescription,'''')  + '' - '' + Cast (coalesce(Cast (c.claimAmount as decimal(10,2)),0.00) as varchar(20)) as DDText '
                                 + @From + @LookUpSchema + '.' + @LookUpTable + ' c '

                      --PRINT @sql
                      IF ( @value IS NOT NULL )
                        BEGIN
                            SET @where = 'inner join coop.programstatus ps on ps.programid = c.programid and ps.programStatusid = c.claimstatusid and (ps.isApproved = 1) '
                                         + @where + ' and c.programid = @ProgramID ' --05/12/2016 added programid filter
                            SET @sql = @sql + @where + ' AND ' + @FilterField + ' = @value'
                                       + @Orderby

                            --PRINT @SQL
                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@OrgID int,@ProgramID int,@Value varchar(200)'
                              ,@OrgID = @OrgID
                              ,@ProgramID = @ProgramID
                              ,@value = @value
                        END
                      ELSE
                        BEGIN
                            SET @SQL = @sql + @where + @Orderby

                            --PRINT @SQL
                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@OrgID int'
                              ,@OrgID = @OrgID
                        END
                  --PRINT @Sql;
                  END
                ELSE IF ( @LookUpTable = 'PaymentType' )
                  BEGIN
                      SET @SQL = @Select + @LookUpIDColumn
                                 + ' as DDValue , Coalesce(' + @LookUpColumn
                                 + ','''') as DDText ' + @From + @LookUpSchema + '.'
                                 + @LookUpTable + @Orderby

                      PRINT @sql

                      EXECUTE Sp_executesql
                        @SQL
                  END
                ELSE IF ( @LookUpSchema = 'Coop'
                     AND @LookUpTable = 'FundType' )
                  BEGIN
                      SET @where = ' where ProgramID = @ProgramID'
                      SET @SQL = @Select + @LookUpIDColumn
                                 + ' as DDValue , Coalesce(' + @LookUpColumn
                                 + ','''') as DDText ' + @From + @LookUpSchema + '.'
                                 + @LookUpTable + @Where + @Orderby

                      -- PRINT @sql +Cast(@ProgramID AS VARCHAR)
                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramID Int'
                        ,@ProgramID = @ProgramID
                  END
                ELSE IF ( @LookUpTable = 'Claim'
                     AND @LookUpColumn = 'ClaimAmount' )
                  BEGIN
                      SET @where =''
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where

                      IF ( @value IS NOT NULL )
                        BEGIN
                            SET @where = ' Where ' + @FilterField + ' = @value'
                            SET @sql = @sql + @where + @Orderby

                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@value varchar(200)'
                              ,@value = @value
                        END
                      ELSE
                        BEGIN
                            SET @SQL = @SQL + @OrderBy

                            EXECUTE Sp_executesql
                              @SQL
                        END
                  END
                ELSE IF ( @lookUpSchema = 'Dr'
                     AND @LookUpTable = 'ProgramStatus'
                     AND @LookUpColumn = 'StatusName' )
                  BEGIN
                      /*
                      DECLARE @AssignmentBasis VARCHAR(50),@ApprovalId INT
                      SELECT @AssignmentBasis = AssignmentBasis
                      FROM   dealreg.org.Programapprovalhierarchy
                      WHERE  programID = @ProgramID
                      
                      print @AssignmentBasis +'::@AssignmentBasis'
                      IF @AssignmentBasis = 'SecurityRoleID'
                        BEGIN
                        print @ApprovalID
                      	  SELECT Top 1 @ApprovalId = pah.ApprovalID
                      	  FROM   sec.Useraccount ua
                      			 INNER JOIN dealreg.org.Programapprovalhierarchy pah
                      					 ON pah.AssignmentValue = ua.RoleID
                      	  WHERE  userid = @Userid
                        END
                        print 'fetching actions' + cast(@ApprovalID as varchar(10))
                      SELECT pa.Actionid as DDValue,pa.Actionname as DDtext
                      from dealreg.org.ProgramAction pa
                      INNER JOIN DealReg.org.ActionApprovalHierarchy aah ON aah.Actionid = pa.Actionid
                      WHERE aah.ApprovalID = @ApprovalId
                      UNION
                      Select ProgramStatusID  as DDValue ,StatusName as DDText
                      from dr.ProgramStatus
                      where ProgramStatusID = @value
                      
                      
                      
                      */
                      IF @Value IS NOT NULL
                        SELECT @isRenew = IsRenew
                               ,@isRevision = IsRevision
                               ,@isClosed = IsClosed --10/27/2015
                        FROM   dr.Programstatus
                        WHERE  ProgramStatusID = @value

                      PRINT @value

                      SET @where = ' Where ProgramID = @ProgramID  and isRenew = '
                                   + Cast(@isRenew AS VARCHAR)
                                   + ' and isRevision = '
                                   + Cast(@isRevision AS VARCHAR)
                                   + ' and isClosed = '
                                   + Cast(@isClosed AS VARCHAR)
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + ' and (isSubmitted = 1 or isApproved = 1 or isDenied = 1 or isClosed = 1 or isExpired = 1 or isReview = 1 or isPending = 1 or isDraft = 1) '--10/01/2014 Added to exculde draft status --1/10/2015 added isreview and isPending status flag
                                 + ' and isActive = 1 and (ProgramStatusID in (Select  ProgramStatusid  from dr.[uf_getUserProgramStatus] (@userid,@programID) where isAssignment = 1) '--1/8/2015
                                 + ' or ProgramStatusID = @Value)'--1/8/2015
                                 + @Orderby

                      PRINT @sql

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramID int,@Userid int,@Value int'
                        ,@ProgramID = @ProgramID
                        ,@Userid = @Userid --1/8/2015
                        ,@value = @value --1/9/2015
                  END
                ELSE IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'Company'
                     AND @LookUpColumn = 'CompanyName'
					 and @HasResellerPOSCompany = 0 --10/20/2021
					  )
                  BEGIN
                      SELECT top 100 --12/10/2019 -----------------------
						@isExternal = CASE
                                             WHEN srt.SecurityRoleTypeName = 'External' THEN 1
                                             ELSE 0
                                           END
                             ,@CompanyID = ua.CompanyID
                             ,@IsViewAll = sr.IsViewAll
                      FROM   Sec.Useraccount ua
                             INNER JOIN sec.Securityrole sr
                                     ON sr.SecurityRoleId = ua.RoleID
                             INNER JOIN sec.Securityroletype srt
                                     ON srt.SecurityRoleTypeID = sr.SecurityRoleTypeID
                      WHERE  ua.userid = @UserID

                      IF @isExternal = 1
                        BEGIN
                            SET @Where = @Where + ' AND CompanyID = @CompanyID '
                            SET @SQL = @Select + @LookUpIDColumn
                                       + ' as DDValue , Coalesce(' + @LookUpColumn
                                       + ','''') as DDText ' + @From + @LookUpSchema + '.'
                                       + @LookUpTable + @Where

                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@OrgID int, @CompanyID int'
                              ,@OrgID = @OrgID
                              ,@CompanyID = @CompanyID
                        END
                      ELSE
                        BEGIN
                            SET @Where = ' wHERE oRGID = @oRGID and c.isActive = 1 and (@isViewall = 1 or Exists (Select 1 from org.Uf_getpartnerlistforuser(@UserID) where CompanyID = c.companyid))' --05122016 Get Companies for Internal users with no program constraint
                            --(Select 1 from org.Uf_getprogrampartnerlistforuser(@UserID, @ProgramID) where CompanyID = c.companyid))
                            SET @SQL = @Select + @LookUpIDColumn
                                       + ' as DDValue , Coalesce(' + @LookUpColumn
                                       + ','''') as DDText ' + @From + @LookUpSchema + '.'
									   + @LookUpTable + ' c ' + @where + @Orderby
                                       --+ @LookUpTable + ' c join org.contact ct on ct.companyid = c.companyid' + @where + @Orderby --10/23/2019 to fix timeout issue
									  

							--select @SQL = replace(@SQL, 'Distinct CompanyID', 'Distinct c.CompanyID') --10/23/2019 to fix timeout issue
                             PRINT @sql
                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@OrgID int,@isViewall bit,@UserID int,@ProgramID int'
                              ,@OrgID = @OrgID
                              ,@isviewAll = @isviewAll
                              ,@UserID = @UserID
                              ,@ProgramID =@ProgramID
                        END
                  END

				-- 10/20/2021
				ELSE IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'Company'
                     AND @LookUpColumn = 'CompanyName'
					 and @HasResellerPOSCompany = 1
					  )
                  BEGIN
                      SELECT @isExternal = CASE
                                             WHEN srt.SecurityRoleTypeName = 'External' THEN 1
                                             ELSE 0
                                           END
                             ,@CompanyID = ua.CompanyID
                             ,@IsViewAll = sr.IsViewAll
                      FROM   Sec.Useraccount ua
                             INNER JOIN sec.Securityrole sr
                                     ON sr.SecurityRoleId = ua.RoleID
                             INNER JOIN sec.Securityroletype srt
                                     ON srt.SecurityRoleTypeID = sr.SecurityRoleTypeID
                      WHERE  ua.userid = @UserID

					  DECLARE @PADistyCompanyId int
							  ,@CompanyIdToUse int
							  ,@OUTPUTVAL int
					  IF @IsExternal = 1
							SET @CompanyIdToUse = @CompanyId
					  ELSE
							SET @CompanyIdToUse = @value
                      IF @isExternal = 1
                        BEGIN
							EXEC org.Usp_GetPOSDistributorCompanyId @CompanyIdToUse, @OrgId, @OUTPUTVAL OUTPUT
							SET @PADistyCompanyId = (SELECT @OUTPUTVAL)
								--SET @Where = @Where + ' AND CompanyID = @CompanyID '
								SET @Where = ' where c.orgid = @orgid and c.isActive = 1 and pos.distcompanyid =  @companyid' 
								--SET @SQL = @Select + 'cr.' + @LookUpIDColumn
								--		   + ' as DDValue , Coalesce(' + 'cr.' + @LookUpColumn
								--		   + ','''') as DDText ' + @From + @LookUpSchema + '.'
								--		  -- + @LookUpTable + @Where
								--		   + @LookUpTable + ' c ' 
								--		   + '  join snd.ChannelPOS pos on pos.distcompanyid = c.companyid join org.company cr on cr.companyid = pos.resellercompanyid ' --AQ
								--		   + @Where 
								--		   + @Orderby 
								SET @SQL = @Select + ' c.CompanyId'
										   + ' as DDValue , Coalesce(c.CompanyName'
										   + ','''') as DDText ' 
										   + @From 
										    + ' snd.ChannelPOS pos join org.company c on c.companyid = pos.resellercompanyid '
										   + @Where 
										   + @Orderby

								print @SQL
								EXECUTE Sp_executesql
								  @SQL
								  ,N'@OrgID int, @CompanyID int'
								  ,@OrgID = @OrgID
								 -- ,@CompanyID = @CompanyID 
								 ,@CompanyID = @PADistyCompanyId
                        END
                      ELSE
                        BEGIN
							EXEC @PADistyCompanyId = org.Usp_GetPOSDistributorCompanyId @CompanyIdToUse, @OrgId, @OUTPUTVAL
								SET @PADistyCompanyId = (SELECT @OUTPUTVAL)

								--SET @Where = ' where c.orgid = @orgid and c.isActive = 1 and c.companyid = ' + CAST(COALESCE(@PADistyCompanyId,0) AS NVARCHAR(20)) +
								--			--' and (@isViewall = 1 or Exists (Select 1 from org.Uf_getpartnerlistforuser(@UserID) where CompanyID = c.companyid))' --Orig
								--			  + ' and (@isViewall = 1 or Exists (Select 1 from org.Uf_getpartnerlistforuser(@UserID) where CompanyID =' + CAST(COALESCE(@PADistyCompanyId,0) AS NVARCHAR(20)) + '))' 
								--	PRINT @Where
								--SET @SQL = @Select + ' cr.' + @LookUpIDColumn
								--		   + ' as DDValue , Coalesce(cr.' + @LookUpColumn
								--		   + ','''') as DDText ' 
								--		   + @From + @LookUpSchema + '.'
								--		   + @LookUpTable + ' c ' 
								--		   + '  join snd.ChannelPOS pos on pos.distcompanyid = c.companyid join org.company cr on cr.companyid = pos.resellercompanyid '
								--		   --+ '  join snd.ChannelPOS pos on pos.distcompanyid = ' + @PADistyCompanyId2 +' join org.company cr on cr.companyid = pos.resellercompanyid '
								--		   + @where 
								--		   + @Orderby

								SET @Where = ' where c.orgid = @orgid and c.isActive = 1 and c.companyid = ' + CAST(COALESCE(@PADistyCompanyId,0) AS NVARCHAR(20)) +
											--' and (@isViewall = 1 or Exists (Select 1 from org.Uf_getpartnerlistforuser(@UserID) where CompanyID = c.companyid))' --Orig
											  + ' and (@isViewall = 1 or Exists (Select 1 from org.Uf_getpartnerlistforuser(@UserID) where CompanyID =' + CAST(COALESCE(@PADistyCompanyId,0) AS NVARCHAR(20)) + '))' 
								
								SET @SQL = @Select + ' c.CompanyId' 
										+ ' as DDValue , Coalesce(c.CompanyName' 
										+ ','''') as DDText ' 
										+ @From 
										+ ' snd.ChannelPOS pos join org.company c on c.companyid = pos.resellercompanyid '
										+ @where 
										+ @Orderby
							
								 PRINT @sql
								EXECUTE Sp_executesql
								  @SQL
								  ,N'@OrgID int,@isViewall bit,@UserID int,@ProgramID int'
								  ,@OrgID = @OrgID
								  ,@isviewAll = @isviewAll
								  ,@UserID = @UserID
								  ,@ProgramID =@ProgramID
                        END
                  END
                ELSE IF ( @LookUpTable = 'RegistrationProduct'
                     AND @LookUpColumn = 'MnfPartNumber' )
                  BEGIN
                      SET @SQL = @Select + 'rp.' + @LookUpIDColumn + ' as DDValue , '    
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable
                                 + ' rp Inner join org.Product p on p.ProductID = rp.productID'

                      IF ( @value IS NOT NULL )
                        BEGIN
                            SET @where = ' Where ' + @FilterField + ' = @value'
                                         + ' and rp.TempisActive = 1 '
                            SET @sql = @sql + @where + @Orderby

                            PRINT @SQL

                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@value varchar(200)'
                              ,@value = @value
                        END
                  END
                --7/21/2012 Added for Company Page
                ELSE IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'GenericLookup' )
                  BEGIN
                      SET @FilterField = 'LookupType'

                      PRINT '1211221121212211212'

                      IF ( @LookUpColumn = 'NumLocationsID' )
                        BEGIN
                            SELECT @Value = 'NumLocations'
                                   ,@LookUpColumn = 'LookUpValue'
                        END
                      ELSE IF ( @LookUpColumn = 'OwnershipTypeID' )
                        BEGIN
                            SELECT @Value = 'OwnershipType'
                                   ,@LookUpColumn = 'LookUpValue'
                        END
                      ELSE IF ( @LookUpColumn = 'NumEmployeesID' )
                        BEGIN
                            SELECT @Value = 'NumEmployees'
                                   ,@LookUpColumn = 'LookUpValue'
                                   ,@Orderby = ' order by 1 ' --2/16/2016 To sort the numeric values in Ascending order.
                        END
                      ELSE IF ( @LookUpColumn = 'IndustryID' )
                        BEGIN
                            SELECT @Value = 'Industry'
                                   ,@LookUpColumn = 'LookUpValue'
                        END

                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + ' '
                      SET @where = ' Where ' + @FilterField + ' = @value'
                      SET @sql = @sql + @where + @Orderby

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@value varchar(200)'
                        ,@value = @value

                      --02/16/2016 Set order by to default value 
                      SET @Orderby = ' order by 2 '
                  --7/21/2014 ENd 
                  END
                --7/30/2012 Added for Company Page
                ELSE IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'uf_getChannelManager' )
                  BEGIN
                      SET @LookUpTable = @LookUpTable + '('
                                         + Cast (@Orgid AS VARCHAR(20) ) + ') '

                      PRINT @LookUpTable + '('
                            + Cast (@Orgid AS VARCHAR(20) ) + ') '

                      PRINT @LookupTable

                      PRINT @Orgid

                      SET @SQL = @Select + 'Top 1 ' + @LookUpIDColumn
                                 + ' as DDValue , ' + @LookUpColumn
                                 + ' as DDText ' + @From + @LookUpSchema + '.'
                                 + @LookUpTable + ' '

                      PRINT @sql

                      SET @where = ' Where ' + @FilterField + ' = @value'
                      SET @sql = @sql + @where + ' Order by 2 desc '

                      PRINT 'asdadaduf_getChannelManager'

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@value varchar(200)'
                        ,@value = @value
                  END
                ELSE IF ( @LookUpSchema = 'Coop'
                     AND @LookUpTable = 'ProgramCompany'
                     AND @LookUpColumn = 'CompanyName' )
                  BEGIN
                      SELECT top 100 --12/10/2019 -----------------------
					  @isExternal = CASE
                                             WHEN srt.SecurityRoleTypeName = 'External' THEN 1
                                             ELSE 0
                                           END
                             ,@CompanyID = ua.CompanyID
                             ,@IsViewAll = sr.IsViewAll
                      FROM   Sec.Useraccount ua
                             INNER JOIN sec.Securityrole sr
                                     ON sr.SecurityRoleId = ua.RoleID
                             INNER JOIN sec.Securityroletype srt
                                     ON srt.SecurityRoleTypeID = sr.SecurityRoleTypeID
                      WHERE  ua.userid = @UserID

                      IF @isExternal = 1
                        BEGIN
                            SET @Where = 'where  cpc.ProgramID = @ProgramID '
                            SET @Where = @Where
                                         + ' and cpc.CompanyID = @CompanyID and cpc.isActive = 1'
                            SET @SQL = @Select + ' cpc.' + @LookUpIDColumn
                                       + ' as DDValue , Coalesce(' + ' c.'
                                       + @LookUpColumn + ','''') as DDText ' + @From
                                       + @LookUpSchema + '.' + @LookUpTable
                                       + ' cpc Inner join org.company c on c.companyID = cpc.CompanyID and c.isActive = 1 '
                                       + @Where

                            PRINT @sql

                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@ProgramID int, @CompanyID int'
                              ,@ProgramID = @ProgramID
                              ,@CompanyID = @CompanyID
                        END
                      ELSE
                        BEGIN
                            SET @Where = ' wHERE c.oRGID = @oRGID 
						               and c.isActive = 1 
									   and cpc.ProgramID = @ProgramID and cpc.isActive = 1
									   and (@isViewall = 1 
									        or Exists (Select 1 from org.Uf_getprogrampartnerlistforuser(@UserID, @ProgramID) 
											 where CompanyID = c.companyid))'
                            SET @SQL = @Select + ' cpc.' + @LookUpIDColumn
                                       + ' as DDValue , Coalesce(' + ' c.'
                                       + @LookUpColumn + ','''') as DDText ' + @From
                                       + @LookUpSchema + '.' + @LookUpTable
                                       + ' cpc Inner join org.company c on c.companyID = cpc.CompanyID and c.isActive = 1'
                                       + @where + @Orderby

                            PRINT @sql

                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@OrgID int,@isViewall bit,@UserID int,@ProgramID int'
                              ,@OrgID = @OrgID
                              ,@isviewAll = @isviewAll
                              ,@UserID = @UserID
                              ,@ProgramID =@ProgramID
                        END
                  END
                ELSE IF ( @LookUpSchema = 'Coop'
                     AND @LookUpTable = 'ProgramAction' )
                  BEGIN
                      SET @where = ' Where ProgramID = @ProgramID '
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + @Orderby

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramID int'
                        ,@ProgramID = @ProgramID
                  END
                /* Added by cmrAshwin */
                ELSE IF ( @LookUpSchema = 'snd'
                     AND @LookUpTable = 'GroupType' )
                  BEGIN
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + @Orderby

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgId int'
                        ,@OrgId = @OrgId
                  END
                ELSE IF ( @LookUpSchema = 'snd'
                     AND @LookUpTable = 'Program' )
                  BEGIN
				  --print 'program lookup'
						
                      SET @where = ' where (OrgID = @OrgID) '

					  -- If (@value IS NOT NULL )
					  -- BEGIN
							SET @where = @where + ' and ' + @filterField + ' = '
                                   + CASE
                                       WHEN @value = '' THEN '0'
                                       ELSE @value
                                     END
					  -- END
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + ' AND StatusId = 2 ' + @Orderby

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgID int'
                        ,@OrgID = @OrgId
                  END
                ELSE IF ( @LookUpSchema = 'snd'
                     AND @LookUpTable = 'Company' )
                  BEGIN
                      SET @where = ' Where (OrgID = @OrgID) '
                      --set @where = ' where ' + @filterField + ' = ' + @value
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From + 'org' + '.'
                                 + @LookUpTable + @where
                                 + ' and companyid = ParentID and companyName <> ''--'' and companyName <> '''''
                                 + @Orderby

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgID int'
                        ,@OrgID = @OrgID
                  END
                ELSE IF ( @LookUpSchema = 'pr'
                     AND @LookUpTable = 'ApplicationModule' )
                  BEGIN
                      SET @where = ' Where ' + @filterField + ' =  ' + @value
                      --set @where = ' where ' + @filterField + ' = ' + @value
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + '  as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + @Orderby

                      PRINT @sql

                      EXECUTE Sp_executesql
                        @SQL
                  END
                /* 20151123 Added by cmrThanh - task 1915 */
                ELSE IF ( @LookUpSchema = 'snd'
                     AND @LookUpTable = 'status' )
                  BEGIN
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where
                                 + ' and statustypeid in (2) ' + @Orderby --20151203 returns only claim status

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgId int'
                        ,@OrgId = @OrgId
                  END
                /* 20160121 Added by cmrAshwin - task 2232 */
                ELSE IF ( @LookUpSchema = 'dbo'
                     AND @LookUpTable = 'Language' )
                  BEGIN
                      PRINT 1

                      SET @where =''
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable
                                 + ' WHERE LangID in (SELECT LANGID FROM org.OrganizationLanguage where OrgId = @orgid and isPublished = 1) '
                                 + @Orderby

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgId int'
                        ,@OrgId = @OrgId
                  END
                ELSE IF ( @LookUpSchema = 'org'
                     AND @LookUpTable = 'Company'
                     AND @LookUpColumn = 'ExternalCompanyID' )
                  BEGIN
                      SET @where = ' Where (OrgID = @OrgID) '
                      --set @where = ' where ' + @filterField + ' = ' + @value
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From + 'org' + '.'
                                 + @LookUpTable + @where + ' and ' + @filterField
                                 + ' = ' + @Value + ' and isActive = 1 '

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgID int'
                        ,@OrgID = @OrgID
                  END
                ELSE IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'Activity'
                     AND @LookUpColumn = 'ActivityName' )
                  BEGIN
                      SET @where = ' Where (ProgramID = @ProgramID) '
                      --set @where = ' where ' + @filterField + ' = ' + @value
                      SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
                                 + @LookUpColumn + ' as DDText ' + @From
                                 + @LookUpSchema + '.' + @LookUpTable + @where +
                                 + ' and isActive = 1  AND (StandAloneClaimFormID IS NOT NULL OR ClaimFormID IS NOT NULL OR PAFormID IS NOT NULL)'

                      PRINT @SQL

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@ProgramID int'
                        ,@ProgramID = @ProgramID
                  END

				  --For RebateSpiff module
				  else
				--reb.programAccount
				IF ( @LookUpSchema = 'Reb'
						 AND @LookUpTable = 'ProgramAccount'
						 AND @LookUpColumn = 'ContactName' )
				BEGIN
					SET @where = ' Where ( @ProgramID = 0 or ProgramID = @ProgramID ) '
					SET @SQL = @Select + ' pa.' + @LookUpIDColumn + ' as DDValue , '
								+ ' coalesce(pa.' + @LookUpColumn  
								+  ', (ct.firstname + '' ''' + ' + ct.lastname))' 
								+ ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable + ' pa '
								+ ' join org.company c on pa.companyid = c.companyid ' + 
								+ ' join org.contact ct on ct.contactid = pa.contactid ' 
								+ @where
								+ ' and c.isActive = 1 and pa.isActive = 1 '

					if @value is not null
							SET @SQL = 	@SQL + ' and c.' + @filterField + ' = ' + @Value

					if @IsViewAll <> 1
					begin
						set @SQL = @SQL 
								+ ' and ( @ProgramID = 0 
											or (@ProgramID <> 0 and pa.contactid in (select contactid from sec.useraccount where userid = @UserID)))'
					end
					set @SQL = @SQL + @Orderby

					print  @SQL

					EXECUTE Sp_executesql
					@SQL
					,N'@ProgramID int, @UserID int'
					,@ProgramID = @ProgramID
					,@UserID = @UserID
				END
				else
				--reb.Program
				IF ( @LookUpSchema = 'Reb'
						 AND @LookUpTable = 'Program'
						 AND @LookUpColumn = 'ProgramName' )
				BEGIN
					SET @where = ' Where ( @ProgramID = 0 or ProgramID = @ProgramID ) '
					SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
								+ @LookUpColumn + ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable + @where
								+ ' and isActive = 1 ' + @Orderby

					PRINT @SQL

					EXECUTE Sp_executesql
					@SQL
					,N'@ProgramID int'
					,@ProgramID = @ProgramID
				END
				
				--product number
				else	IF ( @LookUpSchema = 'org'
						 AND @LookUpTable = 'product'
						 AND @LookUpColumn = 'MnfPartnumber' )
				BEGIN
					SET @where = ' Where ( orgID = @orgID ) '
					SET @SQL = @Select + 'p.' + @LookUpIDColumn + ' as DDValue , '
								+ 'p.' + @LookUpColumn + ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable + ' p '
								+ ' join reb.ProgramProduct pp on pp.productid = p.productid and pp.programid = @programid '
								+ @where
								+ ' and p.isActive = 1 and pp.isActive = 1 '  + @Orderby

					PRINT @SQL

					EXECUTE Sp_executesql 					
						@SQL
						,N'@orgID int, @programid int'
						,@orgID = @orgID
						,@programid = @programid
				END

				--Status
				else
				IF ( @LookUpSchema = 'Org'
						 AND @LookUpTable = 'Status'
						 AND @LookUpColumn = 'StatusName' )
				BEGIN
					SET @where = ' Where ( orgID = @orgID ) '
					SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
								+ @LookUpColumn + ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable + @where
								+ ' and isActive = 1 ' + @Orderby

					PRINT @SQL

					EXECUTE Sp_executesql
					@SQL
					,N'@orgID int'
					,@orgID = @orgID
				END

				--PaymentType
				else	
				IF ( @LookUpSchema = 'dbo'
						 AND @LookUpTable = 'PaymentType'
						 AND @LookUpColumn = 'PaymentTypeName' )
				BEGIN
					SET @where = ' Where ( orgID = @orgID ) '
					SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
								+ @LookUpColumn + ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable + @where 
								+ ' and isActive = 1 ' + @Orderby

					PRINT @SQL

					EXECUTE Sp_executesql 					
						@SQL
						,N'@orgID int'
						,@orgID = @orgID
				END
				
				--ProgramAccount
				else
				 IF ( @LookUpSchema = 'Reb'
                     AND @LookUpTable = 'ProgramAccount'
                     AND @LookUpColumn = 'CompanyName' )
				BEGIN
					SET @where = ' Where c.orgid = @orgID and pa.programid = @programid '
					SET @SQL = @Select + 'c.' + @LookUpIDColumn + ' as DDValue , '
								+ 'c.' + @LookUpColumn + ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable + ' pa '
								+ ' join org.company c on pa.companyid = c.companyid ' + @where
								+ ' and c.isActive = 1 and pa.isActive = 1 ' + @Orderby

					PRINT @SQL

					EXECUTE Sp_executesql
					@SQL
					,N'@orgID int, @programid int'
					,@orgID = @orgID
					,@programid = @programid
				END

				--TradeInCompany
				else
				 IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'TradeInCompany'
                     AND @LookUpColumn = 'TradeInCompanyName' )
				BEGIN
					SET @where = ' Where programid = @programid '
					SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
								+ @LookUpColumn + ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable 
								+ @where
								+ ' and isActive = 1 ' 
								+ @Orderby

					PRINT @SQL

					EXECUTE Sp_executesql
					@SQL
					,N'@programid int'
					,@programid = @programid
				END
				--11/8/2019 END
				--04-16-2020 AccountNumber
				else
				 IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'Company'
                     AND @LookUpColumn = 'AccountNumber' )
				BEGIN
					SET @where = ' Where CompanyId = @CompanyId '
					SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
								+ @LookUpColumn + ' as DDText ' + @From 
								+ @LookUpSchema + '.' + @LookUpTable 
								+ @where
								+ ' and isActive = 1 ' 
								--+ @Orderby

					PRINT @SQL

					EXECUTE Sp_executesql
					@SQL
					,N'@CompanyId int'
					,@CompanyID = @CompanyID
				END
				--END 04-16-2020 AccountNumber
					--08-18-21 CurrencyCode
				ELSE
				 IF ( @LookUpSchema = 'dbo'
                     AND @LookUpTable = 'Currency'
                     AND @LookUpColumn = 'CurrencyCode' )
				BEGIN
					SET @SQL = @Select + @LookUpIDColumn + ' as DDValue , '
								+ @LookUpColumn + ' as DDText ' + @From
								+ @LookUpSchema + '.' + @LookUpTable  
								+ @Orderby
					PRINT 'Currency Code'
					PRINT @SQL

					EXECUTE Sp_executesql
					@SQL
				END
				--End 08-18-21 CurrencyCode

				ELSE --09/14/2021
				-- org.Contact
				-- returns CompanyID, ContactID
				-- sorted by contactid
				 IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'Contact'
                     AND @LookUpColumn = 'ContactID' )
				BEGIN
					SET @SQL = @Select  + 'ct.' + @LookUpColumn + ' as DDValue , '
								+ 'ltrim(rtrim(coalesce(FirstName, '''') + '' '' +  coalesce(LastName, ''''))) as DDText'
								+ @From
								+ @LookUpSchema + '.' + @LookUpTable + ' ct  join sec.UserAccount ua on ct.contactid = ua.contactid '
								+ ' where ct.' + @LookUpIDColumn + ' = ' + NULLIF(@Value, '')--@Value 01/06/21
								+ ' and ct.isactive = 1 and ua.isactive = 1 '
								+ @Orderby
					PRINT 'Contact Info'
					PRINT @SQL
					PRINT @LookUpTable
					PRINT @LookUpColumn
					PRINT @LookUpIDColumn
					PRINT @value

					EXECUTE Sp_executesql
					@SQL
				END

                ELSE
                  BEGIN
                      SET @SQL = @Select + @LookUpIDColumn
                                 + ' as DDValue , Coalesce(' + @LookUpColumn
                                 + ','''') as DDText ' + @From + @LookUpSchema + '.'
                                 + @LookUpTable + @where + @Orderby

                      EXECUTE Sp_executesql
                        @SQL
                        ,N'@OrgID int'
                        ,@OrgID = @OrgID
                  END
            END
			-- print 'sql' + @SQL
			ELSE  -- Has Filter Field
				BEGIN
					IF ( @LookUpSchema = 'Org'
                     AND @LookUpTable = 'Company'
                     AND @LookUpColumn = 'CompanyName' 
					 AND @FilterField in ('UDFormID'))
                  BEGIN
					if len(@Value) = 0
						Set @Value='0'

                      SELECT top 100 --12/10/2019 -----------------------
						@isExternal = CASE
                                             WHEN srt.SecurityRoleTypeName = 'External' THEN 1
                                             ELSE 0
                                           END
                             ,@CompanyID = ua.CompanyID
                             ,@IsViewAll = sr.IsViewAll
                      FROM   Sec.Useraccount ua
                             INNER JOIN sec.Securityrole sr
                                     ON sr.SecurityRoleId = ua.RoleID
                             INNER JOIN sec.Securityroletype srt
                                     ON srt.SecurityRoleTypeID = sr.SecurityRoleTypeID
                      WHERE  ua.userid = @UserID
					  --print @Where
                      IF @isExternal = 1
                        BEGIN
                            SET @Where = @Where + ' AND CompanyID = @CompanyID '
                            SET @SQL = @Select + @LookUpIDColumn
                                       + ' as DDValue , Coalesce(' + @LookUpColumn
                                       + ','''') as DDText ' + @From + @LookUpSchema + '.'
                                       + @LookUpTable + @Where

                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@OrgID int, @CompanyID int'
                              ,@OrgID = @OrgID
                              ,@CompanyID = @CompanyID
                        END
                      ELSE
                        BEGIN
                            SET @Where = ' wHERE oRGID = @oRGID and c.isActive = 1 and c.' + @FilterField + ' in (' + @Value + ') and (@isViewall = 1 or Exists (Select 1 from org.Uf_getpartnerlistforuser(@UserID) where CompanyID = c.companyid))' --05122016 Get Companies for Internal users with no program constraint
                            --(Select 1 from org.Uf_getprogrampartnerlistforuser(@UserID, @ProgramID) where CompanyID = c.companyid))
                            SET @SQL = @Select + @LookUpIDColumn
                                       + ' as DDValue , Coalesce(' + @LookUpColumn
                                       + ','''') as DDText ' + @From + @LookUpSchema + '.'
									   + @LookUpTable + ' c ' + @where + @Orderby
                                       --+ @LookUpTable + ' c join org.contact ct on ct.companyid = c.companyid' + @where + @Orderby --10/23/2019 to fix timeout issue
									  

							--select @SQL = replace(@SQL, 'Distinct CompanyID', 'Distinct c.CompanyID') --10/23/2019 to fix timeout issue
                             PRINT @sql
                            EXECUTE Sp_executesql
                              @SQL
                              ,N'@OrgID int,@isViewall bit,@UserID int,@ProgramID int'
                              ,@OrgID = @OrgID
                              ,@isviewAll = @isviewAll
                              ,@UserID = @UserID
                              ,@ProgramID =@ProgramID
                        END
                  END
			END

      END TRY
      BEGIN Catch ;
			
          THROW
      END Catch
  END