DO $$
BEGIN
  
  -- System Configuration Table
  CREATE TABLE IF NOT EXISTS config (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    value TEXT,
    data_type VARCHAR(50),
    description TEXT,
    display_name VARCHAR(255),
    default_value TEXT,
    category VARCHAR(255),
    is_enabled BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50) DEFAULT CURRENT_USER,
    updated_by VARCHAR(50)
  );

  -- Check if the config table has no records
  IF (SELECT COUNT(*) FROM config) = 0 THEN
    -- Insert data into the config table
    INSERT INTO config (name, display_name, value, default_value, data_type, description, category, is_enabled) VALUES
    ('ENABLE_DROP_DB_SYSTEM_CONFIG','Enable Drop DB System Config','TRUE','FALSE','boolean','Enable or disable drop database system configuration','System Configuration',TRUE);
  ELSE
    -- The config table has records
    RAISE NOTICE 'The migration table is not empty.';
  END IF;

END;
$$;