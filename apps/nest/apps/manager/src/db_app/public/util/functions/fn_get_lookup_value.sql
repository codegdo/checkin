-- This function performs a dynamic SQL lookup and returns key-value pairs.
CREATE OR REPLACE FUNCTION fn_get_lookup_value(
  lookupValue TEXT,
  loginId INT DEFAULT 0
)
RETURNS TABLE (key TEXT, value TEXT)
AS $$
DECLARE
  lookup_info JSONB;
  lookup_schema TEXT;
  lookup_table TEXT;
  lookup_column TEXT;
  lookup_column_id TEXT;
  lookup_column_filter TEXT;
  company_id INT;
  sql_query TEXT;
BEGIN
  -- Extract values from the JSON object
  lookup_info := fn_lookup_value_split_to_json(lookupValue);

  lookup_schema := lookup_info->>'schema';
  lookup_table := lookup_info->>'table';
  lookup_column := lookup_info->>'column';
  lookup_column_id := lookup_info->>'column_id';
  lookup_column_filter := lookup_info->>'column_filter';

  -- Check if main_sec.fn_get_user exists
  IF EXISTS (SELECT 1 FROM pg_proc WHERE proname = 'fn_get_user' AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'main_sec')) THEN
    -- Construct the dynamic SQL query to get user_company_id
    sql_query := 'SELECT user_company_id INTO var_company_id FROM main_sec.fn_get_user($1)';

    -- Execute the dynamic SQL query with input_loginId as a parameter
    EXECUTE sql_query USING loginId;
  ELSE
    -- Print the SQL string to the server log for debugging
    RAISE NOTICE 'Generated SQL String: % %', sql_query, company_id;
    --RAISE EXCEPTION 'Function main_sec.fn_get_user does not exist';
  END IF;

  -- Construct the dynamic SQL query for the main lookup
  sql_query := 'SELECT DISTINCT ';

  -- Use COALESCE to handle lookup_column_id and lookup_column
  sql_query := sql_query || COALESCE(quote_ident(lookup_column_id), quote_ident(lookup_column)) || '::TEXT AS key, ';
  sql_query := sql_query || quote_ident(lookup_column) || '::TEXT AS value ';

  sql_query := sql_query || 'FROM ' || quote_ident(lookup_schema) || '.' || quote_ident(lookup_table);

  IF lookup_column_filter IS NOT NULL THEN
    -- Check if lookup_column_filter is 'company_id', if yes, use company_id
    IF lookup_column_filter = 'company_id' THEN
      sql_query := sql_query || ' WHERE ';
      sql_query := sql_query || quote_ident(lookup_column_filter) || ' = ' || COALESCE(company_id, 0);
    ELSE
      RAISE EXCEPTION 'Unsupported column_filter: %', lookup_column_filter;
    END IF;
  END IF;

  -- Print the SQL string to the server log for debugging
  RAISE NOTICE 'Generated SQL String: % %', sql_query, company_id;

  RETURN QUERY EXECUTE sql_query;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_lookup_value(text, integer) FROM public;

-- SELECT * FROM fn_get_lookup_value('checkin.main_com.form.title.id.company_id', 1);
