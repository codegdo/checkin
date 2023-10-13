-- This function splits an input string into parts using '.' as a delimiter and constructs a JSON object.
CREATE OR REPLACE FUNCTION fn_get_lookup_value_split_to_json(lookupValue TEXT)
RETURNS JSON
AS $$
DECLARE
  parts TEXT[];
BEGIN
  -- Split the lookupValue into parts using '.'
  parts := string_to_array(lookupValue, '.');

  -- Check the number of parts and construct a JSON object accordingly
  IF array_length(parts, 1) = 4 THEN
    -- Construct a JSON object with database, schema, table, and column
    RETURN json_build_object(
      'database', parts[1],
      'schema', parts[2],
      'table', parts[3],
      'column', parts[4]
    );
  ELSIF array_length(parts, 1) = 5 THEN
    -- Construct a JSON object with database, schema, table, column, and column_id
    RETURN json_build_object(
      'database', parts[1],
      'schema', parts[2],
      'table', parts[3],
      'column', parts[4],
      'column_id', parts[5]
    );
  ELSIF array_length(parts, 1) = 6 THEN
    -- Construct a JSON object with database, schema, table, column, column_id, and column_filter
    RETURN json_build_object(
      'database', parts[1],
      'schema', parts[2],
      'table', parts[3],
      'column', parts[4],
      'column_id', parts[5],
      'column_filter', parts[6]
    );
  ELSE
    -- Raise an exception for an invalid input format
    RAISE EXCEPTION 'Invalid input format';
  END IF;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_lookup_value_split_to_json(text) FROM public;

--SELECT fn_get_lookup_value_split_to_json('db_checkin.public.business_type.category'); -- Returns JSON object