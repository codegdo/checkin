DO $$
DECLARE
  function_names TEXT[] := ARRAY[]::TEXT[];
  function_name TEXT;

BEGIN
  -- Functions
  PERFORM _fn_drop_functions(function_names);

END $$;