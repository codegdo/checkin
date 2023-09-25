-- _system Configuration Table
CREATE TABLE IF NOT EXISTS _sys.config (
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

-- Insert data into the _sys.config table
INSERT INTO _sys.config (name, display_name, value, default_value, data_type, description, category, is_enabled) VALUES
('ENABLE_DROP_DB__sysTEM_CONFIG','Enable Drop DB _system Config','TRUE','FALSE','boolean','Enable or disable drop database _system configuration','_system Configuration',TRUE);

