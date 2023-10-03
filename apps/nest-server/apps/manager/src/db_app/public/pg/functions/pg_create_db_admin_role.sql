CREATE OR REPLACE FUNCTION create_db_admin_role()
RETURNS VOID AS $$
BEGIN
  -- Create db_admin_role
  CREATE ROLE db_admin_role;

  -- Grant CREATE ROLE to db_admin_role
  GRANT CREATE ROLE TO db_admin_role;

  -- Grant CREATE and USAGE privileges on the public schema to db_admin_role
  GRANT CREATE, USAGE ON SCHEMA public TO db_admin_role;

  -- Optionally, grant other privileges as needed
  -- GRANT <privileges> ON <object> TO db_admin_role;

  -- Commit the changes
  COMMIT;
END;
$$ LANGUAGE plpgsql;
