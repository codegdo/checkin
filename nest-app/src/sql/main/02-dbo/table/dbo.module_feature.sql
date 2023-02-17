-- MODULE_FEATURE
CREATE TABLE main_dbo.module_feature (
  module_id int NOT NULL,
  feature_id int NOT NULL,
  company_id int,

  PRIMARY KEY (module_id, feature_id),
  FOREIGN KEY (module_id) REFERENCES main_dbo.module(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (feature_id) REFERENCES main_dbo.feature(id) ON DELETE SET NULL ON UPDATE CASCADE
);

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