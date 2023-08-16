-- Create the 'main_sec.account' table
CREATE TABLE main_sec.account (
  id SERIAL PRIMARY KEY,
  account_id VARCHAR(10) UNIQUE,
  account_type VARCHAR(15) CHECK (account_type IN ('trial', 'basic', 'premium', 'enterprise')),
  plan_id INT,
  company_id INT NOT NULL,
  
  is_active BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES main_sec.company(id)
);

-- Create a trigger to generate and assign a random account id
CREATE OR REPLACE FUNCTION main_sec.fn_generate_account_id()
RETURNS TRIGGER AS $$
DECLARE
  new_account_id VARCHAR(10);
BEGIN
  LOOP
    new_account_id := fn_generate_random_string(7, 'id_');

    -- Check if the generated account_id already exists in the table
    EXIT WHEN NOT EXISTS (SELECT 1 FROM main_sec.account WHERE account_id = new_account_id);
  END LOOP;

  NEW.account_id := new_account_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires before inserting a new row
CREATE TRIGGER before_insert_generate_account_id
BEFORE INSERT ON main_sec.account
FOR EACH ROW
EXECUTE FUNCTION main_sec.fn_generate_account_id();




-- Create a trigger to generate and assign a random account id
CREATE OR REPLACE FUNCTION main_sec.fn_generate_account_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.account_id := fn_generate_random_string(10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;