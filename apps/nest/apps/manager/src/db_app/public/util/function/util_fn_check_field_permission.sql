CREATE OR REPLACE FUNCTION util_fn_check_field_permission(
    fieldId INT,
    permissions JSON,
    accessLevel TEXT
)
RETURNS BOOLEAN AS $$
DECLARE
    field_permission TEXT;
BEGIN
    -- Convert field_id to text
    SELECT permissions->>fieldId::TEXT INTO field_permission;

    -- Check if the field permission equals permission level
    IF field_permission = accessLevel THEN
        RETURN FALSE;
    ELSE
        RETURN TRUE;
    END IF;
END;
$$ LANGUAGE plpgsql;