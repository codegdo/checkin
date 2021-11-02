-- CREATE TABLE MODULE_TYPE
CREATE TABLE IF NOT EXISTS dbo.module_group (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.module_group(id, name)
VALUES
('1','admin'),
('2','solution'),
('3','user');

-- CREATE TABLE MODULE
CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  module_group_id INTEGER DEFAULT 0,

  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(module_group_id) REFERENCES dbo.module_group(id) ON DELETE SET NULL
);

INSERT
INTO dbo.module(id, name, sort_order, module_group_id, is_external, is_internal, is_subscription, is_active)
VALUES
('1', 'System',     '0', '1', '0', '0', '0', '1'),
('2', 'Setup',      '1', '1', '0', '1', '0', '1'),

('3', 'Account',    '2', '2', '1', '1', '0', '1'),
('4', 'Help',       '3', '2', '1', '1', '0', '1'),

('11', 'Checkin',   '11', '3', '1', '1', '1', '1'),
('12', 'Timeclock', '12', '3', '1', '1', '1', '1'),
('13', 'POS',       '13', '3', '1', '1', '1', '1'),
('14', 'Marketing', '14', '3', '1', '1', '1', '1');

-- CREATE TABLE MODULE_PAGE
CREATE TABLE IF NOT EXISTS dbo.module_page (
  module_id INT NOT NULL,
  page_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(module_id, page_id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE,
  FOREIGN KEY(page_id) REFERENCES dbo.page(id) ON DELETE CASCADE
);
CREATE INDEX idx_module_page ON dbo.module_page(module_id, page_id);

INSERT
INTO dbo.module_page(module_id, page_id, org_id)
VALUES
--Admin
('2', '200', null),
('2', '201', null),
('2', '202', null),
('2', '203', null),
('2', '204', null),
('2', '205', null),
('2', '206', null),
('2', '207', null),
('2', '208', null),
('2', '209', null),
('2', '210', null),
('2', '211', null),
('2', '212', null),
('2', '213', null),
--Account
('3', '300', null),
('3', '301', null),
--Help
('4', '400', null),
('4', '401', null),
--Checkin
('11', '1100', null),
('11', '1101', null),
--Timeclock
('12', '1200', null),
('12', '1201', null),
--POS
('13', '1300', null),
('13', '1301', null),
--Marketing
('14', '1400', null),
('14', '1401', null),
('14', '1402', null);