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

-- CREATE TABLE MODULE
CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  group_name VARCHAR(45),
  sort_order INTEGER DEFAULT 0,

  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.module(id, name, group_name, sort_order, is_external, is_internal, is_subscription, is_active)
VALUES
('1', 'System', 'admin', '0', '0', '0', '0', '1'),
('2', 'Setup', 'admin', '1', '0', '1', '0', '1'),

('3', 'Account', 'profile', '2', '1', '1', '0', '1'),
('4', 'Help', 'profile', '3', '1', '1', '0', '1'),

('11', 'Calendar', 'service', '11', '1', '1', '1', '1'),
('12', 'Checkin', 'service', '12', '1', '1', '1', '1'),
('13', 'Todo', 'service', '13', '1', '1', '1', '1'),
('14', 'Checkout', 'service', '14', '1', '1', '1', '1');

-- CREATE TABLE VIEW
CREATE TABLE IF NOT EXISTS dbo.view (
  id SERIAL,
  name VARCHAR(95) NOT NULL,
  type VARCHAR(45) CHECK(type in ('grid', 'form')),
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
INTO dbo.view(id, name, type, sort_order, is_external, is_internal, is_active)
VALUES
--Setup
('200', 'Managers',     'grid', '0', '0', '1', '1'),
('201', 'Staffs',       'grid', '1', '0', '1', '1'),
('202', 'Clients',      'grid', '2', '0', '1', '1'),
('203', 'Roles',        'grid', '3', '0', '1', '1'),

('204', 'Languages',    'grid', '5', '0', '1', '1'),
('205', 'Workspaces',   'grid', '6', '0', '1', '1'),
('206', 'Services',     'grid', '7', '0', '1', '1'),
('207', 'Prices',       'grid', '8', '0', '1', '1'),

('208', 'Forms',        'grid', '9', '0', '1', '1'),
('209', 'Templates',    'grid', '10', '0', '1', '1'),

('210', 'Checkin',      'grid', '12', '0', '1', '1'),
('211', 'Timeclock',    'grid', '13', '0', '1', '1'),
('212', 'POS',          'grid', '14', '0', '1', '1'),
('213', 'Marketing',    'grid', '15', '0', '1', '1'),
--Account
('300', 'Profile',      'form', '0', '1', '1', '1'),
('301', 'Organization', 'form', '1', '1', '1', '1'),
('302', 'Subscription', 'form', '1', '1', '1', '1'),
--Help
('400', 'Supports',     'grid', '0', '1', '1', '1'),
('401', 'Guides',       'grid', '1', '1', '1', '1'),
--Calendar
('1100', 'Appointments',  'grid', '0', '1', '1', '1'),
--Checkin
('1200', 'Bookings',      'grid', '0', '1', '1', '1'),
--Todo
('1300', 'Tasks',         'grid', '0', '1', '1', '1'),
--Checkout
('1400', 'Orders',        'grid', '0', '1', '1', '1');

-- CREATE TABLE OBJECT
CREATE TABLE IF NOT EXISTS dbo.object (
  id SERIAL,
  name VARCHAR(95),

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
('1', 'user',         '1', '1', '1'),
('2', 'contact',      '1', '1', '1'),
('3', 'workspace',    '1', '1', '1'),
('4', 'organization', '1', '0', '1');

-- CREATE TABLE FEATURE_MODULE
CREATE TABLE IF NOT EXISTS dbo.feature_module (
  feature_id INT NOT NULL,
  module_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(feature_id, module_id),
  FOREIGN KEY(feature_id) REFERENCES dbo.feature(id) ON DELETE SET NULL,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE  SET NULL
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

-- CREATE TABLE MODULE_VIEW
CREATE TABLE IF NOT EXISTS dbo.module_view (
  module_id INT NOT NULL,
  view_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(module_id, view_id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL,
  FOREIGN KEY(view_id) REFERENCES dbo.view(id) ON DELETE SET NULL
);
CREATE INDEX idx_module_view ON dbo.module_view(module_id, view_id);

INSERT
INTO dbo.module_view(module_id, view_id, org_id)
VALUES
--Setup
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
--Calendar
('11', '1100', null),
--Checkin
('12', '1200', null),
--Todo
('13', '1300', null),
--Checkout
('14', '1400', null);

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

-- DROP TABLES

DROP TABLE IF EXISTS
dbo.feature,
dbo.feature_module,
dbo.module,
dbo.module_view,
dbo.view,
dbo.view_object,
dbo.object CASCADE ;

-- END

-- SELECT TABLES

SELECT * FROM dbo.module;

-- END