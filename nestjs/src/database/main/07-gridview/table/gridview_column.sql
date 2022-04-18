-- CREATE TABLE GRIDVIEW_COLUMN
CREATE TABLE IF NOT EXISTS dbo.gridview_column (
  id SERIAL,
  name VARCHAR(255),
  label VARCHAR(255),
  type VARCHAR(15) CHECK(type in ('text', 'radio', 'checkbox', 'textarea', 'select')),
  sort_order INT,

  data JSONB,

  lookup VARCHAR(95),

  gridview_id INT,

  is_default BOOLEAN DEFAULT FALSE,
  is_search BOOLEAN DEFAULT TRUE,
  is_visible BOOLEAN DEFAULT TRUE,
  is_config BOOLEAN DEFAULT TRUE,
  
  label_enable BOOLEAN DEFAULT TRUE,
  sort_order_enable BOOLEAN DEFAULT TRUE,
  is_default_enable BOOLEAN DEFAULT TRUE,
  is_search_enable BOOLEAN DEFAULT TRUE,
  is_visible_enable BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(gridview_id) REFERENCES dbo.gridview(id) ON DELETE SET NULL
);

INSERT
INTO dbo.gridview_column (name, label, type, sort_order, gridview_id, is_config, is_default, is_search, is_visible)
VALUES
--user=1
('id', 'Id', 'text', 0, 1, '0', '0', '0', '1'),
('username', 'Username', 'text', 1, 1, '1', '1', '1', '1'),
('firstName', 'First Name', 'text', 2, '1', '1', '0', '0', '1'),
('lastName', 'Last Name', 'text', 3, '1', '1', '0', '0', '1'),
('emailAddress', 'Email Address', 'text', 4, '1', '1', '0', '0', '1'),
('phoneNumber', 'Phone Number', 'text', 5, '1', '1', '0', '0', '1'),
('level', 'Level', 'text', 6, '1', '1', '0', '0', '1'),
('group', 'Group', 'text', 7, '1', '1', '0', '0', '1'),
('type', 'Type', 'text', 8, '1', '1', '0', '0', '1'),
('isActive', 'Active', 'text', 9, '1', '1', '0', '0', '1');