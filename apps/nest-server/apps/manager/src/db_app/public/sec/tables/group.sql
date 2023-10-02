-- Create the 'group' table if it doesn't exist
CREATE TABLE IF NOT EXISTS "group" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  group_level INT DEFAULT 1,
  group_type_id INT NOT NULL,
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
  FOREIGN KEY (group_type_id) REFERENCES group_type(id)
);

DO $$
DECLARE
  internal_id INT;
  external_id INT;
  system_id INT;
BEGIN
  -- Find the ID of the 'Database Initialization' migration category
  SELECT id INTO internal_id FROM group_type WHERE name = 'Internal';
  SELECT id INTO external_id FROM group_type WHERE name = 'External';
  SELECT id INTO system_id FROM group_type WHERE name = 'System';

  -- Check if the 'group' table has no records
  IF NOT EXISTS (SELECT 1 FROM "group") THEN
    -- Insert data into the 'group' table
    INSERT INTO "group" (name, group_level, group_type_id, is_owner, is_active)
    VALUES
    ('Internal', 0, internal_id, TRUE, TRUE),
    ('External', 0, external_id, FALSE, TRUE),
    ('System', 0, system_id, TRUE, TRUE);
  ELSE
    -- The 'group' table has records
    RAISE NOTICE 'The group table is not empty.';
  END IF;
END;
$$;
