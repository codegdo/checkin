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
(1,1,null),
(2,10,null),
(2,11,null),
(3,20,null),
(4,30,null),
(4,31,null),
(4,32,null),

(2,200,null),
(2,201,null),
(2,202,null),
(2,203,null),
(2,204,null),

(3,300,null),
(3,301,null),

(4,400,null),
(4,401,null),

(5,500,null),
(5,501,null),
(5,502,null),

(6,600,null),
(6,601,null),
(6,602,null),
(6,603,null),
(6,604,null),

(50,700,null),
(50,701,null),

(51,800,null),
(51,801,null),

(52,900,null),
(52,901,null),
(52,902,null),

(53,1000,null),
(53,1001,null),
(53,1002,null),

(54,1100,null),
(54,1101,null),
(54,1102,null),
(54,1103,null),
(54,1104,null),
(54,1105,null);