CREATE OR REPLACE FUNCTION get_rollback_id(migrationId INT)
RETURNS INT
AS $$
DECLARE
    rollback_id INT;
BEGIN
    -- Retrieve the rollback_id based on the provided migrationId
    SELECT mr.id
    INTO rollback_id
    FROM migration_rollback mr
    WHERE mr.migration_id = migrationId;

    -- Return the rollback_id
    RETURN rollback_id;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION get_rollback_id(integer) FROM public;
