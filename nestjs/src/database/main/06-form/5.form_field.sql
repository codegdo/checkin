-- CREATE TABLE FORM_FIELD
CREATE TABLE IF NOT EXISTS org.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,
  label VARCHAR(255),
  description TEXT,

  position INT DEFAULT 0,
  position_id VARCHAR(10) DEFAULT 'f-aaaa',

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
--login
('1', '1', 'Username', '0'),
('1', '2', 'Password', '1'),
--signup
('2', '4', 'First Name', '0'),
('2', '5', 'Last Name', '1'),
('2', '1', 'Username', '2'),
('2', '2', 'Password', '3'),
('2', '6', 'Email Address', '4'),
('2', '7', 'Phone Number', '5');