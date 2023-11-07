CREATE OR REPLACE FUNCTION util_fn_security_check_permission(
    keyId TEXT,
    accessLevel TEXT,
    permission JSONB DEFAULT '{}'::JSONB
)
RETURNS BOOLEAN AS $$
DECLARE
    access_permission TEXT;
BEGIN
    access_permission := permission->>keyId;

    IF access_permission = accessLevel THEN
        RETURN TRUE;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

--SELECT f.*
--FROM field as f
--WHERE util_fn_check_permission((f.name || f.id)::TEXT, 'No Access', '{"username1":"No Access"}') = FALSE;