-- CREATE TABLE FIELD
CREATE TABLE IF NOT EXISTS org.field (
  id SERIAL,
  name VARCHAR(255),
  role VARCHAR(15),
  type VARCHAR(15) CHECK(type in ('text', 'password', 'radio', 'checkbox', 'textarea', 'select')),

  value VARCHAR(255),

  data JSONB,

  map VARCHAR(95),
  lookup VARCHAR(95),

  is_required BOOLEAN DEFAULT FALSE,

  parent_id INT,
  object_id INT,
  org_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(object_id) REFERENCES dbo.object(id)
);

INSERT
INTO org.field (name, role, type, map, lookup, is_required, object_id)
VALUES
--user=1
('username', 'field', 'text', 'sec.user.username', null, '1', '1'),
('password', 'field', 'password', 'sec.user.password', null, '1', '1'),
('passcode', 'field', 'text', 'sec.user.passcode', null, '1', '1'),
--contact=2
('firstName', 'field', 'text', 'org.contact.first_name', null, '1', '2'),
('lastName', 'field', 'text', 'org.contact.last_name', null, '1', '2'),
('emailAddress', 'field', 'text', 'org.contact.email_address', null, '1', '2'),
('phoneNumber', 'field', 'text', 'org.contact.phone_number', null, '1', '2'),
('streetAddress', 'field', 'text', 'org.contact.street_address', null, '0', '2'),
('country', 'field', 'text', 'org.contact.country', 'dbo.territory.country.country_code', '0', '2'),
('state', 'field', 'text', 'org.contact.state', 'dbo.territory.state.state_code', '0', '2'),
('city', 'field', 'text', 'org.contact.city', null, '0', '2'),
('postalCode', 'field', 'text', 'org.contact.postal_code', null, '0', '2'),
--organization=15
('name', 'field', 'text', 'sec.organization.name', null, '1', '15'),
('streetAddress', 'field', 'text', 'sec.organization.street_address', null, '0', '15'),
('country', 'field', 'text', 'sec.organization.territory', 'dbo.territory.country.country_code', '0', '15'),
('state', 'field', 'text', 'sec.organization.territory', 'dbo.territory.state.state_code', '0', '15'),
('city', 'field', 'text', 'sec.organization.city', null, '0', '15'),
('postalCode', 'field', 'text', 'sec.organization.postal_code', null, '0', '15'),
('phoneNumber', 'field', 'text', 'sec.organization.phone_number', null, '0', '15'),
('faxNumber', 'field', 'text', 'sec.organization.fax_number', null, '0', '15'),
('website', 'field', 'text', 'sec.organization.website', null, '0', '15'),
('subdomain', 'field', 'text', 'sec.organization.subdomain', null, '1', '15'),
--workspace=6
('name', 'field', 'text', 'org.workspace.name', null, '1', '6'),
('streetAddress', 'field', 'text', 'org.workspace.street_address', null, '0', '6'),
('country', 'field', 'text', 'org.workspace.country', 'dbo.territory.country.country_code', '0', '6'),
('state', 'field', 'text', 'org.workspace.state', 'dbo.territory.state.state_code', '0', '6'),
('city', 'field', 'text', 'org.workspace.city', null, '0', '6'),
('postalCode', 'field', 'text', 'org.workspace.postal_code', null, '0', '6'),
('phoneNumber', 'field', 'text', 'org.workspace.phone_number', null, '0', '6'),
('faxNumber', 'field', 'text', 'org.workspace.fax_number', null, '0', '6');