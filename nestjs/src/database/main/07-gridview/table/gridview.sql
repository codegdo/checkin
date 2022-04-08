-- CREATE TABLE GRIDVIEW
CREATE TABLE IF NOT EXISTS dbo.gridview (
  id SERIAL,
  name VARCHAR(255),
  with_paging INT DEFAULT 25,
  view_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(view_id) REFERENCES dbo.view(id) ON DELETE SET NULL
);

INSERT
INTO dbo.gridview (id, name)
VALUES
('1', 'setup_users');