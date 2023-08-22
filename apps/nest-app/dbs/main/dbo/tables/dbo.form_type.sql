CREATE TABLE main_dbo.form_type (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

INSERT INTO main_dbo.form_type (id, name, title) VALUES
(1,'auth_signup','User Signup');
