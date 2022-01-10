-- CREATE TABLE VIEW_OBJECT
CREATE TABLE IF NOT EXISTS dbo.view_object (
  view_id INT NOT NULL,
  object_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(view_id, object_id),
  FOREIGN KEY(view_id) REFERENCES dbo.view(id) ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL
);

CREATE INDEX idx_view_object ON dbo.view_object(view_id, object_id);

INSERT
INTO dbo.view_object(view_id, object_id, org_id)
VALUES
--Manager
('200', '1', null),
('200', '2', null);