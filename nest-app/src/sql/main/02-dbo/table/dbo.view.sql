-- VIEW
CREATE TABLE dbo.view (
  id integer not null,
  name varchar(45) not null,
  parent_id integer,

  is_external boolean default false,
  is_internal boolean default true,
  is_active boolean,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (id),
  foreign key (parent_id) references dbo.view(id) on delete set null 
);

INSERT INTO dbo.view(id, name, parent_id, is_external, is_internal, is_active) VALUES
(1,'manage',null,null,null,'1'),
(2,'setup',null,null,null,'1'),
(3,'account',null,null,null,'1'),
(4,'help',null,null,null,'1'),
(5,'calendar',null,null,null,'1'),
(6,'checkin',null,null,null,'1'),
(7,'todo',null,null,null,'1'),
(8,'checkout',null,null,null,'1'),

(100,'employees',1,'0','1','1'),
(101,'clients',1,'0','1','1'),
(102,'timeclock',1,'0','1','1'),

(200,'customers',2,'0','1','1'),
(201,'users',2,'0','1','1'),
(202,'groups',2,'0','1','1'),
(203,'policies',2,'0','1','1'),
(204,'languages',2,'0','1','1'),
(205,'locations',2,'0','1','1'),
(206,'services',2,'0','1','1'),
(207,'prices',2,'0','1','1'),
(208,'forms',2,'0','1','1'),
(209,'templates',2,'0','1','1'),
(210,'emails',2,'0','1','1'),
(211,'dashboards',2,'0','1','1'),
(212,'calendars',2,'0','1','1'),
(213,'checkins',2,'0','1','1'),
(214,'todos',2,'0','1','1'),
(215,'checkouts',2,'0','1','1'),

(300,'profile',3,'1','1','1'),
(301,'company',3,'0','1','1'),
(302,'subscription',3,'0','1','1'),

(400,'supports',4,'1','1','1'),
(401,'documents',4,'1','1','1'),
(402,'projects',4,'0','1','1'),

(500,'appointments',5,'1','1','1'),
(510,'bookings',6,'1','1','1'),
(520,'tasks',7,'1','1','1'),
(530,'orders',8,'1','1','1');






