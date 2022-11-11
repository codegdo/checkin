-- MODULE_FEATURE
CREATE TABLE dbo.module_feature (
  module_id integer not null,
  feature_id integer not null,
  company_id integer,
  created_at timestamp default current_timestamp,
  --
  primary key (module_id, feature_id),
  foreign key (module_id) references dbo.module(id) on delete set null,
  foreign key (feature_id) references dbo.feature(id) on delete set null
);

CREATE INDEX idx_module_feature on dbo.module_feature(module_id, feature_id);

INSERT INTO dbo.module_feature(module_id, feature_id, company_id) VALUES
(50, 6, null),
(51, 6, null),
(52, 6, null),
(53, 6, null);