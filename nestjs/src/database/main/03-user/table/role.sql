-- CREATE TABLE ROLE
CREATE TABLE IF NOT EXISTS sec.role (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  role_level INT DEFAULT 1,

  role_type_id INT,
  org_id INT,

  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(role_type_id) REFERENCES dbo.role_type(id) ON DELETE SET NULL
);

INSERT
INTO sec.role(name, description, is_owner, org_id, role_type_id)
VALUES
('System Role', null, '0', null, '1'),
('Owner Role', null, '1', null, '2'),
('Admin Role', null, '0', null, '2'),
('Manager Role', null, '0', null, '2'),
('Employee Role', null, '0', null, '3');