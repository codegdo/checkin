-- Create the 'company' table
CREATE TABLE IF NOT EXISTS company (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  logo_url VARCHAR(255),

  billing_street_address VARCHAR(255),
  billing_territory_id INT,
  billing_city VARCHAR(100),
  billing_postal_code VARCHAR(20),

  shipping_street_address VARCHAR(255),
  shipping_territory_id INT,
  shipping_city VARCHAR(100),
  shipping_postal_code VARCHAR(20),

  phone VARCHAR(20),
  fax VARCHAR(20),
  website VARCHAR(100),

  employees_count INT,
  locations_count INT,
  company_type_id INT,
  owner_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50),

  FOREIGN KEY (company_type_id) REFERENCES company_type(id)
);

