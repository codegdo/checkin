-- CREATE TABLE GRIDVIEW_COLUMN
CREATE TABLE IF NOT EXISTS dbo.gridview_column (
  id SERIAL,
  name VARCHAR(255),
  label VARCHAR(255),
  type VARCHAR(15) CHECK(type in ('text', 'radio', 'checkbox', 'textarea', 'select')),
  sort_order INT,

  data JSONB,

  lookup VARCHAR(95),

  gridview_type_id INT,

  is_visible BOOLEAN DEFAULT TRUE,
  is_config BOOLEAN DEFAULT TRUE,
  
  label_enable BOOLEAN DEFAULT TRUE,
  sort_order_enable BOOLEAN DEFAULT TRUE,
  is_visible_enable BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.gridview_column (name, label, type, sort_order, gridview_type_id)
VALUES
--user=1
('username', 'username', 'text', 1, 1),
('firstName', 'First Name', 'text', 2, 1),
('lastName', 'Last Name', 'text', 3, 1),
('emailAddress', 'Email Address', 'text', 4, 1),
('phoneNumber', 'Phone Number', 'text', 5, 1),
('level', 'Level', 'text', 6, 1),
('group', 'Group', 'text', 7, 1),
('type', 'Type', 'text', 8, 1),
('isActive', 'Active', 'text', 9, 1);