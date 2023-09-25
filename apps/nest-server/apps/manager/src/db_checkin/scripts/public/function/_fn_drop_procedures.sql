CREATE OR REPLACE FUNCTION _fn_drop_procedures(
  procedure_names TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  procedure_name TEXT;
BEGIN
  FOREACH procedure_name IN ARRAY procedure_names
  LOOP
    EXECUTE 'DROP PROCEDURE IF EXISTS ' || quote_ident(procedure_name);

    IF NOT FOUND THEN
      RAISE NOTICE 'Error dropping procedure %', procedure_name;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;