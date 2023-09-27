-- Create the 'group_type' table
CREATE TABLE IF NOT EXISTS group_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

DO $$
BEGIN
  -- Check if the group_type table has no records
  IF (SELECT COUNT(*) FROM group_type) = 0 THEN
   -- Insert data into the 'group_type' table
    INSERT INTO group_type (name, description)
    VALUES
      ('Internal', 'Internal group - Internal access only'),
      ('External', 'External group - External access only'),
      ('System', 'System group - System-wide access');
  ELSE
    -- The group_type table has records
    RAISE NOTICE 'The group_type table is not empty.';
  END IF;
END;
$$;