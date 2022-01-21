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