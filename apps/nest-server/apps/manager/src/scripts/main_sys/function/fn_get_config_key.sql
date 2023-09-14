-- Create a function to check a configuration key's existence, data type, and value
CREATE OR REPLACE FUNCTION main_sys.fn_get_config_key(key_name VARCHAR(255))
RETURNS TABLE (
  key_exists BOOLEAN,
  key_data_type VARCHAR(50),
  key_value TEXT
) AS $$
BEGIN
  SELECT
    EXISTS (
      SELECT 1
      FROM main_sys.config
      WHERE name = key_name
    ),
    COALESCE(data_type, 'unknown') AS data_type,
    COALESCE(value, default_value) AS value
  INTO
    key_exists,
    key_data_type,
    key_value
  FROM main_sys.config
  WHERE name = key_name;
  
  RETURN;
END;
$$ LANGUAGE plpgsql;
