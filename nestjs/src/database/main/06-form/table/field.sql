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

  parent_id INT REFERENCES org.field(id) ON DELETE SET NULL,
  component_type_id INT,
  object_id INT,
  biz_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(component_type_id) REFERENCES dbo.component_type(id)  ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id)  ON DELETE SET NULL
);

INSERT
INTO org.field (name, role, type, map, lookup, is_required, object_id, component_type_id, parent_id, has_dependent,is_dependent)
VALUES
--user=1
('username', 'field', 'text', 'sec.user.username', null, '1', '1', null, null, '0', '0'),
('password', 'field', 'password', 'sec.user.password', null, '1', '1', null, null, '0', '0'),
('passcode', 'field', 'text', 'sec.user.passcode', null, '1', '1', null, null, '0', '0'),
('accessType', 'field', 'radio', null, 'dbo.group_type.name.id', '1', '1', null, null, '1', '0'),

--contact=2
('firstName', 'field', 'text', 'org.contact.first_name', null, '1', '2', null, null, '0', '0'),
('lastName', 'field', 'text', 'org.contact.last_name', null, '1', '2', null, null, '0', '0'),
('emailAddress', 'field', 'text', 'org.contact.email_address', null, '1', '2', null, null, '0', '0'),
('phoneNumber', 'field', 'text', 'org.contact.phone_number', null, '1', '2', null, null, '0', '0'),
('streetAddress', 'field', 'text', 'org.contact.street_address', null, '0', '2', null, null, '0', '0'),
('country', 'field', 'select', 'org.contact.country', 'dbo.territory.country.country_code', '0', '2', null, null, '0', '0'),
('state', 'field', 'select', 'org.contact.state', 'dbo.territory.state.state_code', '0', '2', null, null, '0', '0'),
('city', 'field', 'text', 'org.contact.city', null, '0', '2', null, null, '0', '0'),
('postalCode', 'field', 'text', 'org.contact.postal_code', null, '0', '2', null, null, '0', '0'),

--group=4
('groupGrid', 'component', 'grid', 'sec.group', null, '1', '4', '1', null, '0', '0'),
('name', 'field', 'text', 'sec.group.name', null, '1', '4', '1', '14', '0', '0'),

--business=15
('name', 'field', 'text', 'org.business.name', null, '1', '15', null, null, '0', '0'),
('streetAddress', 'field', 'text', 'org.business.street_address', null, '0', '15', null, null, '0', '0'),
('country', 'field', 'select', 'org.business.country', 'dbo.territory.country.country_code', '0', '15', null, null, '0', '0'),
('state', 'field', 'select', 'org.business.state', 'dbo.territory.state.state_code', '0', '15', null, null, '0', '0'),
('city', 'field', 'text', 'org.business.city', null, '0', '15', null, null, '0', '0'),
('postalCode', 'field', 'text', 'org.business.postal_code', null, '0', '15', null, null, '0', '0'),
('phoneNumber', 'field', 'text', 'org.business.phone_number', null, '0', '15', null, null, '0', '0'),
('faxNumber', 'field', 'text', 'org.business.fax_number', null, '0', '15', null, null, '0', '0'),
('website', 'field', 'text', 'org.business.website', null, '0', '15', null, null, '0', '0'),
('subdomain', 'field', 'text', 'org.business.subdomain', null, '1', '15', null, null, '0', '0'),
--store=6
('name', 'field', 'text', 'org.store.name', null, '1', '6', null, null, '0', '0'),
('streetAddress', 'field', 'text', 'org.store.street_address', null, '0', '6', null, null, '0', '0'),
('country', 'field', 'select', 'org.store.country', 'dbo.territory.country.country_code', '0', '6', null, null, '0', '0'),
('state', 'field', 'select', 'org.store.state', 'dbo.territory.state.state_code', '0', '6', null, null, '0', '0'),
('city', 'field', 'text', 'org.store.city', null, '0', '6', null, null, '0', '0'),
('postalCode', 'field', 'text', 'org.store.postal_code', null, '0', '6', null, null, '0', '0'),
('phoneNumber', 'field', 'text', 'org.store.phone_number', null, '0', '6', null, null, '0', '0'),
('faxNumber', 'field', 'text', 'org.store.fax_number', null, '0', '6', null, null, '0', '0');