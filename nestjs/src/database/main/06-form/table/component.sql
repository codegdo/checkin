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