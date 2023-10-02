-- Create the 'language' table
CREATE TABLE IF NOT EXISTS language (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  code VARCHAR(10) NOT NULL,
  native_name VARCHAR(100),
  region VARCHAR(50),
  is_active BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END
);

DO $$
BEGIN
  -- Check if the language table has no records
  IF (SELECT COUNT(*) FROM language) = 0 THEN
    -- Insert data into the 'language' table
    INSERT INTO language (name, code, native_name, region, is_active)
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
  ELSE
    -- The language table has records
    RAISE NOTICE 'The language table is not empty.';
  END IF;
END;
$$;