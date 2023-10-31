-- Create the 'role' table if it doesn't exist
CREATE TABLE IF NOT EXISTS "role" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  role_level INT DEFAULT 1,
  role_type_id INT NOT NULL,
  company_id INT,
  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50),
  FOREIGN KEY (role_type_id) REFERENCES role_type(id)
);

DO $$
DECLARE
  internal_id INT;
  external_id INT;
  system_id INT;
BEGIN
  -- Find the ID of the 'Database Initialization' migration category
  SELECT id INTO internal_id FROM role_type WHERE name = 'internal';
  SELECT id INTO external_id FROM role_type WHERE name = 'external';
  SELECT id INTO system_id FROM role_type WHERE name = 'system';

  -- Check if the 'role' table has no records
  IF NOT EXISTS (SELECT 1 FROM "role") THEN
    -- Insert data into the 'role' table
    INSERT INTO "role" (name, role_level, role_type_id, is_owner, is_active)
    VALUES
    ('Internal', 0, internal_id, TRUE, TRUE),
    ('External', 0, external_id, FALSE, TRUE),
    ('System', 0, system_id, TRUE, TRUE);
  ELSE
    -- The 'role' table has records
    RAISE NOTICE 'The role table is not empty.';
  END IF;
END;
$$;
