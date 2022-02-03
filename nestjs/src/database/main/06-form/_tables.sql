-- CREATE TABLE FORM_TYPE
CREATE TABLE IF NOT EXISTS dbo.form_type (
  id SERIAL,
  name VARCHAR(255),

  is_custom BOOLEAN DEFAULT FALSE,

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
('1', 'user', '0');

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
--user
('1', '1', null),
('1', '2', null);

-- CREATE TABLE FORM
CREATE TABLE IF NOT EXISTS org.form (
  id SERIAL,
  name VARCHAR(95),
  label VARCHAR(95),
  description VARCHAR(255),

  data JSONB NOT NULL DEFAULT '[
    {
      "id": "f-header",
      "type": "header",
      "role": "block",
      "data": [],
      "position": 0,
      "parentId": null
    },
    {
      "id": "f-main",
      "type": "main",
      "role": "block",
      "data": [],
      "position": 1,
      "parentId": null
    },
    {
      "id": "f-footer",
      "type": "footer",
      "role": "block",
      "data": [],
      "position": 2,
      "parentId": null
    },
    {
      "id": "f-button",
      "label": "Submit",
      "name": "submit",
      "type": "button",
      "role": "inline",
      "data": null,
      "value": null,
      "position": 3,
      "parentId": "f-footer"
    }
  ]'::jsonb,

  form_type_id INT,
  org_id INT,

  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL
);

INSERT
INTO org.form (name, label, description, form_type_id, org_id, is_active)
VALUES
('auth_signup', 'Signup', null, '1', null, '1'),
('auth_setup', 'Setup', null, '1', null, '1');

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
('country', 'field', 'select', 'org.contact.country', 'dbo.territory.country.country_code', '0', '2'),
('state', 'field', 'select', 'org.contact.state', 'dbo.territory.state.state_code', '0', '2'),
('city', 'field', 'text', 'org.contact.city', null, '0', '2'),
('postalCode', 'field', 'text', 'org.contact.postal_code', null, '0', '2'),
--organization=15
('name', 'field', 'text', 'sec.organization.name', null, '1', '15'),
('streetAddress', 'field', 'text', 'sec.organization.street_address', null, '0', '15'),
('country', 'field', 'select', 'sec.organization.country', 'dbo.territory.country.country_code', '0', '15'),
('state', 'field', 'select', 'sec.organization.state', 'dbo.territory.state.state_code', '0', '15'),
('city', 'field', 'text', 'sec.organization.city', null, '0', '15'),
('postalCode', 'field', 'text', 'sec.organization.postal_code', null, '0', '15'),
('phoneNumber', 'field', 'text', 'sec.organization.phone_number', null, '0', '15'),
('faxNumber', 'field', 'text', 'sec.organization.fax_number', null, '0', '15'),
('website', 'field', 'text', 'sec.organization.website', null, '0', '15'),
('subdomain', 'field', 'text', 'sec.organization.subdomain', null, '1', '15'),
--workspace=6
('name', 'field', 'text', 'org.workspace.name', null, '1', '6'),
('streetAddress', 'field', 'text', 'org.workspace.street_address', null, '0', '6'),
('country', 'field', 'select', 'org.workspace.country', 'dbo.territory.country.country_code', '0', '6'),
('state', 'field', 'select', 'org.workspace.state', 'dbo.territory.state.state_code', '0', '6'),
('city', 'field', 'text', 'org.workspace.city', null, '0', '6'),
('postalCode', 'field', 'text', 'org.workspace.postal_code', null, '0', '6'),
('phoneNumber', 'field', 'text', 'org.workspace.phone_number', null, '0', '6'),
('faxNumber', 'field', 'text', 'org.workspace.fax_number', null, '0', '6');

-- CREATE TABLE FORM_FIELD
CREATE TABLE IF NOT EXISTS org.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,
  label VARCHAR(255),
  description TEXT,

  position INT DEFAULT 0,
  parent_id VARCHAR(10) DEFAULT 'f-main',

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
('1', '4', 'First Name', '0'),
('1', '5', 'Last Name', '1'),
('1', '1', 'Username', '2'),
('1', '2', 'Password', '3'),
('1', '6', 'Email Address', '4'),
('1', '7', 'Phone Number', '5'),
--auth_setup
('2', '13', 'Organization Name', '0'),
('2', '22', 'Subdomain', '1'),
('2', '23', 'Location Name', '2'),
('2', '24', 'Street Address', '3'),
('2', '25', 'Country', '4'),
('2', '26', 'State', '5'),
('2', '27', 'City', '6'),
('2', '28', 'Postal Code', '7');



-- SELECT TABLES

SELECT
f.name,
fld.id,
fld.name,
fld.data
FROM org.form f
LEFT JOIN dbo.form_type ft ON f.form_type_id = ft.id
LEFT JOIN dbo.form_type_object fto ON ft.id = fto.form_type_id
LEFT JOIN dbo.object o ON fto.object_id = o.id
LEFT JOIN org.field fld ON o.id = fld.object_id
WHERE f.name = 'login';

SELECT * FROM dbo.object;

--

-- DROP TABLES

DROP TABLE IF EXISTS
dbo.form_type,
dbo.form_type_object,
org.form,
org.field,
org.form_field CASCADE;

-- END