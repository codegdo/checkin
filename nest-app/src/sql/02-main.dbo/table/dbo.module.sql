-- MODULE
CREATE TABLE "main.dbo".module (
  id integer not null,
  name varchar(45) not null,
  parent_id integer,

  is_external boolean default false,
  is_internal boolean default true,
  is_subscription boolean default false,
  is_active boolean default true,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (id),
  foreign key (parent_id) references "main.dbo".module(id) on delete set null
);

INSERT INTO "main.dbo".module(id, name, parent_id, is_external, is_internal, is_subscription, is_active) VALUES
(1,'client',100,'0','0','0','1'),

(10,'iam',101,'0','1','0','1'),

(20,'account',102,'1','1','0','1'),
(21,'help',102,'0','1','0','1'),

(30,'marketing',103,'0','1','0','1'),
(31,'config',103,'0','1','0','1'),

(40,'booking',104,'1','1','1','1'),
(41,'checkin',104,'1','1','1','1'),
(42,'checkout',104,'0','1','1','1'),
(43,'review',104,'0','1','1','1'),
(44,'report',104,'1','1','1','1'),

(100,'system',null,null,null,null,'1'),
(101,'admin',null,null,null,null,'1'),
(102,'user',null,null,null,null,'1'),
(103,'setting',null,null,null,null,'1'),
(104,'pos',null,null,null,null,'1');


