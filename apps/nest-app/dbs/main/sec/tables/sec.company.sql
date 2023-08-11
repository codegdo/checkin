CREATE TABLE main_sec.company (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  logo_url VARCHAR(255),

  address VARCHAR(255),
  territory_id INT,
  city VARCHAR(50),
  zip_code VARCHAR(10),
  phone VARCHAR(20),
  website VARCHAR(100),

  employees_count INT,
  locations_count INT,
  business_type_id INT,

  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (business_type_id) REFERENCES main_dbo.business_type(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER company_update_trigger
BEFORE UPDATE ON main_sec.company
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();
