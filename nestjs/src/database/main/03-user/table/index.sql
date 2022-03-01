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

-- CREATE TABLE GROUP
CREATE TABLE IF NOT EXISTS sec.group (
  id SERIAL NOT NULL,
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),
  group_level INT DEFAULT 1,

  group_type_id INT,
  biz_id INT,

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
INTO sec.group(name, description, is_owner, biz_id, group_type_id)
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
  biz_id INT,

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
  biz_id INT,

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

-- CREATE TABLE STORE
CREATE TABLE IF NOT EXISTS org.store (
  id SERIAL NOT NULL,

  name VARCHAR(95),

  street_address VARCHAR(95),
  city VARCHAR(95),
  postal_code VARCHAR(15),
  territory_id INT,

  phone_number VARCHAR(20),
  fax_number VARCHAR(20),

  data JSONB,

  biz_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id)
);

-- CREATE TABLE BUSINESS
CREATE TABLE IF NOT EXISTS org.business (
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

  custom JSONB DEFAULT '[]'::jsonb,

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

-- CREATE TABLE GROUP_POLICY
CREATE TABLE IF NOT EXISTS sec.group_policy (
  group_id INT NOT NULL,
  policy_id INT NOT NULL,
  biz_id INT,
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

-- CREATE TABLE USER_STORE
CREATE TABLE IF NOT EXISTS sec.user_store (
  user_id INT NOT NULL,
  store_id INT NOT NULL,
  biz_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, store_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE SET NULL,
  FOREIGN KEY(store_id) REFERENCES org.store(id) ON DELETE SET NULL
);

CREATE INDEX idx_user_store ON sec.user_store(user_id, store_id);

-- CREATE TABLE CLIENT_STORE
CREATE TABLE IF NOT EXISTS sec.client_store (
  client_id INT NOT NULL,
  store_id INT NOT NULL,
  biz_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(client_id, store_id),
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE SET NULL,
  FOREIGN KEY(store_id) REFERENCES org.store(id) ON DELETE SET NULL
);

CREATE INDEX idx_client_store ON sec.client_store(client_id, store_id);


-- DROP TABLES

DROP TABLE IF EXISTS
dbo.group_type,
dbo.policy_version,
sec.group,
sec.policy,
org.contact,
sec.user,
sec.client,
org.store,
org.business,
sec.group_policy,
sec.user_store,
sec.client_store CASCADE;

