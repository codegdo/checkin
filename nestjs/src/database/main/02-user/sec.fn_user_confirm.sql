CREATE OR REPLACE FUNCTION sec.fn_user_confirm(
  p_key varchar
)
RETURNS sec.user
AS
$BODY$
  DECLARE
    rec record;
    current bigint := extract(epoch from now()) * 1000;
  BEGIN

    SELECT *
    INTO rec
    FROM sec.token
    WHERE key = p_key;

    IF found THEN
      IF current < rec.expired_at THEN

        UPDATE sec.user
        SET is_active = true
        WHERE username = rec.data::jsonb ->> 'username'
        RETURNING * INTO rec;

        DELETE FROM sec.token WHERE key = p_key OR current > expired_at;

      ELSE
        RAISE EXCEPTION no_data_found;
      END IF;
    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;

    RETURN rec;
  END;
$BODY$
LANGUAGE plpgsql;

-- CREATE FUNCTION USER VERIFY
-- CREATE OR REPLACE FUNCTION sec.fn_user_verify(
--   p_username varchar, 
--   p_key varchar, 
--   p_data jsonb
-- )
-- RETURNS SETOF record
-- AS
-- $BODY$
--   DECLARE
--     rec record;
--   BEGIN
--     RETURN QUERY
--     WITH u AS (
--       SELECT *
--       INTO STRICT rec
--       FROM sec.user
--       WHERE username = p_username
--       EXCEPTION
--         WHEN no_data_found THEN
--         RAISE EXCEPTION 'No username was found %', p_username;
--     )
--     INSERT INTO sec.token(key, data)
--     VALUES(p_key, p_data)
--     RETURNING INTO rec;
--   END;
-- $BODY$
-- LANGUAGE plpgsql;