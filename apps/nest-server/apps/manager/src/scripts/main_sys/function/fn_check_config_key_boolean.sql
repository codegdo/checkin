-- Create a function to validate a configuration key as boolean and allow actions
CREATE OR REPLACE FUNCTION main_sys.fn_check_config_key_boolean(key_name VARCHAR(255))
RETURNS BOOLEAN AS $$
DECLARE
  key_data_type VARCHAR(50);
  key_value TEXT;
BEGIN
  -- Retrieve the data type and value of the configuration key
  SELECT
    data_type,
    value
  INTO
    key_data_type,
    key_value
  FROM main_sys.config
  WHERE name = key_name;
  
  -- Check if the key exists and has a boolean data type
  IF key_data_type = 'boolean' THEN
    -- Allow actions based on the boolean value
    IF key_value = 'TRUE' THEN
      -- Perform actions when the value is true
      -- For example: RAISE NOTICE 'Configuration key is true';
      RETURN true;
    ELSIF key_value = 'FALSE' THEN
      -- Perform actions when the value is false
      -- For example: RAISE NOTICE 'Configuration key is false';
      RETURN false;
    ELSE
      -- Handle unexpected value (neither true nor false)
      -- For example: RAISE EXCEPTION 'Invalid value for boolean configuration key';
    END IF;
  ELSE
    -- Handle when the data type is not boolean
    -- For example: RAISE EXCEPTION 'Configuration key is not boolean';
  END IF;
  
  -- Return a default value (e.g., false) for non-boolean keys
  RETURN false;
END;
$$ LANGUAGE plpgsql;

/*
DO $$
BEGIN
  IF main_sys.fn_check_config_key_boolean('ENABLE_DROP_DB_SYSTEM_CONFIG') THEN
    RAISE NOTICE 'Feature X is enabled.';
  ELSE
    RAISE NOTICE 'Feature X is not enabled.';
  END IF;
END;
$$;
*/
