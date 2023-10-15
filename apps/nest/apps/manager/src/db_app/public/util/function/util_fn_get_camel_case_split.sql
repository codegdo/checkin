-- Create a utility function to split camel-case words
CREATE OR REPLACE FUNCTION util_fn_get_camel_case_split(inputString TEXT)
RETURNS TEXT AS $$
DECLARE
  result TEXT;
BEGIN
  BEGIN
    result := regexp_replace(substring(inputString from E'^[a-z]+(.+)$'), E'([a-z])([A-Z])', E'\\1 \\2', 'g');
      IF result IS NULL THEN
        RETURN inputString; -- Return the same input value if the result is NULL
      ELSE
        RETURN result; -- Return the split value if not NULL
      END IF;
  EXCEPTION
    WHEN others THEN
      RETURN inputString; -- Return the same input value if an error occurs
  END;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION util_fn_get_camel_case_split(text) FROM public;

--SELECT util_fn_get_camel_case_split('companyStreetAddress');