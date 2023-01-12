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
(1,'client',null,null,null,'1'),
(2,'iam',null,null,null,'1'),
(3,'account',null,null,null,'1'),
(4,'help',null,null,null,'1'),
(5,'marketing',null,null,null,'1'),
(6,'config',null,null,null,'1'),
(7,'booking',null,null,null,'1'),
(8,'checkin',null,null,null,'1'),
(9,'checkout',null,null,null,'1'),
(10,'review',null,null,null,'1'),
(11,'report',null,null,null,'1'),

(100,'dashboard',1,'0','0','1'),

(200,'users',2,'0','1','1'),
(201,'groups',2,'0','1','1'),
(202,'roles',2,'0','1','1'),
(203,'policies',2,'0','1','1'),
(204,'permissions',2,'0','1','1'),

(300,'profile',3,'1','1','1'),
(301,'subscription',3,'0','1','1'),

(400,'supports',4,'0','1','1'),
(401,'feedbacks',4,'0','1','1'),

(500,'promotions',5,'0','1','1'),
(501,'reviews',5,'0','1','1'),
(502,'rewards',5,'0','1','1'),

(600,'services',6,'0','1','1'),
(601,'products',6,'0','1','1'),
(602,'business',6,'0','1','1'),
(603,'application',6,'0','1','1'),
(604,'employees',6,'0','1','1'),

(700,'appointments',7,'0','1','1'),
(701,'calendar',7,'1','1','1'),

(800,'customers',8,'0','1','1'),
(801,'employees',8,'0','1','1'),

(900,'orders',9,'0','1','1'),
(901,'tickets',9,'0','1','1'),
(902,'payments',9,'0','1','1'),

(1000,'google+',10,'0','1','1'),
(1001,'yelps',10,'0','1','1'),
(1002,'comments',10,'0','1','1'),

(1100,'incomes',11,'0','1','1'),
(1101,'orders',11,'0','1','1'),
(1102,'payrolls',11,'0','1','1'),
(1103,'sales',11,'0','1','1'),
(1104,'timeclock',11,'0','1','1'),
(1105,'employee',11,'1','1','1');

(1000,'sys',null,null,null,'1'),
(1001,'app',null,null,null,'1'),
(1002,'pos',null,null,null,'1'),
(1003,'crm',null,null,null,'1');





