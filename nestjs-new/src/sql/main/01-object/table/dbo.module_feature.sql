-- MODULE_FEATURE
CREATE TABLE
  IF NOT EXISTS dbo.module_feature (
    module_id INTEGER NOT NULL,
    feature_id INTEGER NOT NULL,
    company_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --
    PRIMARY KEY(module_id, feature_id),
    FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE
    SET
      NULL,
      FOREIGN KEY(feature_id) REFERENCES dbo.feature(id) ON DELETE
    SET
      NULL
  );


CREATE INDEX idx_module_feature ON dbo.module_feature(module_id, feature_id);


INSERT INTO
  dbo.module_feature(module_id, feature_id, company_id)
VALUES
  (50, 6, null),
  (51, 6, null),
  (52, 6, null),
  (53, 6, null);