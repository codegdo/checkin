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
('1', 'allow'),
('2', 'deny'),
-- View
('11', 'read'),
('12', 'write'),
('13', 'create'),
('14', 'delete'),
('15', 'all'),
-- Object
('21', 'read'),
('22', 'write'),
('23', 'all'),
-- Field
('31', 'read'),
('32', 'write'),
('33', 'all');