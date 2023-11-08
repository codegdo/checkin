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

    (150,'sys_manage',11,null,null,null,'1'),
    (151,'migrations',12,150,'0','0','1'),

    (200,'sys_log',14,null,null,null,'1'),
    (201,'errors',15,200,'0','0','1'),
    (202,'activities',16,200,'0','0','1'),

    (950,'sys_setting',18,null,null,null,'1'),
    (951,'configs',19,950,'0','0','1'),

    (1000,'app_personal',21,null,null,null,'1'),
    (1001,'profile',22,1000,'1','1','1'),
    (1002,'subscription',23,1000,'0','1','1'),

    (1050,'app_iam',25,null,null,null,'1'),
    (1051,'users',26,1050,'0','1','1'),
    (1052,'groups',27,1050,'0','1','1'),
    (1053,'roles',28,1050,'0','1','1'),
    (1054,'policies',29,1050,'0','1','1'),
    (1055,'permissions',30,1050,'0','1','1'),

    (1100,'app_help',32,null,null,null,'1'),
    (1101,'supports',33,1100,'0','1','1'),
    (1102,'feedbacks',34,1100,'0','1','1'),

    (1150,'app_visitor',36,null,null,null,'1'),
    (1151,'customers',37,1150,'0','1','1'),
    (1152,'customer-groups',38,1150,'0','1','1'),

    (1950,'app_setting',40,null,null,null,'1'),
    (1951,'languages',41,1950,'0','1','1'),
    (1952,'themes',42,1950,'0','1','1'),
    (1953,'emails',43,1950,'0','1','1'),
    (1954,'forms',44,1950,'0','1','1'),
    (1955,'terms',45,1950,'0','1','1'),

    (2000,'pos_booking',47,null,null,null,'1'),
    (2001,'appointments',48,2000,'0','1','1'),
    (2002,'calendar',49,2000,'1','1','1'),

    (2050,'pos_checkin',51,null,null,null,'1'),
    (2051,'customers',52,2050,'0','1','1'),
    (2052,'staffs',53,2050,'0','1','1'),

    (2100,'pos_checkout',55,null,null,null,'1'),
    (2101,'orders',56,2100,'0','1','1'),
    (2102,'tickets',57,2100,'0','1','1'),
    (2103,'payments',58,2100,'0','1','1'),

    (2150,'pos_report',60,null,null,null,'1'),
    (2151,'incomes',61,2150,'0','1','1'),
    (2152,'payrolls',62,2150,'0','1','1'),
    (2153,'sales',63,2150,'0','1','1'),
    (2154,'staffs',64,2150,'1','1','1'),

    (2950,'pos_setting',66,null,null,null,'1'),
    (2951,'products',67,2950,'0','1','1'),
    (2952,'services',68,2950,'0','1','1'),
    (2953,'staffs',69,2950,'0','1','1'),
    (2954,'schedules',70,2950,'0','1','1'),
    (2955,'taxes',71,2950,'0','1','1'),

    (3000,'crm_customer',73,null,null,null,'1'),
    (3001,'memberships',74,3000,'0','1','1'),
    (3002,'customer-groups',75,3000,'0','1','1'),

    (3050,'crm_promotion',77,null,null,null,'1'),
    (3051,'birthdays',78,3050,'0','1','1'),
    (3052,'new-customers',79,3050,'0','1','1'),
    (3053,'reminders',80,3050,'0','1','1'),

    (3100,'crm_referral',82,null,null,null,'1'),
    (3101,'friends',83,3100,'1','1','1'),
    (3102,'friend-groups',84,3100,'1','1','1'),

    (3150,'crm_reward',86,null,null,null,'1'),
    (3151,'visits',87,3150,'0','1','1'),
    (3152,'referrals',88,3150,'0','1','1'),

    (3200,'crm_review',90,null,null,null,'1'),
    (3201,'google+',91,3200,'0','1','1'),
    (3202,'yelps',92,3200,'0','1','1'),
    (3203,'in-store',93,3200,'0','1','1'),

    (3950,'crm_setting',95,null,null,null,'1'),
    (3951,'notifications',96,3950,'0','1','1'),
    (3952,'emails',97,3950,'0','1','1'),
    (3953,'ratings',98,3950,'0','1','1');

  ELSE
    RAISE NOTICE 'The view table is not empty.';
  END IF;
END;
$$;