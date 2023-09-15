-- Create a function to check a configuration key's existence, data type, and value
CREATE OR REPLACE FUNCTION main_sys.fn_get_config_key(key_name VARCHAR(255))
RETURNS TABLE (
  key_exists BOOLEAN,
  key_data_type VARCHAR(50),
  key_value TEXT
) AS $$
BEGIN
  -- Initialize variables with default values
  key_exists := false;
  key_data_type := 'unknown';
  key_value := null;

  -- Check if the key exists
  IF EXISTS (SELECT 1 FROM main_sys.config WHERE name = key_name) THEN
    -- Retrieve configuration information if the key exists
    SELECT
      true,
      c.data_type,
      COALESCE(c.value, c.default_value)
    INTO
      key_exists,
      key_data_type,
      key_value
    FROM main_sys.config c
    WHERE c.name = key_name;
  ELSE
    -- Handle the case where the key does not exist
    RAISE NOTICE 'Key % not found', key_name;
  END IF;

  -- Return the result
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM main_sys.fn_get_config_key('ENABLE_DROP_DB_SYSTEM_CONFIG');