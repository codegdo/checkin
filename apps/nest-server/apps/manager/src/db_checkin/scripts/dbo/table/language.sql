-- Create the 'dbo.language' table
CREATE TABLE IF NOT EXISTS dbo.language (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL,
  native_name VARCHAR(100),
  region VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

-- Insert data into the 'language' table
INSERT INTO dbo.language (name, code, native_name, region, is_active)
VALUES
  ('English', 'en', 'English', 'United States', true),
  ('Spanish', 'es', 'Español', 'Spain', true),
  ('French', 'fr', 'Français', 'France', false),
  ('German', 'de', 'Deutsch', 'Germany', false),
  ('Chinese', 'zh', '中文', 'China', false),
  ('Japanese', 'ja', '日本語', 'Japan', false),
  ('Russian', 'ru', 'Русский', 'Russia', false),
  ('Arabic', 'ar', 'العربية', 'Middle East', false),
  ('Italian', 'it', 'Italiano', 'Italy', false),
  ('Portuguese', 'pt', 'Português', 'Portugal', false);