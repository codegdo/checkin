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
('202', 'groups',        'grid', '20', '2', '0', '1', '1'),
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
('301', 'organization', 'form', '30', '1', '0', '1', '1'),
('302', 'subscription', 'form', '30', '2', '0', '1', '1'),
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