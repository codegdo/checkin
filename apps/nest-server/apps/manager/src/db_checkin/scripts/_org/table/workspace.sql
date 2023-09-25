-- Create the '_org.workspace' table
CREATE TABLE IF NOT EXISTS _org.workspace (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  picture_url VARCHAR(255),

  address_id INT,
  phone VARCHAR(20),

  company_id INT,
  owner_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (address_id) REFERENCES main_sec.address(id) ON DELETE CASCADE
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER workspace_update_trigger
BEFORE UPDATE ON _org.workspace
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();
