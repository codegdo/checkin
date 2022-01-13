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
  parent_id INT,
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
INTO dbo.module(id, name, parent_id, sort_order, is_external, is_internal, is_subscription, is_active)
VALUES

('1', 'config', '100', '0', '0', '0', '0', '1'),
('2', 'setup', '101', '1', '0', '1', '0', '1'),

('3', 'account', '102', '2', '1', '1', '0', '1'),
('4', 'help', '102', '3', '1', '1', '0', '1'),

('11', 'calendar', '103', '4', '1', '1', '1', '1'),
('12', 'checkin', '103', '5', '1', '1', '1', '1'),
('13', 'todo', '103', '6', '1', '1', '1', '1'),
('14', 'checkout', '103', '7', '1', '1', '1', '1'),

('100', 'system', null, null, '1', '1', '0', '1'),
('101', 'admin', null, null, '1', '1', '0', '1'),
('102', 'user', null, null, '1', '1', '0', '1'),
('103', 'service', null, null, '1', '1', '0', '1');

-- CREATE TABLE VIEW
CREATE TABLE IF NOT EXISTS dbo.view (
  id SERIAL,
  name VARCHAR(95) NOT NULL,
  type VARCHAR(45) CHECK(type in ('grid', 'form', 'null')),
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
INTO dbo.view(id, name, type, parent_id, sort_order, is_external, is_internal, is_active)
VALUES
('10', 'config',         'null', null, '0', '0', '1', '1'),
('20', 'setup',          'null', null, '0', '0', '1', '1'),
('30', 'account',        'null', null, '0', '0', '1', '1'),
('40', 'help',           'null', null, '0', '0', '1', '1'),
('50', 'calendar',       'null', null, '0', '0', '1', '1'),
('60', 'checkin',        'null', null, '0', '0', '1', '1'),
('70', 'todo',           'null', null, '0', '0', '1', '1'),
('80', 'checkout',       'null', null, '0', '0', '1', '1'),

--Setup
('200', 'users',        'grid', '20', '0', '0', '1', '1'),
('201', 'clients',      'grid', '20', '2', '0', '1', '1'),
('202', 'roles',        'grid', '20', '3', '0', '1', '1'),

('203', 'languages',    'grid', '20', '5', '0', '1', '1'),
('204', 'workspaces',   'grid', '20', '6', '0', '1', '1'),
('205', 'services',     'grid', '20', '7', '0', '1', '1'),
('206', 'prices',       'grid', '20', '8', '0', '1', '1'),

('207', 'forms',        'grid', '20', '9', '0', '1', '1'),
('208', 'templates',    'grid', '20', '10', '0', '1', '1'),

('209', 'calendars',    'grid', '20', '12', '0', '1', '1'),
('210', 'checkins',     'grid', '20', '13', '0', '1', '1'),
('211', 'todos',        'grid', '20', '14', '0', '1', '1'),
('212', 'checkouts',    'grid', '20', '15', '0', '1', '1'),
--Account
('300', 'profile',      'form', '30', '0', '1', '1', '1'),
('301', 'organization', 'form', '30', '1', '1', '1', '1'),
('302', 'subscription', 'form', '30', '1', '1', '1', '1'),
--Help
('400', 'supports',     'grid', '40', '0', '1', '1', '1'),
('401', 'guides',       'grid', '40', '1', '1', '1', '1'),
--Calendar
('1100', 'appointments',  'grid', '50', '0', '1', '1', '1'),
--Checkin
('1200', 'bookings',      'grid', '60', '0', '1', '1', '1'),
--Todo
('1300', 'tasks',         'grid', '70', '0', '1', '1', '1'),
--Checkout
('1400', 'orders',        'grid', '80', '0', '1', '1', '1');

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

CREATE INDEX idx_feature_module ON dbo.feature_module(feature_id, module_id);

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
--Account
('3', '300', null),
('3', '301', null),
('3', '302', null),
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
dbo.object CASCADE;

DROP TYPE IF EXISTS
dbo.role_type_enum;

-- END

-- SELECT TABLES

SELECT * FROM dbo.module;

-- END
