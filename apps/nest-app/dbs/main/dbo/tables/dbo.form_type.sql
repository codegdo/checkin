CREATE TABLE main_dbo.form_type (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  label VARCHAR(100) NOT NULL,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

INSERT INTO main_dbo.form_type (id, name, label) VALUES
(1,'auth_signup','User Signup');
