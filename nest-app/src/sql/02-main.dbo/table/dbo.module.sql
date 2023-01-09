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

INSERT INTO "mail.dbo".module(id, name, parent_id, is_external, is_internal, is_subscription, is_active) VALUES
(1,'client',1000,'0','0','0','1'),
(2,'iam',1001,'0','1','0','1'),
(3,'account',1002,'1','1','0','1'),
(4,'help',1002,'0','1','0','1'),
(5,'marketing',1003,'0','1','0','1'),
(6,'config',1003,'0','1','0','1'),

(50,'booking',1004,'1','1','1','1'),
(51,'checkin',1004,'1','1','1','1'),
(52,'checkout',1004,'0','1','1','1'),
(53,'review',1004,'0','1','1','1'),
(54,'report',1004,'1','1','1','1'),

(1000,'system',null,null,null,null,'1'),
(1001,'admin',null,null,null,null,'1'),
(1002,'user',null,null,null,null,'1'),
(1003,'setting',null,null,null,null,'1'),
(1004,'pos',null,null,null,null,'1');


