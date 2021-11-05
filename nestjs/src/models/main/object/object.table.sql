-- CREATE TABLE OBJECT
CREATE TABLE IF NOT EXISTS dbo.object (
  id SERIAL,
  name TEXT,

  is_external BOOLEAN DEFAULT TRUE,
  is_internal BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.object(id, name, is_external, is_internal, is_active)
VALUES
--
('1', 'User',        '1', '1', '1'),
('2', 'Employee',    '1', '1', '1');

-- CREATE TABLE PAGE_OBJECT
CREATE TABLE IF NOT EXISTS dbo.page_object (
  page_id INT NOT NULL,
  object_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(page_id, object_id),
  FOREIGN KEY(page_id) REFERENCES dbo.page(id) ON DELETE CASCADE,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE CASCADE
);
CREATE INDEX idx_page_object ON dbo.page_object(page_id, object_id);

INSERT
INTO dbo.page_object(page_id, object_id, org_id)
VALUES
--Manager
('200', '1', null),
('200', '2', null);