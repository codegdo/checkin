-- CREATE TABLE GRID_TYPE_OBJECT
CREATE TABLE IF NOT EXISTS dbo.grid_type_object (
  grid_type_id INT NOT NULL,
  object_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(grid_type_id, object_id),
  FOREIGN KEY(grid_type_id) REFERENCES dbo.grid_type(id) ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL
);

CREATE INDEX idx_grid_type_object  ON dbo.grid_type_object (grid_type_id, object_id);

INSERT
INTO dbo.grid_type_object(grid_type_id, object_id)
VALUES
--user_group_grid
('1', '4');