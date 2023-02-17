-- VIEW
CREATE TABLE main_dbo.view (
  id int PRIMARY KEY,
  name varchar(50) NOT NULL,
  parent_id int,

  is_external boolean DEFAULT false,
  is_internal boolean DEFAULT true,
  is_active boolean,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER
  --
  FOREIGN KEY (parent_id) REFERENCES main_dbo.view(id) ON DELETE SET NULL
);

CREATE TABLE main_dbo.view (
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
  foreign key (parent_id) references main_dbo.view(id) on delete set null 
);

INSERT INTO main_dbo.view(id, name, parent_id, is_external, is_internal, is_active) VALUES

(1,'clients',1000,'0','0','1'),

(10,'demos',1000,'0','0','1'),
(11,'trials',1000,'0','0','1'),

(20,'errors',1000,'0','0','1'),

(30,'emails',1000,'0','0','1'),
(31,'discounts',1000,'0','0','1'),
(32,'terms',1000,'0','0','1'),

(50,'users',1001,'0','1','1'),
(51,'groups',1001,'0','1','1'),
(52,'roles',1001,'0','1','1'),
(53,'policies',1001,'0','1','1'),
(54,'permissions',1001,'0','1','1'),

(60,'profile',1001,'1','1','1'),
(61,'subscription',1001,'0','1','1'),

(70,'supports',1001,'0','1','1'),
(71,'feedbacks',1001,'0','1','1'),

(80,'languages',1001,'0','1','1'),
(81,'themes',1001,'0','1','1'),
(82,'emails',1001,'0','1','1'),
(83,'terms',1001,'0','1','1'),

(100,'appointments',1002,'0','1','1'),
(101,'calendar',1002,'1','1','1'),

(110,'customers',1002,'0','1','1'),
(111,'staffs',1002,'0','1','1'),

(120,'orders',1002,'0','1','1'),
(121,'tickets',1002,'0','1','1'),
(122,'payments',1002,'0','1','1'),

(130,'incomes',1002,'0','1','1'),
(131,'payrolls',1002,'0','1','1'),
(132,'sales',1002,'0','1','1'),
(133,'staffs',1002,'1','1','1'),

(140,'products',1002,'0','1','1'),
(141,'services',1002,'0','1','1'),
(142,'staffs',1002,'0','1','1'),
(143,'schedules',1002,'0','1','1'),
(144,'taxes',1002,'0','1','1'),

(160,'memberships',1003,'0','1','1'),
(161,'customer-group',1003,'0','1','1'),

(170,'birthdays',1003,'0','1','1'),
(171,'new-customers',1003,'0','1','1'),
(172,'reminders',1003,'0','1','1'),

(180,'friends',1003,'1','1','1'),
(181,'groups',1003,'1','1','1'),

(190,'visits',1003,'0','1','1'),
(191,'referrals',1003,'0','1','1'),

(200,'google+',1003,'0','1','1'),
(201,'yelps',1003,'0','1','1'),
(202,'in-store',1003,'0','1','1'),

(210,'notifications',1003,'0','1','1'),
(211,'emails',1003,'0','1','1'),
(212,'ratings',1003,'0','1','1'),

(1000,'sys',null,null,null,'1'),
(1001,'app',null,null,null,'1'),
(1002,'pos',null,null,null,'1'),
(1003,'crm',null,null,null,'1');





