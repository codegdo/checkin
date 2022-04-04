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

-- CREATE TABLE GRIDVIEW
CREATE TABLE IF NOT EXISTS org.gridview (
  id SERIAL,
  gridview_type_id INT,
  org_id INT,

  data JSONB NOT NULL DEFAULT '{}'::jsonb,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(gridview_type_id) REFERENCES dbo.gridview_type(id) ON DELETE SET NULL
);

INSERT
INTO org.gridview (gridview_type_id, org_id)
VALUES
(1, 1);

/* DROP TABLES

DROP TABLE IF EXISTS
dbo.gridview_type,
dbo.gridview_column,
org.gridview CASCADE;
*/




select
gc.id,
--gc.name,
gc.label,
--gc.type,
gc.sort_order,
--gc.data,
--gc.lookup,
gc.is_visible
--gc.is_config,
--gc.label_enable,
--gc.sort_order_enable,
--gc.is_visible_enable
from dbo.gridview_type gt
left join dbo.gridview_column gc ON gc.gridview_type_id = gt.id
where gt.id = 1;

select
gc.id,
gv.org_id 
from dbo.gridview_type gt
left join org.gridview gv on gv.gridview_type_id = gt.id
left join dbo.gridview_column gc ON gc.gridview_type_id = gt.id
where gt.id = 1;

select
gt.id,
gv.id gv_id,
gv.org_id
from dbo.gridview_type gt
left join org.gridview gv on gv.gridview_type_id = gt.id
where gv.org_id = 1 or gv.org_id is null;

