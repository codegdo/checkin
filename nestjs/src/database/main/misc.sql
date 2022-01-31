SELECT routine_name
FROM information_schema.routines
WHERE routine_type='FUNCTION'
  AND specific_schema='public'
  AND routine_name LIKE 'fn%';

SELECT json_agg(territory)::jsonb FROM dbo.territory;
SELECT array_to_json(array_agg(territory)) FROM dbo.territory;

SELECT json_agg(
    json_build_object(
        'key', territory.id,
        'value', territory.state
    )
) from dbo.territory;


SELECT
    json_build_object(
        'a', json_agg(territory.id),
        'b', json_agg(territory.state)
    )::jsonb
FROM dbo.territory;

SELECT to_jsonb(r)
FROM (
    SELECT
        array_agg(territory.id) AS a,
        array_agg(territory.state) AS b
    FROM dbo.territory
) r;


select json_array_elements(s.json_agg) from (
 SELECT json_agg(json_build_object('key', id,'value', state)) from dbo.territory
) s;


 ' SELECT json_agg(json_build_object(''key'', t.'|| _column_id ||',''value'', t.'|| _column ||')) '
          ' FROM ( '
            ' SELECT DISTINCT '|| _column ||', '|| _column_id ||' '
            ' FROM ' || _schema || '.' || _table ||' '
            ' ORDER BY ' || _column ||' '
          ' ) as t '




create table example (id int, name text, params jsonb);
insert into example values
(1, 'Anna', '{"height": 175, "weight": 55}'),
(2, 'Bob', '{"age": 22, "height": 188}'),
(3, 'Cindy', '{"age": 25, "weight": 48, "pretty": true}');


SELECT * FROM example;

create or replace function fn_flat_view()
returns text language plpgsql as
$$
    declare
        cols text;
    begin
        execute format(
            $ex$
                SELECT string_agg(format('%2$s->>%%1$L "%%1$s"', key), ', ')
                FROM (
                    SELECT DISTINCT key
                    FROM example, jsonb_each(params)
                    ORDER by 1
                ) s;
            $ex$, 'example', 'params'
            )
        INTO cols;

        return cols;
    end;
$$;

select fn_flat_view();

drop function fn_flat_view;
drop table example;

SELECT string_agg(format('params->>%%1$L "%%1$s"', key), ', ')
FROM (
    SELECT DISTINCT key
    FROM example, jsonb_each(params)
    ORDER by 1
) s;

select params->>'age' "age" from example;

--params->>'age' "age", params->>'height' "height", params->>'pretty' "pretty", params->>'weight' "weight"



DO
$$
    DECLARE
        _text text[];
    BEGIN
        SELECT *
        INTO _text
        FROM
        (
            SELECT string_to_array('schema.table.column.column_id', '.')
        ) t;

        FOR i IN 1 .. array_upper(_text, 1)
        LOOP
           RAISE NOTICE '%', _text[i];
        END LOOP;
    END;
$$ LANGUAGE plpgsql;


-- OLD
-- CREATE PROCEDURE USER_SIGNUP
CREATE OR REPLACE PROCEDURE sec.pr_user_signup(
  p_first_name varchar,
  p_last_name varchar,
  p_email_address varchar,
  p_phone_number varchar,
  p_username varchar,
  p_password varchar,

  INOUT "out_username" varchar,
  INOUT "out_emailAddress" varchar,
  INOUT "out_phoneNumber" varchar,
  INOUT "out_isActive" boolean
  --out_user_signup_return_type INOUT sec.user_signup_return_type
)
AS
$BODY$
  DECLARE
      _role_id INT := 2;
  BEGIN

    WITH c AS (
      INSERT INTO org.contact(
        first_name,
        last_name,
        email_address,
        phone_number
      )
      VALUES (p_first_name, p_last_name, p_email_address, p_phone_number)
      RETURNING
        id,
        email_address,
        phone_number
    ), u AS (
      INSERT INTO sec.user(
        username,
        password,
        role_id,
        contact_id
      )
      VALUES(p_username, p_password, _role_id, (SELECT id FROM c))
      RETURNING
        username,
        is_active,
        contact_id
    )

    SELECT
      u.username::varchar,
      c.email_address::varchar,
      c.phone_number::varchar,
      u.is_active::boolean
    INTO
      "out_username",
      "out_emailAddress",
      "out_phoneNumber",
      "out_isActive"
      --out_user_signup_return_type
    FROM u
      LEFT JOIN c ON c.id = u.contact_id;

    COMMIT;
  END;
$BODY$
LANGUAGE plpgsql;

CALL sec.pr_user_signup('kenny'::varchar,'do'::varchar,'giangd@gmail.com'::varchar,'8583571474'::varchar,'kennny'::varchar,'675dac650573721672b492cea4addc28a3f1f6afe93d197abb39cbdca70fcdfe.f4fcd1c555282be2'::varchar, 'null'::text, 'null'::text, 'null'::text, '0'::boolean);
CALL sec.pr_user_signup('kenny'::varchar,'do'::varchar,'giangd@gmail.com'::varchar,'8583571474'::varchar,'kennny'::varchar,'675dac650573721672b492cea4addc28a3f1f6afe93d197abb39cbdca70fcdfe.f4fcd1c555282be2'::varchar, ('null'::varchar,'null'::varchar,'null'::varchar,'0'::boolean)::sec.user_signup_return_type);