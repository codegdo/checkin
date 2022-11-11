-- MODULE_VIEW
CREATE TABLE dbo.module_view (
  module_id integer not null,
  view_id integer not null,
  company_id integer,
  created_at timestamp default current_timestamp,
  --
  primary key (module_id, view_id),
  foreign key (module_id) references dbo.module(id) on delete set null,
  foreign key (view_id) references dbo.view(id) on delete set null
);

CREATE INDEX idx_module_view on dbo.module_view(module_id, view_id);

INSERT INTO dbo.module_view(module_id, view_id, company_id)
VALUES 
(1, 100, null),
(1, 101, null),
(1, 102, null),
(2, 200, null),
(2, 201, null),
(2, 202, null),
(2, 203, null),
(2, 204, null),
(2, 205, null),
(2, 206, null),
(2, 207, null),
(2, 208, null),
(2, 209, null),
(2, 210, null),
(2, 211, null),
(2, 212, null),
(2, 213, null),
(2, 214, null),
(2, 215, null),
(3, 300, null),
(3, 301, null),
(3, 302, null),
(4, 400, null),
(4, 401, null),
(4, 402, null),
(50, 500, null),
(51, 510, null),
(52, 520, null),
(53, 530, null);