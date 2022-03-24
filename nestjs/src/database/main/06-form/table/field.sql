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

  has_dependent BOOLEAN DEFAULT FALSE,
  is_dependent BOOLEAN DEFAULT FALSE,
  is_required BOOLEAN DEFAULT FALSE,

  dependent_id INT REFERENCES org.field(id) ON DELETE SET NULL,
  parent_id INT REFERENCES org.field(id) ON DELETE SET NULL,
  component_id INT,
  object_id INT,
  org_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(component_id) REFERENCES org.component(id)  ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id)  ON DELETE SET NULL
);

INSERT
INTO org.field (name, role, type, value, map, lookup, has_dependent, is_dependent, is_required, object_id, component_id, dependent_id, parent_id)
VALUES
--user=1
('username', 'field', 'text', null, 'sec.user.username', null, '0', '0', '1', '1', null, null, null),
('password', 'field', 'password', null, 'sec.user.password', null, '0', '0', '1', '1', null, null, null),
('passcode', 'field', 'text', null, 'sec.user.passcode', null, '0', '0', '1', '1', null, null, null),
('location', 'field', 'select', null, 'sec.user_location.location_id', 'org.location.name.id', '0', '0', '1', '1', null, null, null),
('groupId', 'field', 'select', null, 'sec.user.group_id', 'sec.group.name.id', '0', '0', '1', '1', null, null, null),

--contact=2
('firstName', 'field', 'text', null, 'org.contact.first_name', null, '0', '0', '1', '2', null, null, null),
('lastName', 'field', 'text', null, 'org.contact.last_name', null, '0', '0', '1', '2', null, null, null),
('emailAddress', 'field', 'text', null, 'org.contact.email_address', null, '0', '0', '1', '2', null, null, null),
('phoneNumber', 'field', 'text', null, 'org.contact.phone_number', null, '0', '0', '1', '2', null, null, null),
('streetAddress', 'field', 'text', null, 'org.contact.street_address', null, '0', '0', '0', '2', null, null, null),
('country', 'field', 'select', null, 'org.contact.territory_id', 'dbo.territory.country.country_code', '0', '0', '0', '2', null, null, null),
('state', 'field', 'select', null, 'org.contact.territory_id', 'dbo.territory.state.state_code', '0', '0', '0', '2', null, null, null),
('city', 'field', 'text', null, 'org.contact.city', null, '0', '0', '0', '2', null, null, null),
('postalCode', 'field', 'text', null, 'org.contact.postal_code', null, '0', '0', '0', '2', null, null, null),

--group=4
('groupGrid', 'component', 'grid', null, 'sec.group', null, '0', '0', '1', '4', '1', null, null),
('name', 'field', 'text', null, 'sec.group.name', null, '0', '0', '1', '4', '1', null, '14'),

--organization=15
('name', 'field', 'text', null, 'sec.organization.name', null, '0', '0', '1', '15', null, null, null),
('streetAddress', 'field', 'text', null, 'sec.organization.street_address', null, '0', '0', '0', '15', null, null, null),
('country', 'field', 'select', null, 'sec.organization.territory_id', 'dbo.territory.country.country_code', '0', '0', '0', '15', null, null, null),
('state', 'field', 'select', null, 'sec.organization.territory_id', 'dbo.territory.state.state_code', '0', '0', '0', '15', null, null, null),
('city', 'field', 'text', null, 'sec.organization.city', null, '0', '0', '0', '15', null, null, null),
('postalCode', 'field', 'text', null, 'sec.organization.postal_code', null, '0', '0', '0', '15', null, null, null),
('phoneNumber', 'field', 'text', null, 'sec.organization.phone_number', null, '0', '0', '0', '15', null, null, null),
('faxNumber', 'field', 'text', null, 'sec.organization.fax_number', null, '0', '0', '0', '15', null, null, null),
('website', 'field', 'text', null, 'sec.organization.website', null, '0', '0', '0', '15', null, null, null),
('subdomain', 'field', 'text', null, 'sec.organization.subdomain', null, '0', '0', '1', '15', null, null, null),
('businessType', 'field', 'select', null, 'sec.organization.business_type_id', 'dbo.business_type.name.id', '0', '0', '1', '15', null, null, null),
--location=6
('name', 'field', 'text', null, 'org.location.name', null, '0', '0', '1', '6', null, null, null),
('streetAddress', 'field', 'text', null, 'org.location.street_address', null, '0', '0', '0', '6', null, null, null),
('country', 'field', 'select', null, 'org.location.territory_id', 'dbo.territory.country.country_code', '0', '0', '0', '6', null, null, null),
('state', 'field', 'select', null, 'org.location.territory_id', 'dbo.territory.state.state_code', '0', '0', '0', '6', null, null, null),
('city', 'field', 'text', null, 'org.location.city', null, '0', '0', '0', '6', null, null, null),
('postalCode', 'field', 'text', null, 'org.location.postal_code', null, '0', '0', '0', '6', null, null, null),
('phoneNumber', 'field', 'text', null, 'org.location.phone_number', null, '0', '0', '0', '6', null, null, null),
('faxNumber', 'field', 'text', null, 'org.location.fax_number', null, '0', '0', '0', '6', null, null, null);