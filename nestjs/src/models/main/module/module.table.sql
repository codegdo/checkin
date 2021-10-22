-- CREATE TABLE MODULE_TYPE
CREATE TABLE IF NOT EXISTS dbo.module_type (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.module_type(id, name)
VALUES
('1','admin'),
('2','solution'),
('3','user');

-- CREATE TABLE MODULE
CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  module_type_id INTEGER DEFAULT 0,

  is_external BOOLEAN DEFAULT FALSE,
  is_internal BOOLEAN DEFAULT FALSE,
  is_subscription BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(module_type_id) REFERENCES dbo.module_type(id) ON DELETE SET NULL
);

INSERT
INTO dbo.module(id, name, sort_order, module_type_id, is_external, is_internal, is_subscription, is_active)
VALUES
('1', 'System',     '0', '1', '0', '0', '0', '1'),
('2', 'Setup',      '1', '1', '0', '1', '0', '1'),

('3', 'Account',    '2', '2', '1', '1', '0', '1'),
('4', 'Help',       '3', '2', '1', '1', '0', '1'),

('11', 'Checkin',   '11', '3', '1', '1', '1', '1'),
('12', 'Timeclock', '12', '3', '1', '1', '1', '1'),
('13', 'POS',       '13', '3', '1', '1', '1', '1'),
('14', 'Marketing', '14', '3', '1', '1', '1', '1');