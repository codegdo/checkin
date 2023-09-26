DO $$
DECLARE
  function_names TEXT[] := ARRAY[]::TEXT[];
  function_name TEXT;

BEGIN
  -- Functions
  CALL pr_drop_functions(function_names);

END $$;