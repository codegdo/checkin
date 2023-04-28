CREATE TABLE main_dbo.module (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  parent_id INT,

  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT TRUE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,

  FOREIGN KEY (parent_id) REFERENCES main_dbo.module(id) ON DELETE SET NULL ON UPDATE CASCADE
);

INSERT INTO main_dbo.module(id, name, parent_id, is_external, is_internal, is_subscription, is_active) VALUES

(1,'monitor',200,'0','0','0','1'),
(2,'request',200,'0','0','0','1'),
(3,'log',200,'0','0','0','1'),
(4,'sys-settings',200,'0','0','0','1'),

(20,'iam',201,'0','1','0','1'),
(21,'account',201,'1','1','0','1'),
(22,'help',201,'1','1','0','1'),
(23,'app-settings',201,'0','1','0','1'),

(40,'booking',202,'1','1','1','1'),
(41,'checkin',202,'1','1','1','1'),
(42,'checkout',202,'0','1','1','1'),
(43,'report',202,'1','1','1','1'),
(44,'pos-settings',202,'0','1','1','1'),

(50,'customer',203,'0','1','1','1'),
(51,'promotion',203,'0','1','1','1'),
(52,'referral',203,'0','1','1','1'),
(53,'reward',203,'0','1','1','1'),
(54,'review',203,'0','1','1','1'),
(55,'crm-settings',203,'0','1','1','1'),

(200,'sys',null,null,null,null,'1'),
(201,'app',null,null,null,null,'1'),
(202,'pos',null,null,null,null,'1'),
(203,'crm',null,null,null,null,'1');


