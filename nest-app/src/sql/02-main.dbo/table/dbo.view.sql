-- VIEW
CREATE TABLE "main.dbo".view (
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
  foreign key (parent_id) references "main.dbo".view(id) on delete set null 
);

INSERT INTO "main.dbo".view(id, name, parent_id, is_external, is_internal, is_active) VALUES
(1,'iam',null,null,null,'1'),
(2,'account',null,null,null,'1'),
(3,'help',null,null,null,'1'),
(4,'marketing',null,null,null,'1'),
(5,'config',null,null,null,'1'),
(6,'booking',null,null,null,'1'),
(7,'checkin',null,null,null,'1'),
(8,'checkout',null,null,null,'1'),
(9,'review',null,null,null,'1'),
(10,'report',null,null,null,'1'),

(80,'client',null,null,null,'1'),

(100,'users',1,'0','1','1'),
(101,'groups',1,'0','1','1'),
(102,'roles',1,'0','1','1'),
(103,'policies',1,'0','1','1'),
(104,'permissions',1,'0','1','1'),

(200,'profile',2,'1','1','1'),
(201,'subscription',2,'0','1','1'),

(300,'supports',3,'0','1','1'),
(301,'feedbacks',3,'0','1','1'),

(400,'promotions',4,'0','1','1'),
(401,'reviews',4,'0','1','1'),
(402,'rewards',4,'0','1','1'),

(500,'services',5,'0','1','1'),
(501,'products',5,'0','1','1'),
(502,'business',5,'0','1','1'),
(503,'application',5,'0','1','1'),
(504,'employees',5,'0','1','1'),

(600,'appointments',6,'0','1','1'),
(601,'calendar',6,'1','1','1'),

(700,'customers',7,'0','1','1'),
(701,'employees',7,'0','1','1'),

(800,'orders',8,'0','1','1'),
(801,'tickets',8,'0','1','1'),
(802,'payments',8,'0','1','1'),

(900,'google+',9,'0','1','1'),
(901,'yelps',9,'0','1','1'),
(902,'comments',9,'0','1','1'),

(1000,'incomes',10,'0','1','1'),
(1001,'orders',10,'0','1','1'),
(1002,'payrolls',10,'0','1','1'),
(1003,'sales',10,'0','1','1'),
(1004,'timeclock',10,'0','1','1'),
(1005,'employee',10,'1','1','1'),

(8000,'client',80,'0','0','1');






