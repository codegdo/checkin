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
('10', 'allow'),
('11', 'deny'),
('12', 'read'),
('13', 'write'),
('14', 'create'),
('15', 'delete'),

-- Object
('20', 'allow'),
('21', 'deny'),
('22', 'read'),
('23', 'write'),

-- Field
('30', 'allow'),
('31', 'deny'),
('32', 'read'),
('33', 'write');

-- CREATE TABLE PERMISSION_LEVEL
CREATE TABLE IF NOT EXISTS sec.permission_level (
  permission_id INT NOT NULL,
  level_id INT NOT NULL,
  biz_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(permission_id, level_id),
  FOREIGN KEY(permission_id) REFERENCES sec.permission(id) ON DELETE SET NULL,
  FOREIGN KEY(level_id) REFERENCES sec.level(id) ON DELETE SET NULL
);

CREATE INDEX idx_permission_level ON sec.permission_level(permission_id, level_id);

INSERT
INTO sec.permission_level(permission_id, level_id)
VALUES
-- module
('1', '1'),
('1', '2'),
-- view
('2', '10'),
('2', '11'),
('2', '12'),
('2', '13'),
('2', '14'),
('2', '15'),
-- object
('3', '20'),
('3', '21'),
('3', '22'),
('3', '23'),
-- field
('4', '30'),
('4', '31'),
('4', '32'),
('4', '33');

-- SELECT TABLES

SELECT type, string_agg(name, ',') as access
FROM sec.permission p
LEFT JOIN sec.permission_level pl on p.id = pl.permission_id
LEFT JOIN sec.level l on l.id = pl.level_id
GROUP BY type;

-- DROP TABLES

DROP TABLE IF EXISTS
sec.permission,
sec.level,
sec.permission_level CASCADE;
