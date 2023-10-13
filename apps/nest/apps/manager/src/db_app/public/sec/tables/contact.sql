-- Create the 'contact' table
CREATE TABLE IF NOT EXISTS contact (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),

  street_address VARCHAR(255),
  territory_id INT,
  city VARCHAR(100),
  postal_code VARCHAR(20),

  user_id INT,
  company_id INT,

  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50),

  FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE
);
