-- Create the 'main_sec.company' table
CREATE TABLE main_sec.company (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  logo_url VARCHAR(255),

  billing_address_id INT,
  shipping_address_id INT,

  phone VARCHAR(20),
  fax VARCHAR(20),
  website VARCHAR(100),

  employees_count INT,
  locations_count INT,
  business_type_id INT,
  owner_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (business_type_id) REFERENCES main_dbo.business_type(id),
  FOREIGN KEY (billing_address_id) REFERENCES main_sec.address(id) ON DELETE CASCADE,
  FOREIGN KEY (shipping_address_id) REFERENCES main_sec.address(id) ON DELETE CASCADE
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER company_update_trigger
BEFORE UPDATE ON main_sec.company
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();
