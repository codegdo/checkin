-- CREATE TABLE ROLE TYPE
CREATE TYPE dbo.role_type_enum AS ENUM ('system', 'internal', 'external');

CREATE TABLE IF NOT EXISTS dbo.role_type (
  id SERIAL NOT NULL,
  name dbo.role_type_enum NOT NULL,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.role_type(name)
VALUES
('system'),
('internal'),
('external');

-- CREATE TABLE ROLE
CREATE TABLE IF NOT EXISTS sec.role (
  id SERIAL NOT NULL,
  name CHARACTER VARYING(45) NOT NULL,
  description CHARACTER VARYING(255),

  role_type_id INT,
  org_id INT,

  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(role_type_id) REFERENCES dbo.role_type(id) ON DELETE SET NULL
);

INSERT
INTO sec.role(name, description, is_owner, org_id, role_type_id)
VALUES
('System User', null, '0', null, '1'),
('Owner User', null, '1', null, '2'),
('Manager User', null, '0', null, '2'),
('Employee User', null, '0', null, '3');