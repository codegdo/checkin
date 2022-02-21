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