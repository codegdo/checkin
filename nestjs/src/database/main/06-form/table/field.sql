-- CREATE TABLE FIELD
CREATE TABLE IF NOT EXISTS org.field (
  id SERIAL,
  name VARCHAR(255),
  role VARCHAR(15),
  type VARCHAR(15) CHECK(type in ('text', 'password', 'radio', 'checkbox', 'textarea', 'select', 'grid')),

  value VARCHAR(255),

  data JSONB,

  map VARCHAR(95),
  lookup VARCHAR(95),

  is_required BOOLEAN DEFAULT FALSE,

  parent_id INT REFERENCES org.field(id) ON DELETE SET NULL,
  grid_type_id INT,
  object_id INT,
  org_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(grid_type_id) REFERENCES dbo.grid_type(id)
);

INSERT
INTO org.field (name, role, type, map, lookup, is_required, object_id, grid_type_id, parent_id)
VALUES
--user=1
('username', 'field', 'text', 'sec.user.username', null, '1', '1', null, null),
('password', 'field', 'password', 'sec.user.password', null, '1', '1', null, null),
('passcode', 'field', 'text', 'sec.user.passcode', null, '1', '1', null, null),
('accessType', 'field', 'radio', null, 'dbo.group_type.name.id', '1', '1', null, null),

--contact=2
('firstName', 'field', 'text', 'org.contact.first_name', null, '1', '2', null, null),
('lastName', 'field', 'text', 'org.contact.last_name', null, '1', '2', null, null),
('emailAddress', 'field', 'text', 'org.contact.email_address', null, '1', '2', null, null),
('phoneNumber', 'field', 'text', 'org.contact.phone_number', null, '1', '2', null, null),
('streetAddress', 'field', 'text', 'org.contact.street_address', null, '0', '2', null, null),
('country', 'field', 'select', 'org.contact.country', 'dbo.territory.country.country_code', '0', '2', null, null),
('state', 'field', 'select', 'org.contact.state', 'dbo.territory.state.state_code', '0', '2', null, null),
('city', 'field', 'text', 'org.contact.city', null, '0', '2', null, null),
('postalCode', 'field', 'text', 'org.contact.postal_code', null, '0', '2', null, null),

--group=4
('groupGrid', 'component', 'grid', 'sec.group', null, '1', '4', '1', null),
('name', 'field', 'text', 'sec.group.name', null, '1', '4', '1', '14'),

--organization=15
('name', 'field', 'text', 'sec.organization.name', null, '1', '15', null, null),
('streetAddress', 'field', 'text', 'sec.organization.street_address', null, '0', '15', null, null),
('country', 'field', 'select', 'sec.organization.country', 'dbo.territory.country.country_code', '0', '15', null, null),
('state', 'field', 'select', 'sec.organization.state', 'dbo.territory.state.state_code', '0', '15', null, null),
('city', 'field', 'text', 'sec.organization.city', null, '0', '15', null, null),
('postalCode', 'field', 'text', 'sec.organization.postal_code', null, '0', '15', null, null),
('phoneNumber', 'field', 'text', 'sec.organization.phone_number', null, '0', '15', null, null),
('faxNumber', 'field', 'text', 'sec.organization.fax_number', null, '0', '15', null, null),
('website', 'field', 'text', 'sec.organization.website', null, '0', '15', null, null),
('subdomain', 'field', 'text', 'sec.organization.subdomain', null, '1', '15', null, null),
--location=6
('name', 'field', 'text', 'org.location.name', null, '1', '6', null, null),
('streetAddress', 'field', 'text', 'org.location.street_address', null, '0', '6', null, null),
('country', 'field', 'select', 'org.location.country', 'dbo.territory.country.country_code', '0', '6', null, null),
('state', 'field', 'select', 'org.location.state', 'dbo.territory.state.state_code', '0', '6', null, null),
('city', 'field', 'text', 'org.location.city', null, '0', '6', null, null),
('postalCode', 'field', 'text', 'org.location.postal_code', null, '0', '6', null, null),
('phoneNumber', 'field', 'text', 'org.location.phone_number', null, '0', '6', null, null),
('faxNumber', 'field', 'text', 'org.location.fax_number', null, '0', '6', null, null);