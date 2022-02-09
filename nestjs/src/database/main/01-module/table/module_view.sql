-- CREATE TABLE MODULE_VIEW
CREATE TABLE IF NOT EXISTS dbo.module_view (
  module_id INT NOT NULL,
  view_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(module_id, view_id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL,
  FOREIGN KEY(view_id) REFERENCES dbo.view(id) ON DELETE SET NULL
);
CREATE INDEX idx_module_view ON dbo.module_view(module_id, view_id);

INSERT
INTO dbo.module_view(module_id, view_id, org_id)
VALUES
--setup
('2', '200', null),
('2', '201', null),
('2', '202', null),
('2', '203', null),
('2', '204', null),
('2', '205', null),
('2', '206', null),
('2', '207', null),
('2', '208', null),
('2', '209', null),
('2', '210', null),
('2', '211', null),
('2', '212', null),
--account
('3', '300', null),
('3', '301', null),
('3', '302', null),
--help
('4', '400', null),
('4', '401', null),
--calendar
('50', '1100', null),
--checkin
('51', '1200', null),
--todo
('52', '1300', null),
--checkout
('53', '1400', null);