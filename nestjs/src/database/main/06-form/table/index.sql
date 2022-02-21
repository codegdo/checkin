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

-- CREATE TABLE GRID_TYPE
CREATE TABLE IF NOT EXISTS dbo.grid_type (
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
INTO dbo.grid_type (id, name, form_type_id)
VALUES
(1, 'user_group_grid', 2);

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
--user_add
('2', '1', null),
('2', '4', null);

-- CREATE TABLE GRID_TYPE_OBJECT
CREATE TABLE IF NOT EXISTS dbo.grid_type_object (
  grid_type_id INT NOT NULL,
  object_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(grid_type_id, object_id),
  FOREIGN KEY(grid_type_id) REFERENCES dbo.grid_type(id) ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL
);

CREATE INDEX idx_grid_type_object  ON dbo.grid_type_object (grid_type_id, object_id);

INSERT
INTO dbo.grid_type_object(grid_type_id, object_id)
VALUES
--user_group_grid
('1', '4');

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
INTO org.form (name, label, description, form_type_id, org_id, is_publish)
VALUES
('auth_signup', 'Signup', null, '1', null, '1'),
('auth_setup', 'Setup', null, '1', null, '1'),
('user_add', 'Users', null, '2', null, '1');

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
('name', 'field', 'text', 'sec.group.name', null, '1', '4', '1', '15'),

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
('1', '5', 'First Name', '0'),
('1', '6', 'Last Name', '1'),
('1', '1', 'Username', '2'),
('1', '2', 'Password', '3'),
('1', '7', 'Email Address', '4'),
('1', '8', 'Phone Number', '5'),
--auth_setup
('2', '16', 'Organization Name', '0'),
('2', '25', 'Subdomain', '1'),
('2', '26', 'Location Name', '2'),
('2', '27', 'Street Address', '3'),
('2', '28', 'Country', '4'),
('2', '29', 'State', '5'),
('2', '30', 'City', '6'),
('2', '31', 'Postal Code', '7'),
--user_add
('3', '1', 'Username', '0'),
('3', '2', 'Password', '1'),
('3', '3', 'Passcode', '2'),
('3', '4', 'Access Type', '3');

-- CREATE TABLE GRID_FIELD
CREATE TABLE IF NOT EXISTS org.grid_field (
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

CREATE INDEX idx_grid_field  ON org.grid_field (form_id, field_id);

INSERT
INTO org.grid_field(form_id, field_id, label, position, parent_id)
VALUES
--user_group_grid
('3', '3', 'Name', '0', 15);


-- DROP TABLES

DROP TABLE IF EXISTS
dbo.form_type,
dbo.grid_type,
dbo.form_type_object,
dbo.grid_type_object,
org.form,
org.field,
org.form_field,
org.grid_field CASCADE;
