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
('200', 'Managers',     'grid', '0', '0', '1', '1'),
('201', 'Staffs',       'grid', '1', '0', '1', '1'),
('202', 'Clients',      'grid', '2', '0', '1', '1'),
('203', 'Roles',        'grid', '3', '0', '1', '1'),

('204', 'Languages',    'grid', '5', '0', '1', '1'),
('205', 'Locations',    'grid', '6', '0', '1', '1'),
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
('302', 'Subscription', 'form', '1', '1', '1', '1')
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
