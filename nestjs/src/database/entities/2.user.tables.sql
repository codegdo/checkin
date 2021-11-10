-- CREATE TABLE TERRITORY
CREATE TABLE IF NOT EXISTS dbo.territory (
  id SERIAL NOT NULL,
  country VARCHAR(90),
  country_code VARCHAR(3),
  state VARCHAR(90),
  state_code VARCHAR(2),
  region VARCHAR(45),
  --
  PRIMARY KEY(id)
);

-- INSERT
INSERT
INTO dbo.territory (id, country, country_code, state, state_code, region)
VALUES
('22900', 'United States', 'USA', '--', '--', 'Americas'),
('22901', 'United States', 'USA', 'Alaska', 'AK', 'Americas'),
('22902', 'United States', 'USA', 'Alabama', 'AL', 'Americas'),
('22903', 'United States', 'USA', 'Arkansas', 'AR', 'Americas'),
('22904', 'United States', 'USA', 'American Samoa', 'AS', 'Americas'),
('22905', 'United States', 'USA', 'Arizona', 'AZ', 'Americas'),
('22906', 'United States', 'USA', 'California', 'CA', 'Americas'),
('22907', 'United States', 'USA', 'Colorado', 'CO', 'Americas'),
('22908', 'United States', 'USA', 'Connecticut', 'CT', 'Americas'),
('22909', 'United States', 'USA', 'District of Columbia', 'DC', 'Americas'),
('22910', 'United States', 'USA', 'Delaware', 'DE', 'Americas'),
('22911', 'United States', 'USA', 'Florida', 'FL', 'Americas'),
('22912', 'United States', 'USA', 'Georgia', 'GA', 'Americas'),
('22913', 'United States', 'USA', 'Guam', 'GU', 'Americas'),
('22914', 'United States', 'USA', 'Hawaii', 'HI', 'Americas'),
('22915', 'United States', 'USA', 'Iowa', 'IA', 'Americas'),
('22916', 'United States', 'USA', 'Idaho', 'ID', 'Americas'),
('22917', 'United States', 'USA', 'Illinois', 'IL', 'Americas'),
('22918', 'United States', 'USA', 'Indiana', 'IN', 'Americas'),
('22919', 'United States', 'USA', 'Kansas', 'KS', 'Americas'),
('22920', 'United States', 'USA', 'Kentucky', 'KY', 'Americas'),
('22921', 'United States', 'USA', 'Louisiana', 'LA', 'Americas'),
('22922', 'United States', 'USA', 'Massachusetts', 'MA', 'Americas'),
('22923', 'United States', 'USA', 'Maryland', 'MD', 'Americas'),
('22924', 'United States', 'USA', 'Maine', 'ME', 'Americas'),
('22925', 'United States', 'USA', 'Michigan', 'MI', 'Americas'),
('22926', 'United States', 'USA', 'Minnesota', 'MN', 'Americas'),
('22927', 'United States', 'USA', 'Missouri', 'MO', 'Americas'),
('22928', 'United States', 'USA', 'Northern Mariana Islands', 'MP', 'Americas'),
('22929', 'United States', 'USA', 'Mississippi', 'MS', 'Americas'),
('22930', 'United States', 'USA', 'Montana', 'MT', 'Americas'),
('22931', 'United States', 'USA', 'North Carolina', 'NC', 'Americas'),
('22932', 'United States', 'USA', 'North Dakota', 'ND', 'Americas'),
('22933', 'United States', 'USA', 'Nebraska', 'NE', 'Americas'),
('22934', 'United States', 'USA', 'New Hampshire', 'NH', 'Americas'),
('22935', 'United States', 'USA', 'New Jersey', 'NJ', 'Americas'),
('22936', 'United States', 'USA', 'New Mexico', 'NM', 'Americas'),
('22937', 'United States', 'USA', 'Nevada', 'NV', 'Americas'),
('22938', 'United States', 'USA', 'New York', 'NY', 'Americas'),
('22939', 'United States', 'USA', 'Ohio', 'OH', 'Americas'),
('22940', 'United States', 'USA', 'Oklahoma', 'OK', 'Americas'),
('22941', 'United States', 'USA', 'Oregon', 'OR', 'Americas'),
('22942', 'United States', 'USA', 'Pennsylvania', 'PA', 'Americas'),
('22943', 'United States', 'USA', 'Puerto Rico', 'PR', 'Americas'),
('22944', 'United States', 'USA', 'Rhode Island', 'RI', 'Americas'),
('22945', 'United States', 'USA', 'South Carolina', 'SC', 'Americas'),
('22946', 'United States', 'USA', 'South Dakota', 'SD', 'Americas'),
('22947', 'United States', 'USA', 'Tennessee', 'TN', 'Americas'),
('22948', 'United States', 'USA', 'Texas', 'TX', 'Americas'),
('22949', 'United States', 'USA', 'United States Minor Outlying Islands', 'UM', 'Americas'),
('22950', 'United States', 'USA', 'Utah', 'UT', 'Americas'),
('22951', 'United States', 'USA', 'Virginia', 'VA', 'Americas'),
('22952', 'United States', 'USA', 'Virgin Islands, United States', 'VI', 'Americas'),
('22953', 'United States', 'USA', 'Vermont', 'VT', 'Americas'),
('22954', 'United States', 'USA', 'Washington', 'WA', 'Americas'),
('22955', 'United States', 'USA', 'Wisconsin', 'WI', 'Americas'),
('22956', 'United States', 'USA', 'West Virginia', 'WV', 'Americas'),
('22957', 'United States', 'USA', 'Wyoming', 'WY', 'Americas');

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
  name VARCHAR(45) NOT NULL,
  description VARCHAR(255),

  role_type_id INT,
  org_id INT,

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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
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
  postal_code VARCHAR(18),
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
  passcode VARCHAR(45),

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

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(id)
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
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  UNIQUE(subdomain, owner_id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
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

  owner_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
);

-- CREATE TABLE SESSION
CREATE TABLE IF NOT EXISTS sec.session (
  id TEXT NOT NULL,
  json TEXT,
  expired_at BIGINT,
  --
  PRIMARY KEY(id)
);

-- CREATE TABLE TOKEN
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS sec.token (
    id UUID DEFAULT uuid_generate_v4() NOT NULL,
    data JSONB,
    expired_at BIGINT,
    --
    PRIMARY KEY(id)
);

-- CREATE JOIN TABLE ROLE_POLICY
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

-- CREATE JOIN TABLE CLIENT_LOCATION
CREATE TABLE IF NOT EXISTS sec.client_location (
  client_id INT NOT NULL,
  location_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(client_id, location_id),
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE CASCADE,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE CASCADE
);

CREATE INDEX idx_client_location ON sec.client_location(client_id, location_id);

-- CREATE JOIN TABLE USER_LOCATION
CREATE TABLE IF NOT EXISTS sec.user_location (
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, location_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE CASCADE,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_location ON sec.user_location(user_id, location_id);

--
SELECT * FROM sec.token;
--

DROP TABLE IF EXISTS
dbo.territory,
dbo.role_type,
--
org.location,
org.contact,
--
sec.role,
sec.role_policy,
sec.policy,
sec.user,
sec.user_location,
sec.client,
sec.client_location,
sec.organization,
sec.session,
sec.token,
CASCADE;

DROP TYPE IF EXISTS
dbo.role_type_enum;