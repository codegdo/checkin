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
('1', 'user_signup', '0'),
('2', 'user_add', '0');

-- CREATE TABLE FORM_TYPE_OBJECT
CREATE TABLE IF NOT EXISTS dbo.form_type_object (
  form_type_id INT NOT NULL,
  object_id INT NOT NULL,
  biz_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(form_type_id, object_id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL
);

CREATE INDEX idx_form_type_object  ON dbo.form_type_object (form_type_id, object_id);

INSERT
INTO dbo.form_type_object(form_type_id, object_id, biz_id)
VALUES
--auth_signup
('1', '1', null),
('1', '2', null),
('1', '6', null),
('1', '15', null),
--user_add
('2', '1', null),
('2', '4', null);

-- CREATE TABLE FORM
CREATE TABLE IF NOT EXISTS org.form (
  id SERIAL,
  name VARCHAR(95),
  label VARCHAR(95),
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
      "label": "Submit",
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
  biz_id INT,

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
INTO org.form (name, label, description, form_type_id, biz_id, is_publish)
VALUES
('auth_signup', 'Signup', null, '1', null, '1'),
('auth_setup', 'Setup', null, '1', null, '1'),
('user_add', 'Users', null, '2', null, '1');

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

  dependent_id INT REFERENCES org.field(id) ON DELETE SET NULL,
  parent_id INT REFERENCES org.field(id) ON DELETE SET NULL,
  component_id INT,
  object_id INT,
  biz_id INT,

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
('accessType', 'field', 'radio', '3', 'sec.user.custom', 'dbo.group_type.name.id', '1', '0', '1', '1', null, null, null),
('groupId', 'field', 'radio', null, 'sec.user.group_id', 'sec.group.name.id', '0', '1', '1', '1', null, '4', null),

--contact=2
('firstName', 'field', 'text', null, 'org.contact.first_name', null, '0', '0', '1', '2', null, null, null),
('lastName', 'field', 'text', null, 'org.contact.last_name', null, '0', '0', '1', '2', null, null, null),
('emailAddress', 'field', 'text', null, 'org.contact.email_address', null, '0', '0', '1', '2', null, null, null),
('phoneNumber', 'field', 'text', null, 'org.contact.phone_number', null, '0', '0', '1', '2', null, null, null),
('streetAddress', 'field', 'text', null, 'org.contact.street_address', null, '0', '0', '0', '2', null, null, null),
('country', 'field', 'select', null, 'org.contact.country', 'dbo.territory.country.country_code', '0', '0', '0', '2', null, null, null),
('state', 'field', 'select', null, 'org.contact.state', 'dbo.territory.state.state_code', '0', '0', '0', '2', null, null, null),
('city', 'field', 'text', null, 'org.contact.city', null, '0', '0', '0', '2', null, null, null),
('postalCode', 'field', 'text', null, 'org.contact.postal_code', null, '0', '0', '0', '2', null, null, null),

--group=4
('groupGrid', 'component', 'grid', null, 'sec.group', null, '0', '0', '1', '4', '1', null, null),
('name', 'field', 'text', null, 'sec.group.name', null, '0', '0', '1', '4', '1', null, '14'),

--business=15
('name', 'field', 'text', null, 'org.business.name', null, '0', '0', '1', '15', null, null, null),
('streetAddress', 'field', 'text', null, 'org.business.street_address', null, '0', '0', '0', '15', null, null, null),
('country', 'field', 'select', null, 'org.business.country', 'dbo.territory.country.country_code', '0', '0', '0', '15', null, null, null),
('state', 'field', 'select', null, 'org.business.state', 'dbo.territory.state.state_code', '0', '0', '0', '15', null, null, null),
('city', 'field', 'text', null, 'org.business.city', null, '0', '0', '0', '15', null, null, null),
('postalCode', 'field', 'text', null, 'org.business.postal_code', null, '0', '0', '0', '15', null, null, null),
('phoneNumber', 'field', 'text', null, 'org.business.phone_number', null, '0', '0', '0', '15', null, null, null),
('faxNumber', 'field', 'text', null, 'org.business.fax_number', null, '0', '0', '0', '15', null, null, null),
('website', 'field', 'text', null, 'org.business.website', null, '0', '0', '0', '15', null, null, null),
('subdomain', 'field', 'text', null, 'org.business.subdomain', null, '0', '0', '1', '15', null, null, null),
--store=6
('name', 'field', 'text', null, 'org.store.name', null, '0', '0', '1', '6', null, null, null),
('streetAddress', 'field', null, 'text', 'org.store.street_address', null, '0', '0', '0', '6', null, null, null),
('country', 'field', 'select', null, 'org.store.country', 'dbo.territory.country.country_code', '0', '0', '0', '6', null, null, null),
('state', 'field', 'select', null, 'org.store.state', 'dbo.territory.state.state_code', '0', '0', '0', '6', null, null, null),
('city', 'field', 'text', null, 'org.store.city', null, '0', '0', '0', '6', null, null, null),
('postalCode', 'field', 'text', null, 'org.store.postal_code', null, '0', '0', '0', '6', null, null, null),
('phoneNumber', 'field', 'text', null, 'org.store.phone_number', null, '0', '0', '0', '6', null, null, null),
('faxNumber', 'field', 'text', null, 'org.store.fax_number', null, '0', '0', '0', '6', null, null, null);

-- CREATE TABLE FORM_FIELD
CREATE TABLE IF NOT EXISTS org.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,
  label VARCHAR(255),
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
INTO org.form_field(form_id, field_id, label, position)
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
('2', '26', 'Subdomain', '1'),
('2', '27', 'Store Name', '2'),
('2', '28', 'Street Address', '3'),
('2', '29', 'Country', '4'),
('2', '30', 'State', '5'),
('2', '31', 'City', '6'),
('2', '32', 'Postal Code', '7'),
--user_add
('3', '1', 'Username', '0'),
('3', '2', 'Password', '1'),
('3', '3', 'Passcode', '2'),
('3', '4', 'Access Type', '3'),
('3', '5', 'Group', '4');

-- CREATE TABLE FORM_COMPONENT
CREATE TABLE IF NOT EXISTS org.form_component(
  form_id INT NOT NULL,
  field_id INT NOT NULL,

  label VARCHAR(255),
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
INTO org.form_component(form_id, field_id, label, position, parent_id)
VALUES
--user_group_grid
('3', '15', 'Name', '0', 15);


-- DROP TABLES

DROP TABLE IF EXISTS
dbo.form_type,
dbo.form_type_object,
org.form,
org.component,
org.field,
org.form_field,
org.form_component CASCADE;
