CREATE OR REPLACE PROCEDURE pr_drop_tables(
  tableNames TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  table_name TEXT;
BEGIN
  FOREACH table_name IN ARRAY tableNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping tables.
    BEGIN
      EXECUTE 'DROP TABLE IF EXISTS ' || table_name;
      RAISE NOTICE 'Dropped table: %', table_name;
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Error dropping table %: %', table_name, SQLERRM;
    END;
  END LOOP;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_drop_tables(text[]) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_drop_tables(text[]) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;
