CREATE OR REPLACE PROCEDURE sec.pr_user_confirm(
  p_key varchar,
  OUT data json
)
AS
$BODY$
  DECLARE
    rec_token record;
    current bigint := extract(epoch from now()) * 1000;
  BEGIN
    
    SELECT *
    INTO rec_token
    FROM sec.token
    WHERE key = p_key;

    IF found THEN
      IF current < rec_token.expired_at THEN

        UPDATE sec.user
        SET is_active = true
        WHERE username = rec_token.data::jsonb ->> 'username'
        RETURNING * INTO data;

        DELETE FROM sec.token WHERE key = p_key OR current > expired_at;

      ELSE
        RAISE EXCEPTION no_data_found;
      END IF;
    ELSE
        RAISE EXCEPTION no_data_found;
    END IF;
  END;
$BODY$
LANGUAGE plpgsql;

DROP PROCEDURE IF EXISTS sec.pr_user_confirm(varchar, json);