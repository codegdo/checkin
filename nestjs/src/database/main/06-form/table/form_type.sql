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
('1', 'auth_signup', '0'),
('2', 'user_form', '0');