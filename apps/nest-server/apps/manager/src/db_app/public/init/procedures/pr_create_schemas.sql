CREATE OR REPLACE PROCEDURE pr_create_schemas(
  schemaNames TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  schema_name TEXT;
BEGIN
  FOREACH schema_name IN ARRAY schemaNames
  LOOP
    EXECUTE 'CREATE SCHEMA IF NOT EXISTS ' || schema_name;

    IF NOT FOUND THEN
      RAISE NOTICE 'Error create schema %', schema_name;
    END IF;
  END LOOP;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE pr_create_schemas(text[]) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE pr_create_schemas(text[]) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;