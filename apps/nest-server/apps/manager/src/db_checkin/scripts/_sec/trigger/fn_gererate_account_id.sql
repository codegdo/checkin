-- Create a trigger to generate and assign a random account id
CREATE OR REPLACE FUNCTION _sec.fn_generate_account_id()
RETURNS TRIGGER AS $$
DECLARE
  new_account_id VARCHAR(10);
BEGIN
  LOOP
    new_account_id := fn_generate_random_string(7, 'id_');

    -- Check if the generated account_id already exists in the table
    EXIT WHEN NOT EXISTS (SELECT 1 FROM _sec.account WHERE account_id = new_account_id);
  END LOOP;

  NEW.account_id := new_account_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires before inserting a new row
CREATE TRIGGER before_insert_generate_account_id
BEFORE INSERT ON _sec.account
FOR EACH ROW
EXECUTE FUNCTION _sec.fn_generate_account_id();


/*
-- Create a trigger to generate and assign a random account id
CREATE OR REPLACE FUNCTION _sec.fn_generate_account_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.account_id := fn_generate_random_string(10);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;
*/