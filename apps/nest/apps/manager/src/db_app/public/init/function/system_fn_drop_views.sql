CREATE OR REPLACE FUNCTION system_fn_drop_views(
  viewNames TEXT[] DEFAULT '{}'
)
RETURNS void AS $$
DECLARE
  view_name TEXT;
BEGIN
  FOREACH view_name IN ARRAY viewNames
  LOOP
    -- Use a BEGIN ... EXCEPTION block to handle exceptions when dropping functions.
    BEGIN
      EXECUTE 'DROP VIEW IF EXISTS ' || view_name;
      RAISE NOTICE 'Dropped view: %', view_name;
    EXCEPTION
      WHEN others THEN
        RAISE EXCEPTION 'Error dropping view %: %', view_name, SQLERRM;
    END;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION system_fn_drop_views(text[]) FROM public;