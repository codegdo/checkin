-- VIEW_OBJECT
CREATE TABLE "main.dbo".view_object (
  view_id integer not null,
  object_id integer not null,
  company_id integer,
  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (view_id, object_id),
  foreign key (view_id) references "main.dbo".view(id) on delete set null,
  foreign key (object_id) references "main.dbo".object(id) on delete set null 
);

CREATE INDEX idx_view_object on "main.dbo".view_object(view_id, object_id);

INSERT INTO "main.dbo".view_object(view_id, object_id, company_id) VALUES
(100,4,null),
(101,5,null),
(102,6,null),
(103,7,null),
(104,8,null),

(200,4,null),
(201,4,null),

(300,4,null),
(301,4,null),

(400,4,null),
(401,4,null),
(402,4,null),

(500,4,null),
(501,4,null),
(502,4,null),
(503,4,null),
(504,4,null),

(600,4,null),
(601,4,null),

(700,4,null),
(701,4,null),

(800,4,null),
(801,4,null),
(802,4,null),

(900,4,null),
(901,4,null),
(902,4,null),

(1000,4,null),
(1001,4,null),
(1002,4,null),
(1003,4,null),
(1004,4,null),
(1005,4,null),

(8000,4,null);