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
  parent_id INT REFERENCES dbo.module(id) ON DELETE SET NULL,
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
('4', 'help', '104', '3', '1', '1', '0', '1'),

('50', 'calendar', '103', '4', '1', '1', '1', '1'),
('51', 'checkin', '103', '5', '1', '1', '1', '1'),
('52', 'todo', '103', '6', '1', '1', '1', '1'),
('53', 'checkout', '103', '7', '1', '1', '1', '1'),

-- grouping
('100', 'system', null, null, null, null, null, '1'),
('101', 'admin', null, null, null, null, null, '1'),
('102', 'user', null, null, null, null, null, '1'),
('103', 'solution', null, null, null, null, null, '1'),
('104', 'resource', null, null, null, null, null, '1');

-- CREATE TABLE VIEW
CREATE TABLE IF NOT EXISTS dbo.view (
  id SERIAL,
  name VARCHAR(95) NOT NULL,
  type VARCHAR(45) CHECK(type in ('grid', 'form', 'null')),
  parent_id INT REFERENCES dbo.view(id) ON DELETE SET NULL,
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
-- grouping
('10', 'config',         'null', null, '0', '1', '1', '1'),
('20', 'setup',          'null', null, '0', '1', '1', '1'),
('30', 'account',        'null', null, '0', '1', '1', '1'),
('40', 'help',           'null', null, '0', '1', '1', '1'),
('50', 'calendar',       'null', null, '0', '1', '1', '1'),
('60', 'checkin',        'null', null, '0', '1', '1', '1'),
('70', 'todo',           'null', null, '0', '1', '1', '1'),
('80', 'checkout',       'null', null, '0', '1', '1', '1'),

--setup
('200', 'users',        'grid', '20', '0', '0', '1', '1'),
('201', 'clients',      'grid', '20', '1', '0', '1', '1'),
('202', 'roles',        'grid', '20', '2', '0', '1', '1'),
('203', 'policies',     'grid', '20', '2', '0', '1', '1'),

('204', 'languages',    'grid', '20', '3', '0', '1', '1'),
('205', 'locations',    'grid', '20', '4', '0', '1', '1'),
('206', 'services',     'grid', '20', '5', '0', '1', '1'),
('207', 'prices',       'grid', '20', '6', '0', '1', '1'),

('208', 'forms',        'grid', '20', '7', '0', '1', '1'),
('209', 'templates',    'grid', '20', '8', '0', '1', '1'),

('210', 'calendars',    'grid', '20', '9', '0', '1', '1'),
('211', 'checkins',     'grid', '20', '10', '0', '1', '1'),
('212', 'todos',        'grid', '20', '11', '0', '1', '1'),
('213', 'checkouts',    'grid', '20', '12', '0', '1', '1'),
--account
('300', 'profile',      'form', '30', '0', '1', '1', '1'),
('301', 'organization', 'form', '30', '1', '1', '1', '1'),
('302', 'subscription', 'form', '30', '2', '1', '1', '1'),
--help
('400', 'supports',     'grid', '40', '0', '1', '1', '1'),
('401', 'guides',       'grid', '40', '1', '1', '1', '1'),

--calendar
('1100', 'appointments',  'grid', '50', '0', '1', '1', '1'),
--checkin
('1200', 'bookings',      'grid', '60', '0', '1', '1', '1'),
--todo
('1300', 'tasks',         'grid', '70', '0', '1', '1', '1'),
--checkout
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
('1', 'user',          '1', '1', '1'),
('2', 'contact',       '1', '1', '1'),
('3', 'client',        '1', '1', '1'),
('4', 'role',          '1', '1', '1'),
('5', 'policy',        '1', '1', '1'),
('6', 'language',      '1', '1', '1'),
('7', 'location',      '1', '1', '1'),
('8', 'service',       '1', '1', '1'),
('9', 'price',         '1', '1', '1'),
('10', 'form',          '1', '1', '1'),
('11', 'template',     '1', '1', '1'),
('12', 'calendar',     '1', '1', '1'),
('13', 'checkin',      '1', '1', '1'),
('14', 'todo',         '1', '1', '1'),
('15', 'checkout',     '1', '1', '1'),
('16', 'organization', '1', '1', '1'),
('17', 'subscription', '1', '1', '1'),
('18', 'appointment',  '1', '1', '1'),
('19', 'booking',      '1', '1', '1'),
('20', 'task',         '1', '1', '1'),
('21', 'order',        '1', '1', '1');

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
--calendar
('1', '50', null),
('2', '50', null),
('3', '50', null),
('4', '50', null),
('5', '50', null),
('6', '50', null),
('7', '50', null),
('8', '50', null),
('9', '50', null),
--checkin
('1', '51', null),
('2', '51', null),
('3', '51', null),
('4', '51', null),
('5', '51', null),
('6', '51', null),
('7', '51', null),
('8', '51', null),
('9', '51', null),
--todo
('2', '52', null),
('5', '52', null),
('6', '52', null),
('7', '52', null),
('8', '52', null),
('9', '52', null),
--checkout
('1', '53', null),
('2', '53', null),
('3', '53', null),
('4', '53', null);

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
--setup
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
--account
('3', '300', null),
('3', '301', null),
('3', '302', null),
--help
('4', '400', null),
('4', '401', null),
--calendar
('50', '1100', null),
--checkin
('51', '1200', null),
--todo
('52', '1300', null),
--checkout
('53', '1400', null);

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
--users
('200', '1', null),
('200', '2', null),
--clients
('201', '3', null),
--roles
('202', '4', null),
--policies
('203', '5', null),
--language
('204', '6', null),
--location
('205', '7', null),
--service
('206', '8', null),
--price
('207', '9', null),
--form
('208', '10', null),
--template
('209', '11', null),
--calendar
('210', '12', null),
--checkin
('211', '13', null),
--todo
('212', '14', null),
--checkout
('213', '15', null),

--profile
('300', '1', null),
('300', '2', null),
--organization
('301', '16', null),
--subscription
('302', '17', null),

--support
('400', '1', null),
--guide
('401', '1', null),

--appointment
('1100', '18', null),
--booking
('1200', '19', null),
--task
('1300', '20', null),
--order
('1400', '21', null);

-- DROP TABLES

DROP TABLE IF EXISTS
dbo.feature,
dbo.feature_module,
dbo.module,
dbo.module_view,
dbo.view,
dbo.view_object,
dbo.object CASCADE;

