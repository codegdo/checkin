-- MODULE_VIEW
CREATE TABLE main_dbo.module_view (
  module_id int NOT NULL,
  view_id int NOT NULL,
  company_id int,

  PRIMARY KEY (module_id, view_id),
  FOREIGN KEY (module_id) REFERENCES main_dbo.module(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (view_id) REFERENCES main_dbo.view(id) ON DELETE SET NULL ON UPDATE CASCADE
);

CREATE TABLE main_dbo.module_view (
  module_id integer not null,
  view_id integer not null,
  company_id integer,
  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (module_id, view_id),
  foreign key (module_id) references main_dbo.module(id) on delete set null,
  foreign key (view_id) references main_dbo.view(id) on delete set null
);

CREATE INDEX idx_module_view on main_dbo.module_view(module_id, view_id);

INSERT INTO main_dbo.module_view(module_id, view_id, company_id) VALUES
(1,1,null),
(2,10,null),
(2,11,null),
(3,20,null),
(4,30,null),
(4,31,null),
(4,32,null),

(20,50,null),
(20,51,null),
(20,52,null),
(20,53,null),
(20,54,null),
(21,60,null),
(21,61,null),
(22,70,null),
(22,71,null),
(23,80,null),
(23,81,null),
(23,82,null),
(23,83,null),

(40,100,null),
(40,101,null),
(41,110,null),
(41,111,null),
(42,120,null),
(42,121,null),
(42,122,null),
(43,130,null),
(43,131,null),
(43,132,null),
(43,133,null),
(44,140,null),
(44,141,null),
(44,142,null),
(44,143,null),
(44,144,null),

(50,160,null),
(50,161,null),
(51,170,null),
(51,171,null),
(51,172,null),
(52,180,null),
(52,181,null),
(53,190,null),
(53,191,null),
(54,200,null),
(54,201,null),
(54,202,null),
(55,210,null),
(55,211,null),
(55,212,null);