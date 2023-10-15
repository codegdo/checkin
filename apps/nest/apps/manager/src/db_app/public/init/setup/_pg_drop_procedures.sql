CREATE OR REPLACE PROCEDURE _pg_drop_procedures(
  procedureNames TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  procedure_name TEXT;
BEGIN
  FOREACH procedure_name IN ARRAY procedureNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping procedures.
    BEGIN
      EXECUTE 'DROP PROCEDURE ' || procedure_name; -- IF EXISTS does not apply for procedure
      RAISE NOTICE 'Dropped procedure: %', procedure_name;
    EXCEPTION
      WHEN others THEN
        RAISE EXCEPTION 'Error dropping procedure %: %', procedure_name, SQLERRM;
    END;
  END LOOP;
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

DO $$
BEGIN
  -- Revoke EXECUTE permission from 'public' role
  REVOKE EXECUTE ON PROCEDURE _pg_drop_procedures(text[]) FROM public;

  -- Check if 'api_manager' role exists
  IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = 'api_manager') THEN
    -- If 'api_manager' role exists, grant EXECUTE permission
    GRANT EXECUTE ON PROCEDURE _pg_drop_procedures(text[]) TO api_manager;
  ELSE
    -- If 'api_manager' role does not exist, raise a notice
    RAISE NOTICE 'The role ''api_manager'' does not exist.';
  END IF;
END $$;
