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
    
    INSERT INTO view(id, name, parent_id, is_external, is_internal, is_active) VALUES

    (1,'sys-monitor',null,null,null,'1'),
    (2,'metrics',1,'0','0','1'),

    (50,'sys-request',null,null,null,'1'),
    (51,'demos',50,'0','0','1'),
    (52,'trials',50,'0','0','1'),

    (100,'sys-log',null,null,null,'1'),
    (101,'errors',100,'0','0','1'),
    (102,'activities',100,'0','0','1'),

    (150,'sys-database',null,null,null,'1'),
    (151,'migrations',150,'0','0','1'),
    (152,'migration-categories',150,'0','0','1'),
    (153,'migration-scripts',150,'0','0','1'),
    (154,'migration-rollbacks',150,'0','0','1'),
    (155,'migration-tags',150,'0','0','1'),
    (156,'migration-metadata',150,'0','0','1'),

    (200,'sys-client',null,null,null,'1'),
    (201,'accounts',200,'0','0','1'),
    (202,'companies',200,'0','0','1'),
    (203,'supscriptions',200,'0','0','1'),
    (204,'payments',200,'0','0','1'),
    (205,'invoices',200,'0','0','1'),

    (950,'sys-setting',null,null,null,'1'),
    (951,'configs',950,'0','0','1'),

    (1000,'app-iam',null,null,null,'1'),
    (1001,'users',1000,'0','1','1'),
    (1002,'groups',1000,'0','1','1'),
    (1003,'roles',1000,'0','1','1'),
    (1004,'policies',1000,'0','1','1'),
    (1005,'permissions',1000,'0','1','1'),

    (1050,'app-personal',null,null,null,'1'),
    (1051,'profile',1050,'1','1','1'),
    (1052,'subscription',1050,'0','1','1'),

    (1100,'app-help',null,null,null,'1'),
    (1101,'supports',1100,'0','1','1'),
    (1102,'feedbacks',1100,'0','1','1'),

    (1150,'app-visitor',null,null,null,'1'),
    (1151,'customers',1150,'0','1','1'),
    (1152,'customer-groups',1150,'0','1','1'),

    (1950,'app-setting',null,null,null,'1'),
    (1951,'languages',1950,'0','1','1'),
    (1952,'themes',1950,'0','1','1'),
    (1953,'emails',1950,'0','1','1'),
    (1954,'forms',1950,'0','1','1'),
    (1955,'terms',1950,'0','1','1'),

    (2000,'pos-booking',null,null,null,'1'),
    (2001,'appointments',2000,'0','1','1'),
    (2002,'calendar',2000,'1','1','1'),

    (2050,'pos-checkin',null,null,null,'1'),
    (2051,'customers',2050,'0','1','1'),
    (2052,'staffs',2050,'0','1','1'),

    (2100,'pos-checkout',null,null,null,'1'),
    (2101,'orders',2100,'0','1','1'),
    (2102,'tickets',2100,'0','1','1'),
    (2103,'payments',2100,'0','1','1'),

    (2150,'pos-report',null,null,null,'1'),
    (2151,'incomes',2150,'0','1','1'),
    (2152,'payrolls',2150,'0','1','1'),
    (2153,'sales',2150,'0','1','1'),
    (2154,'staffs',2150,'1','1','1'),

    (2950,'pos-setting',null,null,null,'1'),
    (2951,'products',2950,'0','1','1'),
    (2952,'services',2950,'0','1','1'),
    (2953,'staffs',2950,'0','1','1'),
    (2954,'schedules',2950,'0','1','1'),
    (2955,'taxes',2950,'0','1','1'),

    (3000,'crm-customer',null,null,null,'1'),
    (3001,'memberships',3000,'0','1','1'),
    (3002,'customer-groups',3000,'0','1','1'),

    (3050,'crm-promotion',null,null,null,'1'),
    (3051,'birthdays',3050,'0','1','1'),
    (3052,'new-customers',3050,'0','1','1'),
    (3053,'reminders',3050,'0','1','1'),

    (3100,'crm-referral',null,null,null,'1'),
    (3101,'friends',3100,'1','1','1'),
    (3102,'friend-groups',3100,'1','1','1'),

    (3150,'crm-reward',null,null,null,'1'),
    (3151,'visits',3150,'0','1','1'),
    (3152,'referrals',3150,'0','1','1'),

    (3200,'crm-review',null,null,null,'1'),
    (3201,'google+',3200,'0','1','1'),
    (3202,'yelps',3200,'0','1','1'),
    (3203,'in-store',3200,'0','1','1'),

    (3950,'crm-setting',null,null,null,'1'),
    (3951,'notifications',3950,'0','1','1'),
    (3952,'emails',3950,'0','1','1'),
    (3953,'ratings',3950,'0','1','1');

  ELSE
    RAISE NOTICE 'The view table is not empty.';
  END IF;
END;
$$;