-- Create the function
CREATE OR REPLACE FUNCTION pg_get_user_role_info(userRoleName text)
RETURNS user_role_info AS $$
DECLARE
    result user_role_info;
BEGIN
    SELECT
        r.rolname,
        r.rolsuper,
        r.rolinherit,
        array_agg(b.rolname)
    INTO
        result
    FROM
        pg_roles r
    LEFT JOIN
        pg_auth_members m ON m.member = r.oid
    LEFT JOIN
        pg_roles b ON m.roleid = b.oid
    WHERE
        r.rolname = userRoleName
    GROUP BY
        r.rolname, r.rolsuper, r.rolinherit;

    RETURN result;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION pg_get_user_role_info(text) FROM public;