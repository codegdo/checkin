CREATE TABLE IF NOT EXISTS view (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT,
  sort_order INT,

  is_internal BOOLEAN DEFAULT TRUE,
  is_external BOOLEAN DEFAULT FALSE,
  
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  
  FOREIGN KEY (parent_id) REFERENCES view(id) ON DELETE SET NULL
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM view) = 0 THEN
    
    INSERT INTO view(id, name, sort_order, parent_id, is_external, is_internal, is_active) VALUES

    (1,'sys_monitor',1,null,null,null,'1'),
    (2,'metrics',2,1,'0','0','1'),

    (50,'sys_request',4,null,null,null,'1'),
    (51,'demos',5,50,'0','0','1'),
    (52,'trials',6,50,'0','0','1'),

    (100,'sys_client',8,null,null,null,'1'),
    (101,'accounts',9,100,'0','0','1'),
    (102,'companies',10,100,'0','0','1'),
    (103,'subscriptions',11,100,'0','0','1'),
    (104,'payments',12,100,'0','0','1'),
    (105,'invoices',13,100,'0','0','1'),

    (150,'sys_database',15,null,null,null,'1'),
    (151,'migrations',16,150,'0','0','1'),
    (152,'migration-categories',17,150,'0','0','1'),
    (153,'migration-scripts',18,150,'0','0','1'),
    (154,'migration-rollbacks',19,150,'0','0','1'),
    (155,'migration-tags',20,150,'0','0','1'),
    (156,'migration-metadata',21,150,'0','0','1'),

    (200,'sys_log',23,null,null,null,'1'),
    (201,'errors',24,200,'0','0','1'),
    (202,'activities',25,200,'0','0','1'),

    (950,'sys_setting',27,null,null,null,'1'),
    (951,'configs',28,950,'0','0','1'),

    (1000,'app_personal',30,null,null,null,'1'),
    (1001,'profile',31,1000,'1','1','1'),
    (1002,'subscription',32,1000,'0','1','1'),

    (1050,'app_iam',34,null,null,null,'1'),
    (1051,'users',35,1050,'0','1','1'),
    (1052,'groups',36,1050,'0','1','1'),
    (1053,'roles',37,1050,'0','1','1'),
    (1054,'policies',38,1050,'0','1','1'),
    (1055,'permissions',39,1050,'0','1','1'),

    (1100,'app_help',41,null,null,null,'1'),
    (1101,'supports',42,1100,'0','1','1'),
    (1102,'feedbacks',43,1100,'0','1','1'),

    (1150,'app_visitor',45,null,null,null,'1'),
    (1151,'customers',46,1150,'0','1','1'),
    (1152,'customer-groups',47,1150,'0','1','1'),

    (1950,'app_setting',49,null,null,null,'1'),
    (1951,'languages',50,1950,'0','1','1'),
    (1952,'themes',51,1950,'0','1','1'),
    (1953,'emails',52,1950,'0','1','1'),
    (1954,'forms',53,1950,'0','1','1'),
    (1955,'terms',54,1950,'0','1','1'),

    (2000,'pos_booking',56,null,null,null,'1'),
    (2001,'appointments',57,2000,'0','1','1'),
    (2002,'calendar',58,2000,'1','1','1'),

    (2050,'pos_checkin',60,null,null,null,'1'),
    (2051,'customers',61,2050,'0','1','1'),
    (2052,'staffs',62,2050,'0','1','1'),

    (2100,'pos_checkout',64,null,null,null,'1'),
    (2101,'orders',65,2100,'0','1','1'),
    (2102,'tickets',66,2100,'0','1','1'),
    (2103,'payments',67,2100,'0','1','1'),

    (2150,'pos_report',69,null,null,null,'1'),
    (2151,'incomes',70,2150,'0','1','1'),
    (2152,'payrolls',71,2150,'0','1','1'),
    (2153,'sales',72,2150,'0','1','1'),
    (2154,'staffs',73,2150,'1','1','1'),

    (2950,'pos_setting',75,null,null,null,'1'),
    (2951,'products',76,2950,'0','1','1'),
    (2952,'services',77,2950,'0','1','1'),
    (2953,'staffs',78,2950,'0','1','1'),
    (2954,'schedules',79,2950,'0','1','1'),
    (2955,'taxes',80,2950,'0','1','1'),

    (3000,'crm_customer',82,null,null,null,'1'),
    (3001,'memberships',83,3000,'0','1','1'),
    (3002,'customer-groups',84,3000,'0','1','1'),

    (3050,'crm_promotion',86,null,null,null,'1'),
    (3051,'birthdays',87,3050,'0','1','1'),
    (3052,'new-customers',88,3050,'0','1','1'),
    (3053,'reminders',89,3050,'0','1','1'),

    (3100,'crm_referral',91,null,null,null,'1'),
    (3101,'friends',92,3100,'1','1','1'),
    (3102,'friend-groups',93,3100,'1','1','1'),

    (3150,'crm_reward',95,null,null,null,'1'),
    (3151,'visits',96,3150,'0','1','1'),
    (3152,'referrals',97,3150,'0','1','1'),

    (3200,'crm_review',99,null,null,null,'1'),
    (3201,'google+',100,3200,'0','1','1'),
    (3202,'yelps',101,3200,'0','1','1'),
    (3203,'in-store',102,3200,'0','1','1'),

    (3950,'crm_setting',104,null,null,null,'1'),
    (3951,'notifications',105,3950,'0','1','1'),
    (3952,'emails',106,3950,'0','1','1'),
    (3953,'ratings',107,3950,'0','1','1');

  ELSE
    RAISE NOTICE 'The view table is not empty.';
  END IF;
END;
$$;