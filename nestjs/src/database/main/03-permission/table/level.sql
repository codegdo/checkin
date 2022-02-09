-- CREATE TABLE LEVEL
CREATE TABLE IF NOT EXISTS sec.level (
  id SERIAL NOT NULL,
  name VARCHAR(25) NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO sec.level(id, name)
VALUES
-- Module
('1', 'all'),
('2', 'deny'),

-- View
('10', 'all'),
('11', 'deny'),
('12', 'read'),
('13', 'write'),
('14', 'create'),
('15', 'delete'),

-- Object
('20', 'all'),
('21', 'deny'),
('22', 'read'),
('23', 'write'),

-- Field
('30', 'all'),
('31', 'deny'),
('32', 'read'),
('33', 'write');