-- CREATE TABLE MODULE
CREATE TABLE IF NOT EXISTS dbo.module (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  group_name VARCHAR(45),
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
INTO dbo.module(id, name, group_name, sort_order, is_external, is_internal, is_subscription, is_active)
VALUES
('1', 'System', 'admin', '0', '0', '0', '0', '1'),
('2', 'Setup', 'admin', '1', '0', '1', '0', '1'),

('3', 'Account', 'profile', '2', '1', '1', '0', '1'),
('4', 'Help', 'profile', '3', '1', '1', '0', '1'),

('11', 'Calendar', 'service', '11', '1', '1', '1', '1'),
('12', 'Checkin', 'service', '12', '1', '1', '1', '1'),
('13', 'Todo', 'service', '13', '1', '1', '1', '1'),
('14', 'Checkout', 'service', '14', '1', '1', '1', '1');