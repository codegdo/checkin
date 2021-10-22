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