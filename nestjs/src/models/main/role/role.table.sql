CREATE TABLE IF NOT EXISTS dbo.role_type (
  id SERIAL NOT NULL,
  name role_type_enum NOT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id)
);

CREATE TYPE dbo.role_type_enum AS ENUM ('system', 'internal', 'external');

CREATE TABLE IF NOT EXISTS sec.role (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  
  org_id INT,
  role_type_id INT,

  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  FOREIGN KEY(role_type_id) REFERENCES dbo.role_type(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sec.role_policy (
  role_id INT NOT NULL,
  policy_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(role_id, policy_id),
  FOREIGN KEY(role_id) REFERENCES sec.role(id) ON DELETE CASCADE,
  FOREIGN KEY(policy_id) REFERENCES sec.policy(id) ON DELETE CASCADE
);

CREATE INDEX idx_role_policy ON sec.role_policy(role_id, policy_id);