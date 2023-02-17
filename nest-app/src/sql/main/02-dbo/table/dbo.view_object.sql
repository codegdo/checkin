-- VIEW_OBJECT
CREATE TABLE main_dbo.view_object (
  view_id int NOT NULL,
  object_id int NOT NULL,
  company_id int,
  --
  PRIMARY KEY (view_id, object_id),
  FOREIGN KEY (view_id) REFERENCES main_dbo.view(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES main_dbo.object(id) ON DELETE CASCADE
);


CREATE TABLE main_dbo.view_object (
  view_id integer not null,
  object_id integer not null,
  company_id integer,
  --
  primary key (view_id, object_id),
  foreign key (view_id) references main_dbo.view(id) on delete set null,
  foreign key (object_id) references main_dbo.object(id) on delete set null 
);

CREATE INDEX idx_view_object on main_dbo.view_object(view_id, object_id);

INSERT INTO main_dbo.view_object(view_id, object_id, company_id) VALUES
(1,4,null),
(10,4,null),
(11,4,null),
(20,4,null),
(30,4,null),
(31,4,null),
(32,4,null),

(50,4,null),
(50,5,null),
(50,6,null),
(50,7,null),
(50,8,null),
(51,4,null),
(52,4,null),
(53,4,null),
(54,4,null),

(60,4,null),
(61,4,null),

(70,4,null),
(71,4,null),

(80,4,null),
(81,4,null),
(82,4,null),
(83,4,null),

(100,4,null),
(101,4,null),

(110,4,null),
(111,4,null),

(120,4,null),
(121,4,null),
(122,4,null),

(130,4,null),
(131,4,null),
(132,4,null),
(133,4,null),

(140,4,null),
(141,4,null),
(142,4,null),
(143,4,null),
(144,4,null),

(160,4,null),
(161,4,null),

(170,4,null),
(171,4,null),
(172,4,null),

(180,4,null),
(181,4,null),

(190,4,null),
(191,4,null),

(200,4,null),
(201,4,null),
(202,4,null),

(210,4,null),
(211,4,null),
(212,4,null);