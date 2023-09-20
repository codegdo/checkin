-- This function performs a dynamic SQL lookup and returns key-value pairs.
CREATE OR REPLACE FUNCTION fn_lookup_value(
  input_string TEXT,
  input_login_id INT DEFAULT 0
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
  var_company_id INT;
  sql_string TEXT;
BEGIN
  -- Extract values from the JSON object
  lookup_info := fn_split_lookup_string_to_json(input_string);

  lookup_schema := lookup_info->>'schema';
  lookup_table := lookup_info->>'table';
  lookup_column := lookup_info->>'column';
  lookup_column_id := lookup_info->>'column_id';
  lookup_column_filter := lookup_info->>'column_filter';

  -- Get user company_id from fn_get_user
  IF input_login_id IS NOT NULL THEN
    SELECT user_company_id
    INTO var_company_id
    FROM main_sec.fn_get_user(input_login_id);
  END IF;

  -- Construct the dynamic SQL query
  sql_string := 'SELECT DISTINCT ';

  -- Use COALESCE to handle lookup_column_id and lookup_column
  sql_string := sql_string || COALESCE(quote_ident(lookup_column_id), quote_ident(lookup_column)) || '::TEXT AS key, ';
  sql_string := sql_string || quote_ident(lookup_column) || '::TEXT AS value ';

  sql_string := sql_string || 'FROM ' || quote_ident(lookup_schema) || '.' || quote_ident(lookup_table);

  IF lookup_column_filter IS NOT NULL THEN
    -- Check if lookup_column_filter is 'company_id', if yes, use var_company_id
    IF lookup_column_filter = 'company_id' THEN
      sql_string := sql_string || ' WHERE ';
      sql_string := sql_string || quote_ident(lookup_column_filter) || ' = ' || COALESCE(var_company_id, 0);
    ELSE
      RAISE EXCEPTION 'Unsupported column_filter: %', lookup_column_filter;
    END IF;
  END IF;

  -- Print the SQL string to the server log for debugging
  RAISE NOTICE 'Generated SQL String: % %', sql_string, var_company_id;

  RETURN QUERY EXECUTE sql_string;
END;
$$ LANGUAGE plpgsql;


-- SELECT * FROM fn_lookup_value('checkin.main_com.form.title.id.company_id', 1);


/* CREATE OR REPLACE FUNCTION fn_lookup_value(
  input_string TEXT,
  input_company_id INT DEFAULT NULL
)
RETURNS TABLE (key TEXT, value TEXT)
AS $$
DECLARE
  lookup_info JSONB;
  lookup_database TEXT;
  lookup_schema TEXT;
  lookup_table TEXT;
  lookup_column TEXT;
  lookup_column_id TEXT;
  lookup_column_filter TEXT;
  sql_string TEXT;
BEGIN
  lookup_info := fn_split_lookup_string_to_json(input_string);

  -- Extract values from the JSON object
  lookup_database := lookup_info->>'database';
  lookup_schema := lookup_info->>'schema';
  lookup_table := lookup_info->>'table';
  lookup_column := lookup_info->>'column';
  lookup_column_id := lookup_info->>'column_id';
  lookup_column_filter := lookup_info->>'column_filter';

  -- Construct the dynamic SQL query while handling null values
  sql_string := 'SELECT ';

  IF lookup_column_id IS NOT NULL THEN
    sql_string := sql_string || quote_ident(lookup_column_id) || '::TEXT AS key, ';
  ELSE
    sql_string := sql_string || quote_ident(lookup_column) || '::TEXT AS key, ';
  END IF;

  sql_string := sql_string || quote_ident(lookup_column) || '::TEXT AS value ';

  sql_string := sql_string || 'FROM ' || quote_ident(lookup_schema) || '.' || quote_ident(lookup_table);

  -- SELECT [lookup_column_id]::TEXT AS key, [lookup_column]::TEXT AS value FROM

  IF (lookup_column_id IS NOT NULL OR lookup_column IS NOT NULL) AND lookup_schema IS NOT NULL THEN
    sql_string := sql_string || ' WHERE ';

    IF lookup_column_id IS NOT NULL THEN
      sql_string := sql_string || quote_ident(lookup_column_id) || ' IS NOT NULL ';
    END IF;

    IF lookup_column_id IS NOT NULL AND lookup_column IS NOT NULL THEN
      sql_string := sql_string || 'AND ';
    END IF;

    IF lookup_column IS NOT NULL THEN
      sql_string := sql_string || quote_ident(lookup_column) || ' IS NOT NULL ';
    END IF;
  END IF;

  sql_string := sql_string || ' GROUP BY ';

  IF lookup_column_id IS NOT NULL THEN
    sql_string := sql_string || quote_ident(lookup_column_id) || '::TEXT, ';
  ELSE
    sql_string := sql_string || quote_ident(lookup_column) || '::TEXT, ';
  END IF;

  sql_string := sql_string || quote_ident(lookup_column) || '::TEXT';

  sql_string := sql_string || ' ORDER BY ';

  IF lookup_column_id IS NOT NULL THEN
    sql_string := sql_string || quote_ident(lookup_column_id) || '::TEXT, ';
  ELSE
    sql_string := sql_string || quote_ident(lookup_column) || '::TEXT, ';
  END IF;

  sql_string := sql_string || quote_ident(lookup_column) || '::TEXT';

  -- Print the SQL string to the server log
  RAISE NOTICE 'Generated SQL String: %', sql_string;

  RETURN QUERY EXECUTE sql_string;
END;
$$ LANGUAGE plpgsql;

SELECT fn_lookup_value('checkin.main_dbo.business_type.category'); 


CREATE OR REPLACE FUNCTION fn.lookup_value(
  input_string TEXT
)
RETURNS TABLE (key TEXT, value TEXT)
AS $$
DECLARE
  var_database TEXT;
  var_schema TEXT;
  var_table TEXT;
  var_column TEXT;
  var_column_id TEXT;
  var_lookup_string RECORD;
  var_sql_string TEXT;
BEGIN
  var_lookup_string := fn.split_lookup_string_to_json(input_string);
  var_database := var_lookup_string.database;
  var_schema := var_lookup_string.schema;
  var_table := var_lookup_string.table;
  var_column := var_lookup_string.column;
  var_column_id := var_lookup_string.column_id;

  sql_string := FORMAT(
    $ex$
      SELECT %4$I AS key, %3$I AS value
      FROM %1$I.%2$I
      GROUP BY %4$I, %3$I
      ORDER BY %3$I
    $ex$, lookup_schema, lookup_table, lookup_column, lookup_column_id
  );
  RETURN QUERY EXECUTE string_sql;
END;
$$ LANGUAGE plpgsql;

SELECT fn.lookup_value('checkin.main_dbo.business_type.category'); -- Returns JSON object */