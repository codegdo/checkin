-- CREATE TABLE FORM_TYPE
CREATE TABLE IF NOT EXISTS dbo.form_type (
  id SERIAL,
  name VARCHAR(255),

  is_custom BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);


INSERT
INTO dbo.form_type (id, name, is_custom)
VALUES
('1', 'Signup', '0'),
('2', 'User', '0');

-- CREATE TABLE FORM_TYPE_OBJECT
CREATE TABLE IF NOT EXISTS dbo.form_type_object (
  form_type_id INT NOT NULL,
  object_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(form_type_id, object_id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL
);

CREATE INDEX idx_form_type_object  ON dbo.form_type_object (form_type_id, object_id);

INSERT
INTO dbo.form_type_object(form_type_id, object_id, org_id)
VALUES
--auth_signup
('1', '1', null),
('1', '2', null),
('1', '6', null),
('1', '15', null),
--user_form
('2', '1', null),
('2', '4', null),
('2', '7', null);

-- CREATE TABLE FORM
CREATE TABLE IF NOT EXISTS org.form (
  id SERIAL,
  name VARCHAR(95),
  title VARCHAR(95),
  description VARCHAR(255),

  data JSONB NOT NULL DEFAULT '[
    {
      "id": "f_header",
      "type": "header",
      "role": "block",
      "data": [],
      "position": 0,
      "parentId": null
    },
    {
      "id": "f_main",
      "type": "main",
      "role": "block",
      "data": [],
      "position": 1,
      "parentId": null
    },
    {
      "id": "f_footer",
      "type": "footer",
      "role": "block",
      "data": [],
      "position": 2,
      "parentId": null
    },
    {
      "id": "f_button",
      "title": "Submit",
      "name": "submit",
      "type": "button",
      "role": "inline",
      "data": null,
      "value": null,
      "position": 3,
      "parentId": "f_footer"
    }
  ]'::jsonb,

  form_type_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  is_publish BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL
);

INSERT
INTO org.form (name, title, description, form_type_id, org_id, is_publish)
VALUES
('auth_signup', 'Signup', null, '1', null, '1'),
('auth_setup', 'Setup', null, '1', null, '1'),
('setup_users', 'Users', null, '2', null, '1');

-- CREATE TABLE COMPONENT
CREATE TABLE IF NOT EXISTS org.component (
  id SERIAL,
  name VARCHAR(255),

  form_type_id INT,

  is_remove BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL
);

INSERT
INTO org.component (id, name, form_type_id)
VALUES
(1, 'user_group_grid', 2);

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

  is_new BOOLEAN DEFAULT TRUE,
  is_review BOOLEAN DEFAULT TRUE,
  is_unique BOOLEAN DEFAULT FALSE,

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
INTO org.field (name, role, type, value, map, lookup, has_dependent, is_dependent, is_required, is_new, is_review, is_unique, object_id, component_id, dependent_id, parent_id)
VALUES
--user=1
('username', 'field', 'text', null, 'sec.user.username', null, '0', '0', '1', '1', '1', '1', '1', null, null, null),
('password', 'field', 'password', null, 'sec.user.password', null, '0', '0', '1', '1', '0', '0', '1', null, null, null),
('passcode', 'field', 'text', null, 'sec.user.passcode', null, '0', '0', '1', '1', '1', '0', '1', null, null, null),
('location', 'field', 'select', null, 'sec.user_location.location_id', 'org.location.name.id', '0', '0', '1', '1', '1', '0', '1', null, null, null),
('groupId', 'field', 'select', null, 'sec.user.group_id', 'sec.group.name.id', '0', '0', '1', '1', '1', '0', '1', null, null, null),

--contact=2
('firstName', 'field', 'text', null, 'org.contact.first_name', null, '0', '0', '1', '1', '1', '0', '2', null, null, null),
('lastName', 'field', 'text', null, 'org.contact.last_name', null, '0', '0', '1', '1', '1', '0', '2', null, null, null),
('emailAddress', 'field', 'text', null, 'org.contact.email_address', null, '0', '0', '1', '1', '1', '0', '2', null, null, null),
('phoneNumber', 'field', 'text', null, 'org.contact.phone_number', null, '0', '0', '1', '1', '1', '0', '2', null, null, null),
('streetAddress', 'field', 'text', null, 'org.contact.street_address', null, '0', '0', '0', '1', '1', '0', '2', null, null, null),
('country', 'field', 'select', null, 'org.contact.territory_id', 'dbo.territory.country.country_code', '0', '0', '0', '1', '1', '0', '2', null, null, null),
('state', 'field', 'select', null, 'org.contact.territory_id', 'dbo.territory.state.state_code', '0', '0', '0', '1', '1', '0', '2', null, null, null),
('city', 'field', 'text', null, 'org.contact.city', null, '0', '0', '0', '1', '1', '0', '2', null, null, null),
('postalCode', 'field', 'text', null, 'org.contact.postal_code', null, '0', '0', '0', '1', '1', '0', '2', null, null, null),

--group=4
('groupGrid', 'component', 'grid', null, 'sec.group', null, '0', '0', '1', '1', '1', '0', '4', '1', null, null),
('name', 'field', 'text', null, 'sec.group.name', null, '0', '0', '1', '1', '1', '0', '4', '1', null, '14'),

--organization=15
('name', 'field', 'text', null, 'sec.organization.name', null, '0', '0', '1', '1', '1', '0', '15', null, null, null),
('streetAddress', 'field', 'text', null, 'sec.organization.street_address', null, '0', '0', '0', '1', '1', '0', '15', null, null, null),
('country', 'field', 'select', null, 'sec.organization.territory_id', 'dbo.territory.country.country_code', '0', '0', '0', '1', '1', '0', '15', null, null, null),
('state', 'field', 'select', null, 'sec.organization.territory_id', 'dbo.territory.state.state_code', '0', '0', '0', '1', '1', '0', '15', null, null, null),
('city', 'field', 'text', null, 'sec.organization.city', null, '0', '0', '0', '1', '1', '0', '15', null, null, null),
('postalCode', 'field', 'text', null, 'sec.organization.postal_code', null, '0', '0', '0', '1', '1', '0', '15', null, null, null),
('phoneNumber', 'field', 'text', null, 'sec.organization.phone_number', null, '0', '0', '0', '1', '1', '0', '15', null, null, null),
('faxNumber', 'field', 'text', null, 'sec.organization.fax_number', null, '0', '0', '0', '1', '1', '0', '15', null, null, null),
('website', 'field', 'text', null, 'sec.organization.website', null, '0', '0', '0', '1', '1', '0', '15', null, null, null),
('subdomain', 'field', 'text', null, 'sec.organization.subdomain', null, '0', '0', '1', '1', '1', '0', '15', null, null, null),
('businessType', 'field', 'select', null, 'sec.organization.business_type_id', 'dbo.business_type.name.id', '0', '0', '1', '1', '1', '0', '15', null, null, null),
--location=6
('name', 'field', 'text', null, 'org.location.name', null, '0', '0', '1', '1', '1', '0', '6', null, null, null),
('streetAddress', 'field', 'text', null, 'org.location.street_address', null, '0', '0', '0', '1', '1', '0', '6', null, null, null),
('country', 'field', 'select', null, 'org.location.territory_id', 'dbo.territory.country.country_code', '0', '0', '0', '1', '1', '0', '6', null, null, null),
('state', 'field', 'select', null, 'org.location.territory_id', 'dbo.territory.state.state_code', '0', '0', '0', '1', '1', '0', '6', null, null, null),
('city', 'field', 'text', null, 'org.location.city', null, '0', '0', '0', '1', '1', '0', '6', null, null, null),
('postalCode', 'field', 'text', null, 'org.location.postal_code', null, '0', '0', '0', '1', '1', '0', '6', null, null, null),
('phoneNumber', 'field', 'text', null, 'org.location.phone_number', null, '0', '0', '0', '1', '1', '0', '6', null, null, null),
('faxNumber', 'field', 'text', null, 'org.location.fax_number', null, '0', '0', '0', '1', '1', '0', '6', null, null, null);

-- CREATE TABLE FORM_FIELD
CREATE TABLE IF NOT EXISTS org.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,
  title VARCHAR(255),
  description TEXT,

  position INT DEFAULT 0,
  parent_id VARCHAR(10) DEFAULT 'f_main',

  is_required BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(form_id, field_id),
  FOREIGN KEY(form_id) REFERENCES org.form(id) ON DELETE SET NULL,
  FOREIGN KEY(field_id) REFERENCES org.field(id) ON DELETE SET NULL
);

CREATE INDEX idx_form_field  ON org.form_field (form_id, field_id);

INSERT
INTO org.form_field(form_id, field_id, title, position)
VALUES
--auth_signup
('1', '6', 'First Name', '0'),
('1', '7', 'Last Name', '1'),
('1', '1', 'Username', '2'),
('1', '2', 'Password', '3'),
('1', '8', 'Email Address', '4'),
('1', '9', 'Phone Number', '5'),
--auth_setup
('2', '17', 'Business Name', '0'),
('2', '27', 'Business Type', '1'),
('2', '26', 'Subdomain', '2'),
('2', '28', 'Location Name', '3'),
('2', '29', 'Street Address', '4'),
('2', '30', 'Country', '5'),
('2', '31', 'State', '6'),
('2', '32', 'City', '7'),
('2', '33', 'Postal Code', '8'),
--user_form
('3', '6', 'First Name', '0'),
('3', '7', 'Last Name', '1'),
('3', '1', 'Username', '2'),
('3', '2', 'Password', '3'),
('3', '3', 'Passcode', '4'),
('3', '8', 'Email Address', '5'),
('3', '9', 'Phone Number', '6'),
('3', '4', 'Location', '7'),
('3', '5', 'Group', '8');

-- CREATE TABLE FORM_COMPONENT
CREATE TABLE IF NOT EXISTS org.form_component(
  form_id INT NOT NULL,
  field_id INT NOT NULL,

  title VARCHAR(255),
  description TEXT,

  position INT DEFAULT 0,
  parent_id INT,

  is_required BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(form_id, field_id),
  FOREIGN KEY(form_id) REFERENCES org.form(id) ON DELETE SET NULL,
  FOREIGN KEY(field_id) REFERENCES org.field(id) ON DELETE SET NULL
);

CREATE INDEX idx_form_component  ON org.form_component (form_id, field_id);

INSERT
INTO org.form_component(form_id, field_id, title, position, parent_id)
VALUES
--user_group_grid
('3', '15', 'Name', '0', 15);


/* DROP TABLES

DROP TABLE IF EXISTS
dbo.form_type,
dbo.form_type_object,
org.form,
org.component,
org.field,
org.form_field,
org.form_component CASCADE;
*/
