-- CREATE FUNCTION USER VERIFY
CREATE OR REPLACE FUNCTION sec.fn_user_verify(
  p_user_id varchar,
  p_key varchar,
  p_type varchar,
  p_data jsonb,
  p_expired_at bigint
)
RETURNS sec.token
AS
$BODY$
  DECLARE
    rec record;
  BEGIN

    SELECT *
    INTO rec
    FROM sec.user u
    LEFT JOIN org.contact c ON c.id = u.contact_id
    WHERE id = p_user_id;

    IF found THEN

      INSERT INTO sec.token(key, type, data, expired_at)
      VALUES(p_key, p_type, CAST('{"id":"' || rec.id || '", "username":"' || rec.username || '", "firstName":"' || rec.first_name || '", "lastName":"' || rec.last_name || '", "phoneNumber":"' || rec.phone_number || '", "emailAddress":"' || rec.email_address || '"}' as jsonb), p_expired_at)
      RETURNING * INTO rec;

    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;

    RETURN rec;
  END;
$BODY$
LANGUAGE plpgsql;