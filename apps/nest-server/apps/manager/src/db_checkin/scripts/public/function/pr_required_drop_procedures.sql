CREATE OR REPLACE PROCEDURE pr_required_drop_procedures(
  procedure_names TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  procedure_name TEXT;
BEGIN
  FOREACH procedure_name IN ARRAY procedure_names
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping procedures.
    BEGIN
      EXECUTE 'DROP PROCEDURE ' || procedure_name; -- Corrected SQL statement
      RAISE NOTICE 'Dropped procedure: %', procedure_name;
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Error dropping procedure %: %', procedure_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;
