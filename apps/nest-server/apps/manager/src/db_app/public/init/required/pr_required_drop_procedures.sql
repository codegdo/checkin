CREATE OR REPLACE PROCEDURE pr_required_drop_procedures(
  procedureNames TEXT[] DEFAULT '{}'
)
AS $$
BEGIN
  -- Check if the caller has the EXECUTE privilege on the function
  IF NOT has_function_privilege(current_user, 'fn_required_drop_procedures(text[])', 'EXECUTE') THEN
    RAISE EXCEPTION 'User does not have EXECUTE privilege on function fn_required_drop_procedures';
  END IF;

  -- Execute the function
  PERFORM fn_required_drop_procedures(procedureNames);
END;
$$ SECURITY DEFINER LANGUAGE plpgsql;

REVOKE EXECUTE ON PROCEDURE pr_required_drop_procedures(text[]) FROM public;
