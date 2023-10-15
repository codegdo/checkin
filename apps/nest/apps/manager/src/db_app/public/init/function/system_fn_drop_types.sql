CREATE OR REPLACE FUNCTION system_fn_drop_types(
  typeNames TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  type_name TEXT;
BEGIN
  FOREACH type_name IN ARRAY typeNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping functions.
    BEGIN
      EXECUTE 'DROP TYPE IF EXISTS ' || type_name;
      RAISE NOTICE 'Dropped type: %', type_name;
    EXCEPTION
      WHEN others THEN
        RAISE EXCEPTION 'Error dropping type %: %', type_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION system_fn_drop_types(text[]) FROM public;