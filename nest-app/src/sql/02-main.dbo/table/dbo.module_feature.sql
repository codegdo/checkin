-- MODULE_FEATURE
CREATE TABLE main_dbo.module_feature (
  module_id integer not null,
  feature_id integer not null,
  company_id integer,
  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key (module_id, feature_id),
  foreign key (module_id) references main_dbo.module(id) on delete set null,
  foreign key (feature_id) references main_dbo.feature(id) on delete set null
);

CREATE INDEX idx_module_feature on main_dbo.module_feature(module_id, feature_id);

INSERT INTO main_dbo.module_feature(module_id, feature_id, company_id) VALUES
(20,1,null),
(20,2,null),
(20,3,null);