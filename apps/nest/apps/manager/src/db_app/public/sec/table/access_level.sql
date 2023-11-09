CREATE TABLE IF NOT EXISTS access_level (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  description TEXT,
  level INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END
);

DO $$
BEGIN
  -- Check if the access_level table has no records
  IF (SELECT COUNT(*) FROM access_level) = 0 THEN
   -- Insert data into the 'access_level' table
    INSERT INTO access_level (name, description, level)
    VALUES
      ('Read', 'This permission type allows users to view or read data and resources. It is typically used for viewing information without the ability to make changes.', 1),
      ('Write', 'Write permissions grant users the ability to modify, edit, or update data. Users with write permissions can make changes to resources or create new ones.', 2),
      ('No Access', 'No access permissions deny any access to a resource or feature. Users with no access permissions are explicitly prevented from interacting with the resource.', 0);
  ELSE
    -- The access_level table has records
    RAISE NOTICE 'The access_level table is not empty.';
  END IF;
END;
$$;