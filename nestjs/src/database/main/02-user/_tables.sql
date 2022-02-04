-- CREATE TABLE ROLE TYPE
CREATE TABLE IF NOT EXISTS dbo.role_type (
  id SERIAL NOT NULL,
  name VARCHAR(15) CHECK(name in ('system', 'internal', 'external')) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
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
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),

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
('System User', null, '0', null, '1'),
('Owner User', null, '1', null, '2'),
('Manager User', null, '0', null, '2'),
('Employee User', null, '0', null, '3');

-- CREATE TABLE POLICY
CREATE TABLE IF NOT EXISTS sec.policy (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),

  data JSONB,

  role_type_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(role_type_id) REFERENCES dbo.role_type(id) ON DELETE SET NULL
);

-- CREATE TABLE CONTACT
CREATE TABLE IF NOT EXISTS org.contact (
  id SERIAL NOT NULL,

  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email_address VARCHAR(45),
  phone_number VARCHAR(20),

  street_address VARCHAR(95),
  city VARCHAR(95),
  postal_code INT,
  territory_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id)
);

-- CREATE TABLE USER
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  username VARCHAR(45),
  password VARCHAR(85),
  passcode VARCHAR(4),

  contact_id INT,
  role_id INT,
  form_id INT,
  org_id INT,

  is_new_password BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  UNIQUE(username),
  UNIQUE(passcode),
  FOREIGN KEY(role_id) REFERENCES sec.role(id),
  FOREIGN KEY(contact_id) REFERENCES org.contact(id)
);

-- CREATE TABLE CLIENT
CREATE TABLE IF NOT EXISTS sec.client (
  id SERIAL NOT NULL,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email_address VARCHAR(45),
  phone_number VARCHAR(20),
  day_of_birth DATE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  UNIQUE(phone_number)
);

-- CREATE TABLE LOCATION
CREATE TABLE IF NOT EXISTS org.location (
  id SERIAL NOT NULL,

  name VARCHAR(95),

  street_address VARCHAR(95),
  city VARCHAR(95),
  postal_code VARCHAR(18),
  territory_id INT,

  phone_number VARCHAR(20),
  fax_number VARCHAR(20),

  data JSONB,

  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id)
);

-- CREATE TABLE ORGANIZATION
CREATE TABLE IF NOT EXISTS sec.organization (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,

  street_address VARCHAR(45),
  city VARCHAR(45),
  postal_code VARCHAR(15),
  territory_id INT,

  phone_number VARCHAR(15),
  fax_number VARCHAR(15),
  website VARCHAR(45),
  subdomain VARCHAR(45) NOT NULL,

  data JSONB,

  owner_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  UNIQUE(subdomain, owner_id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
);

-- CREATE TABLE ROLE_POLICY
CREATE TABLE IF NOT EXISTS sec.role_policy (
  role_id INT NOT NULL,
  policy_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(role_id, policy_id),
  FOREIGN KEY(role_id) REFERENCES sec.role(id) ON DELETE SET NULL,
  FOREIGN KEY(policy_id) REFERENCES sec.policy(id) ON DELETE SET NULL
);

CREATE INDEX idx_role_policy ON sec.role_policy(role_id, policy_id);

-- CREATE TABLE USER_LOCATION
CREATE TABLE IF NOT EXISTS sec.user_location (
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, location_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE SET NULL,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE SET NULL
);

CREATE INDEX idx_user_location ON sec.user_location(user_id, location_id);

-- CREATE TABLE CLIENT_LOCATION
CREATE TABLE IF NOT EXISTS sec.client_location (
  client_id INT NOT NULL,
  location_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(client_id, location_id),
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE SET NULL,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE SET NULL
);

CREATE INDEX idx_client_location ON sec.client_location(client_id, location_id);


-- DROP TABLES

DROP TABLE IF EXISTS
dbo.role_type,
sec.role,
sec.policy,
org.contact,
sec.user,
sec.client,
org.location,
sec.organization,
sec.role_policy,
sec.user_location,
sec.client_location CASCADE;


-- END

