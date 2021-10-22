-- CREATE TABLE MODULE_TYPE
CREATE TABLE IF NOT EXISTS dbo.module_type (
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
INTO dbo.module_type(id, name)
VALUES
('1','admin'),
('2','solution'),
('3','user');

-- CREATE TABLE MODULE
CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  module_type_id INTEGER DEFAULT 0,

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
  FOREIGN KEY(module_type_id) REFERENCES dbo.module_type(id) ON DELETE SET NULL
);

INSERT
INTO dbo.module(id, name, sort_order, module_type_id, is_external, is_internal, is_subscription, is_active)
VALUES
('1', 'System',     '0', '1', '0', '0', '0', '1'),
('2', 'Setup',      '1', '1', '0', '1', '0', '1'),

('3', 'Account',    '2', '2', '1', '1', '0', '1'),
('4', 'Help',       '3', '2', '1', '1', '0', '1'),

('11', 'Checkin',   '11', '3', '1', '1', '1', '1'),
('12', 'Timeclock', '12', '3', '1', '1', '1', '1'),
('13', 'POS',       '13', '3', '1', '1', '1', '1'),
('14', 'Marketing', '14', '3', '1', '1', '1', '1');

-- CREATE TABLE FEATURE
CREATE TABLE IF NOT EXISTS dbo.feature (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  price NUMERIC(8,2),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.feature (id, name, price)
VALUES
('1', 'Analytics', '100'),
('2', 'Rewards', '100'),
('3', 'Reminders', '100'),
('4', 'Reviews', '100'),
('5', 'Refferals', '100'),

('6', 'Customize Templates', '100'),
('7', 'Customize Reports', '100'),
('8', 'Customize Rules', '100'),

('9', 'Appointment Booking', '100'),
('10', 'Walkin Booking', '100'),

('11', 'Staffs Assignment', '100'),
('12', 'Staffs Clockin', '100');

-- CREATE TABLE FEATURE_MODULE
CREATE TABLE IF NOT EXISTS dbo.feature_module (
  feature_id INT NOT NULL,
  module_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(feature_id, module_id),
  FOREIGN KEY(feature_id) REFERENCES dbo.feature(id) ON DELETE CASCADE,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE
);

INSERT
INTO dbo.feature_module(feature_id, module_id, org_id)
VALUES
('1', '11', null),
('2', '11', null),
('3', '11', null),
('4', '11', null),
('5', '11', null),
('6', '11', null),
('7', '11', null),
('8', '11', null),
('9', '11', null),
('1', '12', null),
('2', '12', null),
('3', '12', null),
('4', '12', null),
('5', '12', null),
('6', '12', null),
('7', '12', null),
('8', '12', null),
('9', '12', null),
('2', '13', null),
('5', '13', null),
('6', '13', null),
('7', '13', null),
('8', '13', null),
('9', '13', null),
('1', '14', null),
('2', '14', null),
('3', '14', null),
('4', '14', null);

-- CREATE TABLE PAGE
CREATE TABLE IF NOT EXISTS dbo.page (
  id SERIAL,
  name TEXT,
  type VARCHAR(45) CHECK(type in ('view', 'form')),
  parent_id INT,
  sort_order INTEGER DEFAULT 0,
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
INTO dbo.page(id, name, type, parent_id, sort_order, is_external, is_internal, is_active)
VALUES
--Setup
('200', 'Managers',     'view', null, '0', '1', '1', '1'),
('201', 'Staffs',       'view', null, '1', '1', '1', '1'),
('202', 'Clients',      'view', null, '2', '1', '1', '1'),
('203', 'Roles',        'view', null, '3', '1', '1', '1'),

('204', 'Languages',    'view', null, '5', '1', '1', '1'),
('205', 'Locations',    'view', null, '6', '1', '1', '1'),
('206', 'Services',     'view', null, '7', '1', '1', '1'),
('207', 'Prices',       'view', null, '8', '1', '1', '1'),

('208', 'Forms',        'view', null, '9', '1', '1', '1'),
('209', 'Templates',    'view', null, '10', '1', '1', '1'),

('210', 'Checkin',      'view', null, '12', '1', '1', '1'),
('211', 'Timeclock',    'view', null, '13', '1', '1', '1'),
('212', 'POS',          'view', null, '14', '1', '1', '1'),
('213', 'Marketing',    'view', null, '15', '1', '1', '1'),
--Account
('300', 'Profile',      'form', null, '0', '1', '1', '1'),
('301', 'Subscription', 'form', null, '1', '1', '1', '1'),
--Help
('400', 'Supports',     'view', null, '0', '1', '1', '1'),
('401', 'Guides',       'view', null, '1', '1', '1', '1'),
--Checkin
('1100', 'Dashboard',   'view', null, '0', '1', '1', '1'),
('1101', 'Calendar',    'view', null, '1', '1', '1', '1'),
('1102', 'Bookings',    'view', null, '2', '1', '1', '1'),
--Timeclock
('1200', 'Dashboard',   'view', null, '0', '1', '1', '1'),
('1201', 'Tasks',       'view', null, '1', '1', '1', '1'),
--POS
('1300', 'Dashboard',   'view', null, '0', '1', '1', '1'),
('1301', 'Orders',      'view', null, '1', '1', '1', '1'),
--Marketing
('1400', 'Reminder',    'view', null, '0', '1', '1', '1'),
('1401', 'Reward',      'view', null, '1', '1', '1', '1'),
('1402', 'Reviews',     'view', null, '2', '1', '1', '1');

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

-- SELECT
SELECT * FROM dbo.feature;
SELECT * FROM dbo.feature_module;
SELECT * FROM dbo.module_type;
SELECT * FROM dbo.module;
SELECT * FROM dbo.module_page;
SELECT * FROM dbo.page;

-- DROP
DROP TABLE IF EXISTS
dbo.feature,
dbo.feature_module,
dbo.module_type,
dbo.module,
dbo.module_page,
dbo.page
CASCADE;

DROP SEQUENCE IF EXISTS
dbo.module_group_id_seq,
dbo.module_id_seq,
dbo.page_id_seq
CASCADE;