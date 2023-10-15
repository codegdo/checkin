CREATE OR REPLACE FUNCTION config_fn_get_config_by_key(configName TEXT)
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
  IF EXISTS (SELECT 1 FROM config WHERE name = configName) THEN
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
    WHERE c.name = configName;
  ELSE
    -- Handle the case where the key does not exist
    RAISE NOTICE 'Key % not found', configName;
  END IF;

  -- Return the result
  RETURN NEXT;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION config_fn_get_config_by_key(text) FROM public;

-- SELECT * FROM config_fn_get_config_by_key('ENABLE_DROP_DB_SYSTEM_CONFIG');

