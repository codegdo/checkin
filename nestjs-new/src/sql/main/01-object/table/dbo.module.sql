-- MODULE
CREATE TABLE dbo.module (
  id integer not null,
  name varchar(45) not null,
  parent_id integer,

  is_external boolean default false,
  is_internal boolean default true,
  is_subscription boolean default false,
  is_active boolean default true,

  created_at timestamp default current_timestamp,
  updated_at timestamp,
  created_by varchar(45) default current_user,
  updated_by varchar(45),
  --
  primary key(id),
  foreign key(parent_id) references dbo.module(id) on delete set null
);

INSERT INTO dbo.module(id, name, parent_id, is_external, is_internal, is_subscription, is_active) VALUES
(1,'manage',100,'0','0','0','1'),
(2,'setup',101,'0','1','0','1'),
(3,'account',102,'1','1','0','1'),
(4,'help',104,'1','1','0','1'),

(50,'calendar',103,'1','1','1','1'),
(51,'checkin',103,'1','1','1','1'),
(52,'todo',103,'1','1','1','1'),
(53,'checkout',103,'1','1','1','1'),

(100,'system',null,null,null,null,'1'),
(101,'admin',null,null,null,null,'1'),
(102,'user',null,null,null,null,'1'),
(103,'solution',null,null,null,null,'1'),
(104,'resource',null,null,null,null,'1');


