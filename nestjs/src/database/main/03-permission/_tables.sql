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
-- module
('1', 'allow'),
('2', 'deny'),
-- view
('10', 'all'),
('11', 'read'),
('12', 'write'),
('13', 'create'),
('14', 'delete'),
-- object
('20', 'all'),
('21', 'read'),
('22', 'write'),
-- field
('30', 'all'),
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
-- object
('3', '20'),
('3', '21'),
('3', '22'),
-- field
('4', '30'),
('4', '31'),
('4', '32');

-- SELECT TABLES

SELECT type, string_agg(name, ',') as access
FROM sec.permission p
LEFT JOIN sec.permission_level pl on p.id = pl.permission_id
LEFT JOIN sec.level l on l.id = pl.level_id
GROUP BY type;

-- END

-- DROP TABLES

DROP TABLE IF EXISTS
sec.permission,
sec.level,
sec.permission_level CASCADE ;

-- END
