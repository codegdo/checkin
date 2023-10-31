-- Create the 'role_type' table
CREATE TABLE IF NOT EXISTS role_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END
);

DO $$
BEGIN
  -- Check if the role_type table has no records
  IF (SELECT COUNT(*) FROM role_type) = 0 THEN
   -- Insert data into the 'group_type' table
    INSERT INTO role_type (name, description)
    VALUES
      ('internal', 'Internal group - Internal access only'),
      ('external', 'External group - External access only'),
      ('system', 'System group - System-wide access');
  ELSE
    -- The role_type table has records
    RAISE NOTICE 'The role_type table is not empty.';
  END IF;
END;
$$;