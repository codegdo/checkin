-- USER
CREATE TABLE main_sec.user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  passcode NUMERIC(4),
  group_id INT,
  role_id INT,
  company_id INT,
  is_require_reset BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (group_id) REFERENCES main_sec.group(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER user_update_trigger
BEFORE UPDATE ON main_sec.user
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();


-- Roles help you manage permissions
-- Groups help you manage objects and subjects