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

    (1,'monitor',200,'0','0','0','1'),
    (2,'request',200,'0','0','0','1'),
    (3,'log',200,'0','0','0','1'),
    (4,'database',200,'0','0','0','1'),
    (5,'client',200,'0','0','0','1'),
    (19,'sys-setting',210,'0','0','0','1'),

    (20,'iam',201,'0','1','0','1'),
    (21,'personal',201,'1','1','0','1'),
    (22,'help',201,'1','1','0','1'),
    (23,'visitor',201,'1','1','0','1'),
    (39,'app-setting',210,'0','1','0','1'),

    (40,'booking',202,'1','1','1','1'),
    (41,'checkin',202,'1','1','1','1'),
    (42,'checkout',202,'0','1','1','1'),
    (43,'report',202,'1','1','1','1'),
    (59,'pos-setting',210,'0','1','0','1'),

    (50,'customer',203,'0','1','1','1'),
    (51,'promotion',203,'0','1','1','1'),
    (52,'referral',203,'0','1','1','1'),
    (53,'reward',203,'0','1','1','1'),
    (54,'review',203,'0','1','1','1'),
    (69,'crm-setting',210,'0','1','0','1'),

    (200,'sys',null,null,null,null,'1'),
    (201,'app',null,null,null,null,'1'),
    (202,'pos',null,null,null,null,'1'),
    (203,'crm',null,null,null,null,'1'),
    (210,'setting',null,null,null,null,'1');
  ELSE
    RAISE NOTICE 'The module table is not empty.';
  END IF;
END;
$$;