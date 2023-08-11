-- Create the 'main_sec.account' table
CREATE TABLE main_sec.account (
  id SERIAL PRIMARY KEY,
  account_id VARCHAR(10) UNIQUE,
  owner_id INT NOT NULL,
  company_id INT NOT NULL,
  plan_id INT,
  is_active BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES main_sec.company(id),
  FOREIGN KEY (owner_id) REFERENCES main_sec.user(id)
);

-- Create a trigger to generate and assign a random account id
CREATE OR REPLACE FUNCTION main_sec.fn_generate_account_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.account_id := generate_random_string(10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires before inserting a new row
CREATE TRIGGER before_insert_generate_account_id
BEFORE INSERT ON main_sec.account
FOR EACH ROW
EXECUTE FUNCTION main_sec.generate_account_id();