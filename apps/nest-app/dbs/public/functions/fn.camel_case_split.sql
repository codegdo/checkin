-- Create a utility function to split camel-case words
CREATE OR REPLACE FUNCTION fn_camel_case_split(input_string VARCHAR)
RETURNS VARCHAR AS $$
DECLARE
  result VARCHAR;
BEGIN
  BEGIN
    result := regexp_replace(substring(input_string from E'^[a-z]+(.+)$'), E'([a-z])([A-Z])', E'\\1 \\2', 'g');
      IF result IS NULL THEN
        RETURN input_string; -- Return the same input value if the result is NULL
      ELSE
        RETURN result; -- Return the split value if not NULL
      END IF;
  EXCEPTION
    WHEN others THEN
      RETURN input_string; -- Return the same input value if an error occurs
  END;
END;
$$ LANGUAGE plpgsql;

--SELECT fn_camel_case_split('companyStreetAddress');