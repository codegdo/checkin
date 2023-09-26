-- Create a function to check a configuration key's existence, data type, and value
CREATE OR REPLACE FUNCTION fn_get_config_by_key(input_key VARCHAR)
RETURNS TABLE (
  key_exists BOOLEAN,
  key_data_type VARCHAR,
  key_value TEXT
) AS $$
BEGIN
  -- Initialize variables with default values
  key_exists := false;
  key_data_type := 'unknown';
  key_value := null;

  -- Check if the key exists
  IF EXISTS (SELECT 1 FROM config WHERE name = input_key) THEN
    -- Retrieve configuration information if the key exists
    SELECT
      true,
      c.data_type,
      COALESCE(c.value, c.default_value)
    INTO
      key_exists,
      key_data_type,
      key_value
    FROM config c
    WHERE c.name = input_key;
  ELSE
    -- Handle the case where the key does not exist
    RAISE NOTICE 'Key % not found', input_key;
  END IF;

  -- Return the result
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM fn_get_config_key('ENABLE_DROP_DB__sysTEM_CONFIG');