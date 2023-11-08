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
      ('Internal', 'Trusted insiders who are employees of the organization'),
      ('External', 'External stakeholders, including customers, partners, and vendors.'),
      ('System', 'Automated or system-level accounts for software and processes.');
  ELSE
    -- The role_type table has records
    RAISE NOTICE 'The role_type table is not empty.';
  END IF;
END;
$$;