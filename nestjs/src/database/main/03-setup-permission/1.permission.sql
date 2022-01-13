-- CREATE TABLE PERMISSION
CREATE TYPE dbo.permission_type_enum AS ENUM ('module', 'view', 'object', 'field');

CREATE TABLE IF NOT EXISTS sec.permission (
  id SERIAL NOT NULL,
  type dbo.permission_type_enum NOT NULL,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

INSERT
INTO sec.permission(id, type)
VALUES
('1', 'module'),
('2', 'view'),
('3', 'object'),
('4', 'field');