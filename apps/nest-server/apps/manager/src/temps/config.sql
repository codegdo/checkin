-- System Configuration Table
CREATE TABLE main_sys.config (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  data_type VARCHAR(50),
  description TEXT,
  display_name VARCHAR(255),
  default_value TEXT,
  category VARCHAR(255),
  is_enabled BOOLEAN DEFAULT true
);


-- Insert data into the main_sys.config table
INSERT INTO main_sys.config (name, value, data_type, description, display_name, default_value, category, is_enabled)
VALUES
  ('ENABLE_DB_DROP_ACTION', 'true', 'boolean', 'Enable or disable database drop action', 'Enable DB Drop Action', 'true', 'Database Management', true);

  /*
  ('SMTP_SERVER', 'smtp.example.com', 'string', 'SMTP server for sending email notifications', 'SMTP Server', 'smtp.example.com', 'Email Configuration', true),
  ('SMTP_PORT', '587', 'integer', 'SMTP server port for email communication', 'SMTP Port', '587', 'Email Configuration', true),
  ('SMTP_USERNAME', 'email@example.com', 'string', 'Username for SMTP server authentication', 'SMTP Username', 'email@example.com', 'Email Configuration', true),
  ('SMTP_PASSWORD', '********', 'string', 'Password for SMTP server authentication', 'SMTP Password', '********', 'Email Configuration', true),
  ('DEFAULT_LANGUAGE', 'en', 'string', 'Default language for the application', 'Default Language', 'en', 'Localization', true),
  ('TIMEZONE', 'UTC', 'string', 'Default timezone for the application', 'Timezone', 'UTC', 'Localization', true),
  ('API_KEY', '****************', 'string', 'API key for secure API access', 'API Key', '****************', 'Security', true),
  ('LOG_LEVEL', 'INFO', 'string', 'Logging level for the application', 'Log Level', 'INFO', 'Logging and Auditing', true),
  ('MAX_USERS', '100', 'integer', 'Maximum number of users allowed', 'Max Users', '100', 'User Management Setup', true),
  ('ENABLE_FEATURE_X', 'true', 'boolean', 'Enable or disable Feature X', 'Enable Feature X', 'true', 'Feature Toggle', true),
  
  ('PRODUCT_IMAGE_SIZE', '1024', 'integer', 'Maximum product image size in kilobytes', 'Image Size', '1024', 'Inventory Management Setup', true),
  ('CUSTOM_REPORTS_ENABLED', 'false', 'boolean', 'Enable or disable custom reports feature', 'Custom Reports', 'false', 'Reporting and Dashboard Setup', true),
  ('PAYMENT_GATEWAY_URL', 'https://payment-gateway.com', 'string', 'Payment gateway API URL', 'Payment Gateway URL', 'https://payment-gateway.com', 'Payment Integration Setup', true),
  ('PAYMENT_API_KEY', '****************', 'string', 'API key for payment gateway', 'Payment API Key', '****************', 'Payment Integration Setup', true),
  ('BILLING_CYCLE', 'Monthly', 'string', 'Billing cycle frequency', 'Billing Cycle', 'Monthly', 'Billing and Subscription Setup', true),
  ('INVENTORY_ALERT_THRESHOLD', '10', 'integer', 'Minimum stock quantity for inventory alerts', 'Alert Threshold', '10', 'Inventory Management Setup', true),
  ('CUSTOMER_SUPPORT_EMAIL', 'support@example.com', 'string', 'Customer support email address', 'Support Email', 'support@example.com', 'CRM Setup', true),
  ('ANALYTICS_API_KEY', '****************', 'string', 'API key for analytics service', 'Analytics API Key', '****************', 'Analytics Setup', true),
  ('PUBLIC_API_ENDPOINT', 'https://api.example.com', 'string', 'Public API endpoint URL', 'Public API Endpoint', 'https://api.example.com', 'API Configuration', true),
  ('ADMIN_EMAIL', 'admin@example.com', 'string', 'Admin email address', 'Admin Email', 'admin@example.com', 'User Management Setup', true),
  ('USER_REGISTRATION_ENABLED', 'true', 'boolean', 'Enable or disable user registration', 'User Registration Enabled', 'true', 'User Onboarding Setup', true),
  ('DATA_MIGRATION_SOURCE', 'legacy_system', 'string', 'Source system for data migration', 'Data Migration Source', 'legacy_system', 'Data Migration Setup', true),
  ('SYSTEM_ALERT_EMAIL', 'alerts@example.com', 'string', 'Email address for system alerts', 'Alert Email', 'alerts@example.com', 'System Monitoring and Alerts Setup', true),
  ('DATA_PRIVACY_POLICY', 'https://example.com/privacy-policy', 'string', 'URL to the data privacy policy', 'Data Privacy Policy', 'https://example.com/privacy-policy', 'Compliance and Data Privacy Setup', true),
  ('NOTIFICATION_EMAIL', 'notifications@example.com', 'string', 'Email address for system notifications', 'Notification Email', 'notifications@example.com', 'Notification Preferences Setup', true),
  ('WORKFLOW_AUTOMATION_ENABLED', 'true', 'boolean', 'Enable or disable workflow automation', 'Workflow Automation Enabled', 'true', 'Workflow Automation Setup', true),
  ('USER_WELCOME_EMAIL', 'true', 'boolean', 'Send welcome emails to new users', 'User Welcome Email', 'true', 'User Onboarding Setup', true),
  ('MIGRATION_DATA_SOURCE', 'external_server', 'string', 'Source for data migration (e.g., external server)', 'Migration Data Source', 'external_server', 'Data Migration Setup', true),
  ('SYSTEM_ALERT_SMS', '123-456-7890', 'string', 'Phone number for system SMS alerts', 'SMS Alert Number', '123-456-7890', 'System Monitoring and Alerts Setup', true),
  ('DATA_PRIVACY_POLICY_URL', 'https://example.com/privacy-policy', 'string', 'URL to the data privacy policy', 'Privacy Policy URL', 'https://example.com/privacy-policy', 'Compliance and Data Privacy Setup', true),
  ('USER_ACCESS_CONTROL_ENABLED', 'true', 'boolean', 'Enable or disable user access control', 'User Access Control Enabled', 'true', 'User Access Control Setup', true),
  ('ERROR_HANDLING_EMAIL', 'errors@example.com', 'string', 'Email address for error handling notifications', 'Error Handling Email', 'errors@example.com', 'Error Handling Setup', true),
  ('LOCALE_SETTINGS', 'en_US', 'string', 'Locale settings for date and time formats', 'Locale Settings', 'en_US', 'Localization and Internationalization Setup', true),
  ('PAYMENT_SUCCESS_MESSAGE', 'Payment successful', 'string', 'Success message for payment transactions', 'Payment Success Message', 'Payment Gateway Integration Setup', true),
  ('CUSTOM_THEME_COLORS', '#336699', 'string', 'Custom theme colors for the user interface', 'Custom Theme Colors', '#336699', 'Customization and Theming Setup', true)
  */

