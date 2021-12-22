-- CREATE TABLE PAGE
CREATE TABLE IF NOT EXISTS dbo.page (
  id SERIAL,
  name VARCHAR(45),
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
('301', 'Organization', 'form', '1', '1', '1', '1'),
('302', 'Subscription', 'form', '1', '1', '1', '1')
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
CREATE INDEX idx_page_object ON dbo.page_object(page_id, object_id);

INSERT
INTO dbo.page_object(page_id, object_id, org_id)
VALUES
--Manager
('200', '1', null),
('200', '2', null);