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