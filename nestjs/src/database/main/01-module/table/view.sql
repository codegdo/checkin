-- CREATE TABLE VIEW
CREATE TABLE IF NOT EXISTS dbo.view (
  id SERIAL,
  name VARCHAR(95) NOT NULL,
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
INTO dbo.view(id, name, parent_id, sort_order, is_external, is_internal, is_active)
VALUES
-- grouping
(10, 'config',         null, '0', '1', '1', '1'),
(20, 'setup',          null, '0', '1', '1', '1'),
(30, 'account',        null, '0', '1', '1', '1'),
(40, 'help',           null, '0', '1', '1', '1'),
(50, 'calendar',       null, '0', '1', '1', '1'),
(60, 'checkin',        null, '0', '1', '1', '1'),
(70, 'todo',           null, '0', '1', '1', '1'),
(80, 'checkout',       null, '0', '1', '1', '1'),

--config
(100, 'internals',    '10', '0', '0', '0', '1'),
(101, 'gridviews',    '10', '0', '0', '1', '1'),

--setup
(200, 'users',        '20', '0', '0', '1', '1'),
(201, 'clients',      '20', '1', '0', '1', '1'),
(202, 'groups',       '20', '2', '0', '1', '1'),
(203, 'policies',     '20', '2', '0', '1', '1'),

(204, 'languages',    '20', '3', '0', '1', '1'),
(205, 'locations',    '20', '4', '0', '1', '1'),
(206, 'services',     '20', '5', '0', '1', '1'),
(207, 'prices',       '20', '6', '0', '1', '1'),

(208, 'forms',        '20', '7', '0', '1', '1'),
(209, 'templates',    '20', '8', '0', '1', '1'),

(210, 'calendars',    '20', '9', '0', '1', '1'),
(211, 'checkins',     '20', '10', '0', '1', '1'),
(212, 'todos',        '20', '11', '0', '1', '1'),
(213, 'checkouts',    '20', '12', '0', '1', '1'),
--account
(300, 'profile',      '30', '0', '1', '1', '1'),
(301, 'organization', '30', '1', '0', '1', '1'),
(302, 'subscription', '30', '2', '0', '1', '1'),
--help
(400, 'supports',     '40', '0', '1', '1', '1'),
(401, 'guides',       '40', '1', '1', '1', '1'),

--calendar
(1100, 'appointments',  '50', '0', '1', '1', '1'),
--checkin
(1200, 'bookings',      '60', '0', '1', '1', '1'),
--todo
(1300, 'tasks',         '70', '0', '1', '1', '1'),
--checkout
(1400, 'orders',        '80', '0', '1', '1', '1');



