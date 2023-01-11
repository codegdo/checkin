-- MODULE_VIEW
CREATE TABLE "main.dbo".module_view (
  module_id integer not null,
  view_id integer not null,
  company_id integer,
  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (module_id, view_id),
  foreign key (module_id) references "main.dbo".module(id) on delete set null,
  foreign key (view_id) references "main.dbo".view(id) on delete set null
);

CREATE INDEX idx_module_view on "main.dbo".module_view(module_id, view_id);

INSERT INTO "main.dbo".module_view(module_id, view_id, company_id) VALUES
(1,100,null),

(10,200,null),
(10,201,null),
(10,202,null),
(10,203,null),
(10,204,null),

(20,300,null),
(20,301,null),

(21,400,null),
(21,401,null),

(30,500,null),
(30,501,null),
(30,502,null),

(31,600,null),
(31,601,null),
(31,602,null),
(31,603,null),
(31,604,null),

(40,700,null),
(40,701,null),

(41,800,null),
(41,801,null),

(42,900,null),
(42,901,null),
(42,902,null),

(43,1000,null),
(43,1001,null),
(43,1002,null),

(44,1100,null),
(44,1101,null),
(44,1102,null),
(44,1103,null),
(44,1104,null),
(44,1105,null);