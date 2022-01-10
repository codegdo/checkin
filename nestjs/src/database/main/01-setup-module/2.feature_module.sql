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

INSERT
INTO dbo.feature_module(feature_id, module_id, org_id)
VALUES
('1', '11', null),
('2', '11', null),
('3', '11', null),
('4', '11', null),
('5', '11', null),
('6', '11', null),
('7', '11', null),
('8', '11', null),
('9', '11', null),

('1', '12', null),
('2', '12', null),
('3', '12', null),
('4', '12', null),
('5', '12', null),
('6', '12', null),
('7', '12', null),
('8', '12', null),
('9', '12', null),

('2', '13', null),
('5', '13', null),
('6', '13', null),
('7', '13', null),
('8', '13', null),
('9', '13', null),

('1', '14', null),
('2', '14', null),
('3', '14', null),
('4', '14', null);