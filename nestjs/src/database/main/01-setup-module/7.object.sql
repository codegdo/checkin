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
('1', 'user',         '1', '1', '1'),
('2', 'contact',      '1', '1', '1'),
('3', 'workspace',    '1', '1', '1'),
('4', 'organization', '1', '0', '1');