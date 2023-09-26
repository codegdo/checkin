-- Create a function to validate a configuration key as boolean and allow actions
CREATE OR REPLACE FUNCTION fn_is_config_key_boolean(
  configName VARCHAR,
  expectedValue VARCHAR DEFAULT '',
  operation VARCHAR DEFAULT '=',
  caseSensitive BOOLEAN DEFAULT true) RETURNS BOOLEAN AS $$
DECLARE
  key_data_type VARCHAR;
  key_value TEXT;
  key_integer INTEGER;
BEGIN
  -- Retrieve the data type and value of the configuration key
  SELECT
    data_type,
    value
  INTO
    key_data_type,
    key_value
  FROM config
  WHERE name = configName;

  -- Check if the key exists and has a boolean or integer data type
  IF key_data_type = 'boolean' THEN
    IF LOWER(key_value) = 'true' THEN
      RETURN true;
    ELSIF LOWER(key_value)  = 'false' THEN
      RETURN false;
    ELSE
      -- Handle unexpected value (neither true nor false)
      -- RAISE EXCEPTION 'Invalid value for boolean configuration key';
    END IF;
  ELSIF key_data_type = 'integer' THEN
    -- Try to convert the key value to an integer
    BEGIN
      key_integer := key_value::INTEGER;
    EXCEPTION
      WHEN OTHERS THEN
        -- Handle conversion error (value is not an integer)
        RAISE EXCEPTION 'Value for integer key is not a valid integer';
    END;

    -- Perform the specified integer comparison operation
    IF operation = '=' THEN
      RETURN (key_integer = expectedValue::INTEGER);
    ELSEIF operation = '!=' THEN
      RETURN (key_integer != expectedValue::INTEGER);
    ELSEIF operation = '<' THEN
      RETURN (key_integer < expectedValue::INTEGER);
    ELSEIF operation = '>' THEN
      RETURN (key_integer > expectedValue::INTEGER);
    ELSEIF operation = '<=' THEN
      RETURN (key_integer <= expectedValue::INTEGER);
    ELSEIF operation = '>=' THEN
      RETURN (key_integer >= expectedValue::INTEGER);
    ELSE
      -- Handle unsupported comparison operations for integer
      -- RAISE EXCEPTION 'Unsupported operation for integer data type: %', operation;
    END IF;

  ELSIF key_data_type = 'string' THEN
    -- Perform string comparison with or without case sensitivity
    IF caseSensitive THEN
      IF key_value = expectedValue THEN
        RETURN true;
      ELSE
        RETURN false;
      END IF;
    ELSE
      IF LOWER(key_value) = expectedValue THEN
        RETURN true;
      ELSE
        RETURN false;
      END IF;
    END IF;
  ELSE
    -- Handle when the data type is neither boolean, integer, nor string
    -- RAISE EXCEPTION 'Unsupported data type for configuration key: %', key_data_type;
  END IF;

  -- Return a default value (e.g., false) for non-boolean keys
  RETURN false;
END;
$$ LANGUAGE plpgsql;


/*
DO $$
BEGIN
  IF fn_is_config_key_boolean('ENABLE_DROP_DB__sysTEM_CONFIG') THEN
    RAISE NOTICE 'Feature X is enabled.';
  ELSE
    RAISE NOTICE 'Feature X is not enabled.';
  END IF;
END;
$$;
*/

