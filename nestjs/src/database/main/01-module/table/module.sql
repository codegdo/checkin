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