-- CREATE PROCEDURE USER_VERIFY
CREATE OR REPLACE PROCEDURE sec.pr_user_verify(
  p_user_id int,
  p_key varchar,
  p_type varchar,
  p_expired_at bigint,
  OUT data json
)
AS
$BODY$
  DECLARE
    rec record;
  BEGIN
    SELECT *
    INTO rec
    FROM sec.user u
    LEFT JOIN org.contact c ON c.id = u.contact_id
    WHERE u.id = p_user_id;

    IF found THEN

      INSERT INTO sec.token(key, type, data, expired_at)
      VALUES(p_key, p_type, CAST('{"username":"' || rec.username || '", "firstName":"' || rec.first_name || '", "lastName":"' || rec.last_name || '", "phoneNumber":"' || rec.phone_number || '", "emailAddress":"' || rec.email_address || '"}' as jsonb), p_expired_at)
      RETURNING * INTO rec;

      data := json_agg(rec)::json ->> 0;
    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;

  END;
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_verify('34'::int, '495146'::varchar, 'verify'::varchar, '1643404175057'::bigint, null::json);

DROP PROCEDURE IF EXISTS sec.pr_user_verify(int, varchar, varchar, bigint, json);