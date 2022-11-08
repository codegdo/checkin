-- VIEW
CREATE TABLE dbo.view (
  id INTEGER NOT NULL,
  name VARCHAR(45) NOT NULL,
  parent_id INTEGER,
  sort_order INTEGER DEFAULT 0,

  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(parent_id) REFERENCES dbo.view(id) ON DELETE SET NULL
);

INSERT INTO dbo.view(id, name, parent_id, sort_order, is_external, is_internal, is_active) VALUES
(1,'manage',null,null,null,null,'1'),
(2,'setup',null,null,null,null,'1'),
(3,'account',null,null,null,null,'1'),
(4,'help',null,null,null,null,'1'),
(5,'calendar',null,null,null,null,'1'),
(6,'checkin',null,null,null,null,'1'),
(7,'todo',null,null,null,null,'1'),
(8,'checkout',null,null,null,null,'1'),

(100,'employees',1,0,'0','1','1'),
(101,'clients',1,1,'0','1','1'),
(102,'timeclock',1,1,'0','1','1'),

(200,'customers',2,0,'0','1','1'),
(201,'users',2,1,'0','1','1'),
(202,'groups',2,2,'0','1','1'),
(203,'policies',2,3,'0','1','1'),
(204,'languages',2,4,'0','1','1'),
(205,'locations',2,5,'0','1','1'),
(206,'services',2,6,'0','1','1'),
(207,'prices',2,7,'0','1','1'),
(208,'forms',2,8,'0','1','1'),
(209,'templates',2,9,'0','1','1'),
(210,'emails',2,10,'0','1','1'),
(211,'dashboards',2,11,'0','1','1'),
(212,'calendars',2,12,'0','1','1'),
(213,'checkins',2,13,'0','1','1'),
(214,'todos',2,14,'0','1','1'),
(215,'checkouts',2,15,'0','1','1'),

(300,'profile',3,0,'1','1','1'),
(301,'company',3,1,'0','1','1'),
(302,'subscription',3,2,'0','1','1'),

(400,'supports',4,0,'1','1','1'),
(401,'documents',4,1,'1','1','1'),
(402,'projects',4,2,'0','1','1'),

(500,'appointments',5,0,'1','1','1'),
(510,'bookings',6,0,'1','1','1'),
(520,'tasks',7,0,'1','1','1'),
(530,'orders',8,0,'1','1','1');




