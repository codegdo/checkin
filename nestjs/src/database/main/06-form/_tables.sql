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
('login', 'Login', null, '1', null, '1'),
('signup', 'Signup', null, '1', null, '1');

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
--user
('username', 'field', 'text', 'sec.user.username', null, '1', '1'),
('password', 'field', 'password', 'sec.user.password', null, '1', '1'),
('passcode', 'field', 'text', 'sec.user.passcode', null, '1', '1'),
--contact
('first_name', 'field', 'text', 'org.contact.first_name', null, '1', '2'),
('last_name', 'field', 'text', 'org.contact.last_name', null, '1', '2'),
('email_address', 'field', 'text', 'org.contact.email_address', null, '1', '2'),
('phone_number', 'field', 'text', 'org.contact.phone_number', null, '1', '2'),
('street_address', 'field', 'text', 'org.contact.street_address', null, '1', '2'),
('country', 'field', 'text', 'org.contact.territory', 'dbo.territory.country.country_code', '1', '2'),
('state', 'field', 'text', 'org.contact.territory', 'dbo.territory.state.state_code', '1', '2'),
('city', 'field', 'text', 'org.contact.city', null, '1', '2'),
('postal_code', 'field', 'text', 'org.contact.postal_code', null, '1', '2');

-- CREATE TABLE FORM_FIELD
CREATE TABLE IF NOT EXISTS org.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,
  label VARCHAR(255),
  position INT DEFAULT 0,
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
INTO org.form_field(form_id, field_id, label)
VALUES
--login
('1', '1', 'Username'),
('1', '2', 'Password'),
--signup
('2', '4', 'First Name'),
('2', '5', 'Last Name'),
('2', '6', 'Email Address'),
('2', '1', 'Username'),
('2', '2', 'Password'),
('2', '7', 'Phone Number'),
('2', '8', 'Street Address'),
('2', '9', 'Country'),
('2', '10', 'State'),
('2', '11', 'City'),
('2', '12', 'PostalCode');



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