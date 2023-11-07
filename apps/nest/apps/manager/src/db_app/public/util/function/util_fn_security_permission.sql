CREATE OR REPLACE FUNCTION util_fn_security_permission(
  useId INT,
  keyId TEXT,
  accessLevel TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
  policy_row JSONB;
  isAllowed BOOLEAN := FALSE;
BEGIN

  FOR policy_row IN SELECT data FROM policy LOOP
    IF util_fn_check_permission(keyId, accessLevel, policy_row->'permission') THEN
      isAllowed := TRUE;
      EXIT;
    END IF;
  END LOOP;

  RETURN isAllowed;
END;
$$ LANGUAGE plpgsql;

--SELECT f.*
--FROM field as f
--WHERE util_fn_security_permission(1, (f.name || f.id)::TEXT, 'No Access') = FALSE;