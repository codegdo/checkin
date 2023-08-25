-- Create the 'main_sec.account' table
CREATE TABLE main_sec.account (
  id SERIAL PRIMARY KEY,
  account_id VARCHAR(10) UNIQUE,
  account_type VARCHAR(15) CHECK (account_type IN ('trial', 'basic', 'premium', 'enterprise')),
  plan_id INT,
  company_id INT NOT NULL,
  
  is_active BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),
  FOREIGN KEY (company_id) REFERENCES main_sec.company(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER account_update_trigger
BEFORE UPDATE ON main_sec.account
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();

-- Create a trigger that fires before inserting a new row
CREATE TRIGGER before_insert_generate_account_id
BEFORE INSERT ON main_sec.account
FOR EACH ROW
EXECUTE FUNCTION main_sec.fn_generate_account_id();
