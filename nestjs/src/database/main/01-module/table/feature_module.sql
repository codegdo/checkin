-- CREATE TABLE FEATURE_MODULE
CREATE TABLE IF NOT EXISTS dbo.feature_module (
  feature_id INT NOT NULL,
  module_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(feature_id, module_id),
  FOREIGN KEY(feature_id) REFERENCES dbo.feature(id) ON DELETE SET NULL,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE  SET NULL
);

CREATE INDEX idx_feature_module ON dbo.feature_module(feature_id, module_id);

INSERT
INTO dbo.feature_module(feature_id, module_id, org_id)
VALUES
--calendar
('1', '50', null),
('2', '50', null),
('3', '50', null),
('4', '50', null),
('5', '50', null),
('6', '50', null),
('7', '50', null),
('8', '50', null),
('9', '50', null),
--checkin
('1', '51', null),
('2', '51', null),
('3', '51', null),
('4', '51', null),
('5', '51', null),
('6', '51', null),
('7', '51', null),
('8', '51', null),
('9', '51', null),
--todo
('2', '52', null),
('5', '52', null),
('6', '52', null),
('7', '52', null),
('8', '52', null),
('9', '52', null),
--checkout
('1', '53', null),
('2', '53', null),
('3', '53', null),
('4', '53', null);
