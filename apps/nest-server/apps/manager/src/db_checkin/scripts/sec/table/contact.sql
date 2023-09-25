-- Create the 'sec.contact' table
CREATE TABLE IF NOT EXISTS sec.contact (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),

  address_id INT,
  user_id INT,
  company_id INT,
 
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (address_id) REFERENCES sec.address(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES sec.user(id) ON DELETE CASCADE
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER contact_update_trigger
BEFORE UPDATE ON sec.contact
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();