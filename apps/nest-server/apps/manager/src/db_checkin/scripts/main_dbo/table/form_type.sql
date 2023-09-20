-- Create the 'main_dbo.form_type' table
CREATE TABLE IF NOT EXISTS main_dbo.form_type (
  id INT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255),

  default_translation JSONB,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

-- Insert data into the 'form_type' table
INSERT INTO main_dbo.form_type (id, name, title) VALUES
(1,'auth_signup','User Signup');
