
CREATE OR REPLACE FUNCTION dbo.fn_get_lookup_value()
RETURNS SETOF record
AS
$BODY$
    DECLARE
        sql text := 'SELECT * FROM dbo.territory';
    BEGIN
      EXECUTE FORMAT(sql);
    END;
$BODY$
LANGUAGE plpgsql;

SELECT dbo.fn_get_lookup_value();

DROP PROCEDURE dbo.fn_get_lookup_value;





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