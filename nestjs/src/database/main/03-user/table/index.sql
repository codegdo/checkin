-- CREATE TABLE GROUP TYPE
CREATE TABLE IF NOT EXISTS dbo.group_type (
  id SERIAL NOT NULL,
  name VARCHAR(15) CHECK(name in ('system', 'internal', 'external')) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.group_type(id, name)
VALUES
('1', 'system'),
('2', 'internal'),
('3', 'external');

-- CREATE TABLE POLICY_VERSION
CREATE TABLE IF NOT EXISTS dbo.policy_version (
  id SERIAL NOT NULL,
  name VARCHAR(5) NOT NULL,
  description VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.policy_version(id, name)
VALUES
('1', '1.0');

-- CREATE TABLE BUSINESS TYPE
CREATE TABLE IF NOT EXISTS dbo.business_type (
  id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id)
);

INSERT
INTO dbo.business_type(id, name, category)
VALUES
('1', 'Nail Salon', 'Service'),
('2', 'Restaurant', 'Service'),
--
('1000', '--', 'Service');

-- CREATE TABLE GROUP
CREATE TABLE IF NOT EXISTS sec.group (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  group_level INT DEFAULT 1,

  group_type_id INT,
  org_id INT,

  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(group_type_id) REFERENCES dbo.group_type(id) ON DELETE SET NULL
);

INSERT
INTO sec.group(name, description, is_owner, org_id, group_type_id)
VALUES
('System Group', null, '0', null, '1'),
('Owner Group', null, '1', null, '2');

-- CREATE TABLE POLICY
CREATE TABLE IF NOT EXISTS sec.policy (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  
  statement JSONB NOT NULL DEFAULT '{"effect":"allow","action":"*","resource":"*"}'::jsonb,
  
  version_id INT,
  group_type_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(group_type_id) REFERENCES dbo.group_type(id) ON DELETE SET NULL,
  FOREIGN KEY(version_id) REFERENCES dbo.policy_version(id) ON DELETE SET NULL
);

INSERT
INTO sec.policy(name, description, statement, version_id, group_type_id)
VALUES
('System Access', 'Full access','{"effect":"allow","action":"*","resource":"*"}', '1', '1'),
('Admin Access', 'Full access','{"effect":"allow","action":"*","resource":"*"}', '1', '2'),
('Manager Access', 'Some access','{"effect":"allow","action":"*","resource":"*"}', '1', '2'),
('Employee Access', 'Less access','{"effect":"allow","action":"*","resource":"*"}', '1', '3');

-- CREATE TABLE CONTACT
CREATE TABLE IF NOT EXISTS org.contact (
  id SERIAL NOT NULL,

  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email_address VARCHAR(45),
  phone_number VARCHAR(20),

  street_address VARCHAR(95),
  city VARCHAR(95),
  postal_code VARCHAR(15),
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

  custom JSONB,

  contact_id INT,
  group_id INT,
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
  FOREIGN KEY(group_id) REFERENCES sec.group(id),
  FOREIGN KEY(contact_id) REFERENCES org.contact(id)
);

-- CREATE TABLE CLIENT
CREATE TABLE IF NOT EXISTS sec.client (
  id SERIAL NOT NULL,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email_address VARCHAR(45),
  phone_number VARCHAR(20),
  birthday DATE,

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
  postal_code VARCHAR(15),
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

  business_type_id INT,
  owner_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  UNIQUE(subdomain, owner_id),
  FOREIGN KEY(business_type_id) REFERENCES dbo.business_type(id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
  
);

-- CREATE TABLE GROUP_POLICY
CREATE TABLE IF NOT EXISTS sec.group_policy (
  group_id INT NOT NULL,
  policy_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(group_id, policy_id),
  FOREIGN KEY(group_id) REFERENCES sec.group(id) ON DELETE SET NULL,
  FOREIGN KEY(policy_id) REFERENCES sec.policy(id) ON DELETE SET NULL
);

CREATE INDEX idx_group_policy ON sec.group_policy(group_id, policy_id);

INSERT
INTO sec.group_policy(group_id, policy_id)
VALUES
('1', '1'),
('2', '2');

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
dbo.group_type,
dbo.policy_version,
dbo.business_type,
sec.group,
sec.policy,
org.contact,
sec.user,
sec.client,
sec.organization,
org.location,
sec.group_policy,
sec.user_location,
sec.client_location CASCADE;
