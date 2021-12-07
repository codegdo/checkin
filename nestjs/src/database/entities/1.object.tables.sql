-- INSTALL EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE ERROR
CREATE TABLE IF NOT EXISTS log.error (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,

    message VARCHAR(255),
    host VARCHAR(45),
    url VARCHAR(45),
    stack TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --
    PRIMARY KEY(id)
);

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
('5', 'Customize Templates', '100'),
('6', 'Customize Forms', '100'),
('7', 'Customize Reports', '100'),
('8', 'Customize Rules', '100'),
('9', 'Notifications', '100');

-- CREATE TABLE MODULE_GROUP
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
INTO dbo.page(id, name, type, sort_order, is_external, is_internal, is_active)
VALUES
--Setup
('200', 'Managers',     'view', '0', '0', '1', '1'),
('201', 'Staffs',       'view', '1', '0', '1', '1'),
('202', 'Clients',      'view', '2', '0', '1', '1'),
('203', 'Roles',        'view', '3', '0', '1', '1'),

('204', 'Languages',    'view', '5', '0', '1', '1'),
('205', 'Locations',    'view', '6', '0', '1', '1'),
('206', 'Services',     'view', '7', '0', '1', '1'),
('207', 'Prices',       'view', '8', '0', '1', '1'),

('208', 'Forms',        'view', '9', '0', '1', '1'),
('209', 'Templates',    'view', '10', '0', '1', '1'),

('210', 'Checkin',      'view', '12', '0', '1', '1'),
('211', 'Timeclock',    'view', '13', '0', '1', '1'),
('212', 'POS',          'view', '14', '0', '1', '1'),
('213', 'Marketing',    'view', '15', '0', '1', '1'),
--Account
('300', 'Profile',      'form', '0', '1', '1', '1'),
('301', 'Subscription', 'form', '1', '1', '1', '1'),
--Help
('400', 'Supports',     'view', '0', '1', '1', '1'),
('401', 'Guides',       'view', '1', '1', '1', '1'),
--Checkin
('1100', 'Dashboard',   'view', '0', '1', '1', '1'),
('1101', 'Calendar',    'view', '1', '1', '1', '1'),
('1102', 'Bookings',    'view', '2', '1', '1', '1'),
--Timeclock
('1200', 'Dashboard',   'view', '0', '1', '1', '1'),
('1201', 'Tasks',       'view', '1', '1', '1', '1'),
--POS
('1300', 'Dashboard',   'view', '0', '1', '1', '1'),
('1301', 'Orders',      'view', '1', '1', '1', '1'),
--Marketing
('1400', 'Reminder',    'view', '0', '1', '1', '1'),
('1401', 'Reward',      'view', '1', '1', '1', '1'),
('1402', 'Reviews',     'view', '2', '1', '1', '1');

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

INSERT
INTO dbo.page_object(page_id, object_id, org_id)
VALUES
--Manager
('200', '1', null),
('200', '2', null);

-- CREATE INDEX
CREATE INDEX idx_module_page ON dbo.module_page(module_id, page_id);
CREATE INDEX idx_page_object ON dbo.page_object(page_id, object_id);

-------------------------------------------------------------------------
-- END ------------------------------------------------------------------
-------------------------------------------------------------------------

-- SELECT
SELECT * FROM dbo.feature;
SELECT * FROM dbo.feature_module;
SELECT * FROM dbo.module;
SELECT * FROM dbo.module_page;
SELECT * FROM dbo.page;
SELECT * FROM dbo.page_object;
SELECT * FROM dbo.object;
SELECT * FROM dbo.field;


-- DROP
DROP TABLE IF EXISTS
log.error,
dbo.feature,
dbo.feature_module,
dbo.module_group,
dbo.module,
dbo.module_page,
dbo.page,
dbo.page_object,
dbo.object,
dbo.field,
dbo.plan
CASCADE;
