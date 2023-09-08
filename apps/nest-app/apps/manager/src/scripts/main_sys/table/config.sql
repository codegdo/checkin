-- System Configuration Table
CREATE TABLE main_sys.config (
    id SERIAL PRIMARY KEY,
    config_name VARCHAR(255) UNIQUE NOT NULL,
    config_value TEXT,
    data_type VARCHAR(50),
    description TEXT,
    display_name VARCHAR(255),
    default_value TEXT,
    category VARCHAR(255),
    is_enabled BOOLEAN DEFAULT true
);

INSERT INTO system_config (config_name, config_value, data_type, description)
VALUES
    ('app_name', 'MyApp', 'string', 'Name of the application'),
    ('max_users', '100', 'integer', 'Maximum number of users allowed'),
    ('enable_feature_x', 'true', 'boolean', 'Enable or disable Feature X');
