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