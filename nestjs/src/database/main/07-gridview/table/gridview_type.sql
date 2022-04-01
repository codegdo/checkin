-- CREATE TABLE GRIDVIEW_TYPE
CREATE TABLE IF NOT EXISTS dbo.gridview_type (
  id SERIAL,
  name VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.gridview_type (id, name)
VALUES
('1', 'setup_users');