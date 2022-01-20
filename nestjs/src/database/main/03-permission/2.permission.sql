-- CREATE TYPE TP_PERMISSION_ENUM
CREATE TYPE sec.tp_permission_enum AS enum ('module', 'view', 'object', 'field');

-- CREATE TABLE PERMISSION
CREATE TABLE IF NOT EXISTS sec.permission (
  id SERIAL NOT NULL,
  type VARCHAR(45) CHECK(type in ('module', 'view', 'object', 'field')) NOT NULL,

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