CREATE TABLE main_com.workspace (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  picture_url VARCHAR(255),

  address_id INT,
  phone VARCHAR(20),

  company_id INT,
  owner_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER workspace_update_trigger
BEFORE UPDATE ON main_com.workspace
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();
