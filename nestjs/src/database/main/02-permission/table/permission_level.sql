-- CREATE TABLE PERMISSION_LEVEL
CREATE TABLE IF NOT EXISTS sec.permission_level (
  permission_id INT NOT NULL,
  level_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(permission_id, level_id),
  FOREIGN KEY(permission_id) REFERENCES sec.permission(id) ON DELETE SET NULL,
  FOREIGN KEY(level_id) REFERENCES sec.level(id) ON DELETE SET NULL
);

CREATE INDEX idx_permission_level ON sec.permission_level(permission_id, level_id);

INSERT
INTO sec.permission_level(permission_id, level_id)
VALUES
-- module
('1', '1'),
('1', '2'),
-- view
('2', '10'),
('2', '11'),
('2', '12'),
('2', '13'),
('2', '14'),
('2', '15'),
-- object
('3', '20'),
('3', '21'),
('3', '22'),
('3', '23'),
-- field
('4', '30'),
('4', '31'),
('4', '32'),
('4', '33');