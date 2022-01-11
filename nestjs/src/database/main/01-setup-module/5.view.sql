-- CREATE TABLE VIEW
CREATE TABLE IF NOT EXISTS dbo.view (
  id SERIAL,
  name VARCHAR(95),
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
('200', 'managers',     'grid', '0', '0', '1', '1'),
('201', 'staffs',       'grid', '1', '0', '1', '1'),
('202', 'clients',      'grid', '2', '0', '1', '1'),
('203', 'roles',        'grid', '3', '0', '1', '1'),

('204', 'languages',    'grid', '5', '0', '1', '1'),
('205', 'workspaces',   'grid', '6', '0', '1', '1'),
('206', 'services',     'grid', '7', '0', '1', '1'),
('207', 'prices',       'grid', '8', '0', '1', '1'),

('208', 'forms',        'grid', '9', '0', '1', '1'),
('209', 'templates',    'grid', '10', '0', '1', '1'),

('210', 'calendars',      'grid', '12', '0', '1', '1'),
('211', 'checkins',    'grid', '13', '0', '1', '1'),
('212', 'todos',          'grid', '14', '0', '1', '1'),
('213', 'checkouts',    'grid', '15', '0', '1', '1'),
--Account
('300', 'profile',      'form', '0', '1', '1', '1'),
('301', 'organization', 'form', '1', '1', '1', '1'),
('302', 'subscription', 'form', '1', '1', '1', '1'),
--Help
('400', 'supports',     'grid', '0', '1', '1', '1'),
('401', 'guides',       'grid', '1', '1', '1', '1'),
--Calendar
('1100', 'appointments',  'grid', '0', '1', '1', '1'),
--Checkin
('1200', 'bookings',      'grid', '0', '1', '1', '1'),
--Todo
('1300', 'tasks',         'grid', '0', '1', '1', '1'),
--Checkout
('1400', 'orders',        'grid', '0', '1', '1', '1');
