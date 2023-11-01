CREATE TABLE IF NOT EXISTS module (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT,

  is_internal BOOLEAN DEFAULT TRUE,
  is_external BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,

  FOREIGN KEY (parent_id) REFERENCES module(id) ON DELETE SET NULL ON UPDATE CASCADE
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM module) = 0 THEN

    INSERT INTO module(id, name, parent_id, is_external, is_internal, is_subscription, is_active) VALUES

    (1,'sys',null,null,null,null,'1'),
    (2,'monitor',1,'0','0','0','1'),
    (3,'request',1,'0','0','0','1'),
    (4,'log',1,'0','0','0','1'),
    (5,'database',1,'0','0','0','1'),
    (6,'client',1,'0','0','0','1'),

    (20,'app',null,null,null,null,'1'),
    (21,'iam',20,'0','1','0','1'),
    (22,'personal',20,'1','1','0','1'),
    (23,'help',20,'1','1','0','1'),
    (24,'visitor',20,'1','1','0','1'),

    (40,'pos',null,null,null,null,'1'),
    (41,'booking',40,'1','1','1','1'),
    (42,'checkin',40,'1','1','1','1'),
    (43,'checkout',40,'0','1','1','1'),
    (44,'report',40,'1','1','1','1'),

    (60,'crm',null,null,null,null,'1'),
    (61,'customer',60,'0','1','1','1'),
    (62,'promotion',60,'0','1','1','1'),
    (63,'referral',60,'0','1','1','1'),
    (64,'reward',60,'0','1','1','1'),
    (65,'review',60,'0','1','1','1'),

    (200,'setting',null,null,null,null,'1'),
    (201,'sys-setting',200,'0','0','0','1'),
    (202,'app-setting',200,'0','1','0','1'),
    (203,'pos-setting',200,'0','1','0','1'),
    (204,'crm-setting',200,'0','1','0','1');
    
  ELSE
    RAISE NOTICE 'The module table is not empty.';
  END IF;
END;
$$;