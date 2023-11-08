CREATE TABLE IF NOT EXISTS module (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  parent_id INT,
  sort_order INT,

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

    INSERT INTO module(id, name, sort_order, parent_id, is_external, is_internal, is_subscription, is_active) VALUES

    (1,'sys',1,null,null,null,null,'1'),
    (2,'monitor',2,1,'0','0','0','1'),
    (3,'request',3,1,'0','0','0','1'),
    (4,'client',4,1,'0','0','0','1'),
    (5,'manage',5,1,'0','0','0','1'),
    (6,'log',6,1,'0','0','0','1'),

    (20,'app',8,null,null,null,null,'1'),
    (21,'personal',9,20,'0','1','0','1'),
    (22,'iam',10,20,'1','1','0','1'),
    (23,'help',11,20,'1','1','0','1'),
    (24,'visitor',12,20,'1','1','0','1'),

    (40,'pos',14,null,null,null,null,'1'),
    (41,'booking',15,40,'1','1','1','1'),
    (42,'checkin',16,40,'1','1','1','1'),
    (43,'checkout',17,40,'0','1','1','1'),
    (44,'report',18,40,'1','1','1','1'),

    (60,'crm',20,null,null,null,null,'1'),
    (61,'customer',21,60,'0','1','1','1'),
    (62,'promotion',22,60,'0','1','1','1'),
    (63,'referral',23,60,'0','1','1','1'),
    (64,'reward',24,60,'0','1','1','1'),
    (65,'review',25,60,'0','1','1','1'),

    (200,'setting',27,null,null,null,null,'1'),
    (201,'sys-setting',28,200,'0','0','0','1'),
    (202,'app-setting',29,200,'0','1','0','1'),
    (203,'pos-setting',30,200,'0','1','0','1'),
    (204,'crm-setting',31,200,'0','1','0','1');
    
  ELSE
    RAISE NOTICE 'The module table is not empty.';
  END IF;
END;
$$;