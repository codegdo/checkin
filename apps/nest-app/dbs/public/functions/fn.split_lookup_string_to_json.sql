CREATE OR REPLACE FUNCTION fn_split_lookup_string_to_json(input_string TEXT)
RETURNS JSON
AS $$
DECLARE
  parts TEXT[];
BEGIN
  parts := string_to_array(input_string, '.');

  IF array_length(parts, 1) = 4 THEN
    RETURN json_build_object(
      'database', parts[1],
      'schema', parts[2],
      'table', parts[3],
      'column', parts[4]
    );
  ELSIF array_length(parts, 1) = 5 THEN
    RETURN json_build_object(
      'database', parts[1],
      'schema', parts[2],
      'table', parts[3],
      'column', parts[4],
      'column_id', parts[5]
    );
  ELSE
    RAISE EXCEPTION 'Invalid input format';
  END IF;
END;
$$ LANGUAGE plpgsql;

SELECT fn_split_lookup_string_to_json('checkin.main_dbo.business_type.category'); -- Returns JSON object