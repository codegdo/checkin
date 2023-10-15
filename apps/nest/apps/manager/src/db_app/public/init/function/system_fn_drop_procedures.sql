CREATE OR REPLACE FUNCTION system_fn_drop_procedures(
  procedureNames TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
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
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION system_fn_drop_procedures(text[]) FROM public;
