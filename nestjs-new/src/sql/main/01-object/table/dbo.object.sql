-- OBJECT
CREATE TABLE dbo.object (
  id integer not null ,
  name varchar(45) NOT NULL,

  is_external boolean default false,
  is_internal boolean default true,
  is_custom boolean default false,
  is_active boolean default true,

  created_at timestamp default current_timestamp,
  updated_at timestamp,
  created_by varchar(45) default current_user,
  updated_by varchar(45),
  --
  primary key(id)
);

INSERT INTO dbo.object(id, name, is_external, is_internal, is_custom, is_active) VALUES
(1,'customer','1','1','0','1'),
(2,'account','1','1','0','1'),
(3,'user','1','1','0','1'),
(4,'company','1','1','0','1'),
(5,'location','1','1','0','1'),
(6,'contact','1','1','0','1'),
(7,'group','1','1','0','1'),
(8,'role','1','1','0','1'),
(9,'policy','1','1','0','1'),
(10,'language','1','1','0','1'),
(11,'subscription','0','1','0','1'),
(12,'service','1','1','0','1'),
(13,'price','1','1','0','1'),
(14,'form','1','1','0','1'),
(15,'template','1','1','0','1'),
(16,'email','1','1','0','1'),
(17,'dashboard','1','1','0','1'),
(18,'appointment','1','1','0','1'),
(19,'booking','1','1','0','1'),
(20,'task','1','1','0','1'),
(21,'order','1','1','0','1'),
(22,'support','1','1','0','1'),
(23,'document','1','1','0','1'),
(24,'project','1','1','0','1'),
(25,'appointment','1','1','0','1'),
(26,'booking','1','1','0','1'),
(27,'task','1','1','0','1'),
(28,'order','1','1','0','1');


--id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL,
--OVERRIDING SYSTEM VALUE