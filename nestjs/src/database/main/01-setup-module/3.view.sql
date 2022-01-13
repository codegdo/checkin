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