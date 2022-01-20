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
