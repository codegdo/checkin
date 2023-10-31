CREATE TABLE IF NOT EXISTS view (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT,

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

    (1,'metrics',9000,'0','0','1'),

    (50,'demos',9000,'0','0','1'),
    (51,'trials',9000,'0','0','1'),

    (100,'errors',9000,'0','0','1'),
    (101,'activities',9000,'0','0','1'),

    (150,'migrations',9000,'0','0','1'),
    (151,'migration-categories',9000,'0','0','1'),
    (152,'migration-scripts',9000,'0','0','1'),
    (153,'migration-rollbacks',9000,'0','0','1'),
    (154,'migration-tags',9000,'0','0','1'),
    (155,'migration-metadata',9000,'0','0','1'),

    (200,'accounts',9000,'0','0','1'),
    (201,'companies',9000,'0','0','1'),
    (202,'supscriptions',9000,'0','0','1'),
    (203,'payments',9000,'0','0','1'),
    (204,'invoices',9000,'0','0','1'),

    (950,'configs',9000,'0','0','1'),

    (1000,'users',9001,'0','1','1'),
    (1001,'groups',9001,'0','1','1'),
    (1002,'roles',9001,'0','1','1'),
    (1003,'policies',9001,'0','1','1'),
    (1004,'permissions',9001,'0','1','1'),

    (1050,'profile',9001,'1','1','1'),
    (1051,'subscription',9001,'0','1','1'),

    (1100,'supports',9001,'0','1','1'),
    (1101,'feedbacks',9001,'0','1','1'),

    (1150,'customers',9001,'0','1','1'),
    (1151,'customer-groups',9001,'0','1','1'),

    (1950,'languages',9001,'0','1','1'),
    (1951,'themes',9001,'0','1','1'),
    (1952,'emails',9001,'0','1','1'),
    (1953,'forms',9001,'0','1','1'),
    (1954,'terms',9001,'0','1','1'),

    (2000,'appointments',9002,'0','1','1'),
    (2001,'calendar',9002,'1','1','1'),

    (2050,'customers',9002,'0','1','1'),
    (2051,'staffs',9002,'0','1','1'),

    (2100,'orders',9002,'0','1','1'),
    (2101,'tickets',9002,'0','1','1'),
    (2102,'payments',9002,'0','1','1'),

    (2150,'incomes',9002,'0','1','1'),
    (2151,'payrolls',9002,'0','1','1'),
    (2152,'sales',9002,'0','1','1'),
    (2153,'staffs',9002,'1','1','1'),

    (2950,'products',9002,'0','1','1'),
    (2951,'services',9002,'0','1','1'),
    (2952,'staffs',9002,'0','1','1'),
    (2953,'schedules',9002,'0','1','1'),
    (2954,'taxes',9002,'0','1','1'),

    (3000,'memberships',9003,'0','1','1'),
    (3001,'customer-groups',9003,'0','1','1'),

    (3050,'birthdays',9003,'0','1','1'),
    (3051,'new-customers',9003,'0','1','1'),
    (3052,'reminders',9003,'0','1','1'),

    (3100,'friends',9003,'1','1','1'),
    (3101,'friend-groups',9003,'1','1','1'),

    (3150,'visits',9003,'0','1','1'),
    (3151,'referrals',9003,'0','1','1'),

    (3200,'google+',9003,'0','1','1'),
    (3201,'yelps',9003,'0','1','1'),
    (3202,'in-store',9003,'0','1','1'),

    (3250,'notifications',9003,'0','1','1'),
    (3251,'emails',9003,'0','1','1'),
    (3252,'ratings',9003,'0','1','1'),

    (9000,'sys',null,null,null,'1'),
    (9001,'app',null,null,null,'1'),
    (9002,'pos',null,null,null,'1'),
    (9003,'crm',null,null,null,'1');

  ELSE
    RAISE NOTICE 'The view table is not empty.';
  END IF;
END;
$$;