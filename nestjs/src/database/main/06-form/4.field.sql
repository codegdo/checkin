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