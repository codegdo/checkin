-- CREATE TABLE OBJECT
CREATE TABLE IF NOT EXISTS dbo.object (
  id SERIAL,
  name VARCHAR(95),

  is_external BOOLEAN DEFAULT TRUE,
  is_internal BOOLEAN DEFAULT TRUE,
  
  is_custom BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.object(id, name, is_external, is_internal, is_custom)
VALUES
--
('1', 'user',          '1', '1', '1'),
('2', 'contact',       '1', '1', '1'),
('3', 'client',        '1', '1', '1'),
('4', 'group',         '1', '1', '1'),
('5', 'policy',        '1', '1', '1'),
('6', 'language',      '1', '1', '1'),
('7', 'location',      '1', '1', '1'),
('8', 'service',       '1', '1', '1'),
('9', 'price',         '1', '1', '1'),
('10', 'form',         '1', '1', '1'),
('11', 'template',     '1', '1', '1'),
('12', 'calendar',     '1', '1', '1'),
('13', 'checkin',      '1', '1', '1'),
('14', 'todo',         '1', '1', '1'),
('15', 'checkout',     '1', '1', '1'),
('16', 'organization', '1', '1', '1'),
('17', 'subscription', '1', '1', '1'),
('18', 'appointment',  '1', '1', '1'),
('19', 'booking',      '1', '1', '1'),
('20', 'task',         '1', '1', '1'),
('21', 'order',        '1', '1', '1');