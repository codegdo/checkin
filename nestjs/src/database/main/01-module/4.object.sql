-- CREATE TABLE OBJECT
CREATE TABLE IF NOT EXISTS dbo.object (
  id SERIAL,
  name VARCHAR(95),

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
INTO dbo.object(id, name, is_external, is_internal, is_active)
VALUES
--
('1', 'user',          '1', '1', '1'),
('2', 'contact',       '1', '1', '1'),
('3', 'client',        '1', '1', '1'),
('4', 'role',          '1', '1', '1'),
('5', 'language',      '1', '1', '1'),
('6', 'workspace',     '1', '1', '1'),
('7', 'service',       '1', '1', '1'),
('8', 'price',         '1', '1', '1'),
('9', 'form',          '1', '1', '1'),
('10', 'template',     '1', '1', '1'),
('11', 'calendar',     '1', '1', '1'),
('12', 'checkin',      '1', '1', '1'),
('13', 'todo',         '1', '1', '1'),
('14', 'checkout',     '1', '1', '1'),
('15', 'organization', '1', '1', '1'),
('16', 'subscription', '1', '1', '1'),
('17', 'appointment',  '1', '1', '1'),
('18', 'booking',      '1', '1', '1'),
('19', 'task',         '1', '1', '1'),
('20', 'order',        '1', '1', '1');