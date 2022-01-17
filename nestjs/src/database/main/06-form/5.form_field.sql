-- CREATE TABLE FORM_FIELD
CREATE TABLE IF NOT EXISTS org.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,
  label VARCHAR(255),
  position INT DEFAULT 0,
  is_required BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(form_id, field_id),
  FOREIGN KEY(form_id) REFERENCES org.form(id) ON DELETE SET NULL,
  FOREIGN KEY(field_id) REFERENCES org.field(id) ON DELETE SET NULL
);

CREATE INDEX idx_form_field  ON org.form_field (form_id, field_id);

INSERT
INTO dbo.form_field(form_id, field_id, label)
VALUES
--user
('1', '1', null),
('1', '2', null);