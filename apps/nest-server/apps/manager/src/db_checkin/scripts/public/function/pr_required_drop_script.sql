CREATE OR REPLACE PROCEDURE pr_required_drop_script(
  script_names TEXT[] DEFAULT '{}'
)
AS $$
DECLARE
  script_name TEXT;
BEGIN
  FOREACH script_name IN ARRAY script_names
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping functions.
    BEGIN
      EXECUTE 'DROP FUNCTION IF EXISTS ' || script_name;
      RAISE NOTICE 'Dropped function: %', script_name;
    EXCEPTION
      WHEN others THEN
        RAISE NOTICE 'Error dropping function %: %', script_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;