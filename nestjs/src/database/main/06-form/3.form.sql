-- CREATE TABLE FORM
CREATE TABLE IF NOT EXISTS org.form (
  id SERIAL,
  name VARCHAR(95),
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
INTO org.form (name, description, form_type_id, org_id, is_active)
VALUES
('login', null, '1', null, '1');