CREATE OR REPLACE PROCEDURE pr_drop_schemas(
  schemaNames TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  schema_name TEXT;
BEGIN
  FOREACH schema_name IN ARRAY schemaNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping schemas.
    BEGIN
      EXECUTE 'DROP SCHEMA IF EXISTS ' || schema_name;
      RAISE NOTICE 'Dropped schema: %', schema_name;
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Error dropping schema %: %', schema_name, SQLERRM;
    END;
  END LOOP;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_drop_schemas(text[]) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_drop_schemas(text[]) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;