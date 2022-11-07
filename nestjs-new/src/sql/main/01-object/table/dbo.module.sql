-- MODULE
CREATE TABLE dbo.module (
  id INTEGER NOT NULL,
  name VARCHAR(45) NOT NULL,
  parent_id INTEGER,
  sort_order INTEGER DEFAULT 0,

  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT TRUE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(parent_id) REFERENCES dbo.module(id) ON DELETE SET NULL
);

INSERT
INTO dbo.module(id, name, parent_id, sort_order, is_external, is_internal, is_subscription, is_active)
VALUES
(1,'config',100,0,'0','1','0','1'),
(2,'setup',100,1,'0','1','0','1'),
(3,'account',101,2,'1','1','0','1'),
(4,'help',103,3,'1','1','0','1'),

(50,'calendar',102,4,'1','1','1','1'),
(51,'checkin',102,5,'1','1','1','1'),
(52,'todo',102,6,'1','1','1','1'),
(53,'checkout',102,7,'1','1','1','1'),

(100,'admin',null,null,null,null,null,'1'),
(101,'user',null,null,null,null,null,'1'),
(102,'solution',null,null,null,null,null,'1'),
(103,'resource',null,null,null,null,null,'1');