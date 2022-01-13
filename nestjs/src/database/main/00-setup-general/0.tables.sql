CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CREATE TABLE SESSION
CREATE TABLE IF NOT EXISTS sec.session (
  id CHARACTER VARYING NOT NULL,
  json TEXT,
  expired_at BIGINT,
  --
  PRIMARY KEY(id)
);

-- CREATE TABLE TOKEN
CREATE TABLE IF NOT EXISTS sec.token (
  id UUID DEFAULT uuid_generate_v4() NOT NULL,
  
  key VARCHAR(100),
  type VARCHAR(100),
  data JSONB,
  expired_at BIGINT,
  --
  PRIMARY KEY(id),
  UNIQUE(key)
);

-- CREATE TABLE ERROR
CREATE TABLE IF NOT EXISTS log.error (
  id UUID DEFAULT uuid_generate_v4() NOT NULL,

  message TEXT,
  host VARCHAR(255),
  url VARCHAR(255),
  stack TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(id)
);

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

-- US
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

-- DROP TABLES

DROP TABLE IF EXISTS
sec.session,
sec.token,
log.error,
dbo.territory CASCADE;

-- END