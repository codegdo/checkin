-- CREATE TABLE PERMISSION
CREATE TYPE sec.permission_type_enum AS ENUM ('module', 'view', 'object', 'field');

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
INTO sec.level(id, type)
VALUES
-- Module
('1', 'allow'),
('2', 'deny'),
-- View
('11', 'read'),
('12', 'write'),
('13', 'create'),
('14', 'delete'),
('15', 'clone'),
-- Object
('21', 'read'),
('22', 'write'),
-- Field
('31', 'read'),
('32', 'write');

-- CREATE TABLE PERMISSION_LEVEL
CREATE TABLE IF NOT EXISTS sec.permission_level (
  permission_id INT NOT NULL,
  level_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(permission_id, level_id),
  FOREIGN KEY(permission_id) REFERENCES sec.permission(id) ON DELETE SET NULL,
  FOREIGN KEY(level_id) REFERENCES sec.level(id) ON DELETE SET NULL
);

CREATE INDEX idx_permission_level ON sec.permission_level(permission_id, level_id);

-- DROP TABLES

DROP TABLE IF EXISTS
sec.permission,
sec.level,
sec.permission_level CASCADE ;

-- END

DROP TYPE IF EXISTS
sec.permission_type_enum;