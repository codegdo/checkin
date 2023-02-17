-- OBJECT
CREATE TABLE main_dbo.object (
  id int PRIMARY KEY,
  name varchar(50) NOT NULL,

  is_external boolean DEFAULT FALSE,
  is_internal boolean DEFAULT TRUE,
  is_custom boolean DEFAULT FALSE,
  is_active boolean DEFAULT TRUE,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER
);

CREATE TABLE main_dbo.object (
  id integer not null ,
  name varchar(45) NOT NULL,

  is_external boolean default false,
  is_internal boolean default true,
  is_custom boolean default false,
  is_active boolean default true,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (id)
);

INSERT INTO main_dbo.object(id, name, is_external, is_internal, is_custom, is_active) VALUES
(1,'account','1','1','0','1'),
(2,'company','1','1','0','1'),
(3,'contact','1','1','0','1'),
(4,'user','1','1','0','1'),
(5,'group','1','1','0','1'),
(6,'role','1','1','0','1'),
(7,'policy','1','1','0','1'),
(8,'permission','1','1','0','1'),

(9,'customer','1','1','0','1'),
(10,'customer_group','1','1','0','1');


--id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL,
--OVERRIDING SYSTEM VALUE