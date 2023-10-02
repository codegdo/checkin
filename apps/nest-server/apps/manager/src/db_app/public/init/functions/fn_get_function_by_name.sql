CREATE OR REPLACE FUNCTION fn_get_function_by_name(functionName text)
RETURNS TABLE (
  schema_name text,
  function_name text,
  function_arguments text,
  return_type text
) AS $$
BEGIN
  RETURN QUERY (
    SELECT
      p.nspname AS schema_name,
      p.proname AS function_name,
      pg_get_function_identity_arguments(p.oid) AS function_arguments,
      pg_typeof(p.prorettype)::regtype AS return_type
    FROM
      pg_proc p
    WHERE
      p.proname = functionName
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_function_by_name(text) FROM public;
