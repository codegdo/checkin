-- Create the 'main_sec.address' table
CREATE TABLE main_sec.address (
  id SERIAL PRIMARY KEY,
  street_address VARCHAR(255),
  territory_id INT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER address_update_trigger
BEFORE UPDATE ON main_sec.address
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();
