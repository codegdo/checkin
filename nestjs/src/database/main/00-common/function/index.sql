-- CREATE FUNCTION GET LOOKUP
CREATE OR REPLACE FUNCTION dbo.fn_get_lookup(
  p_lookup text,
  p_login_id int,
  p_org_id int,
  OUT data jsonb
)
RETURNS jsonb
AS
$BODY$
  DECLARE
    group_type_id int;

    lookup_schema text := split_part(p_lookup, '.', 1);
    lookup_table text := split_part(p_lookup, '.', 2);
    lookup_column text := split_part(p_lookup, '.', 3);
    lookup_column_id text := split_part(p_lookup, '.', 4);
    --lookup_filter text := split_part(p_lookup, '.', 5);
    --lookup_operator text := split_part(p_lookup, '.', 6);
    string_sql text;
  BEGIN

    SELECT gt.id from sec.user u
    INTO group_type_id
    LEFT JOIN sec."group" g ON u.group_id = g.id
    LEFT JOIN dbo.group_type gt ON g.group_type_id = gt.id
    WHERE u.id = p_login_id;

    IF lookup_table = 'group_type' THEN

      IF group_type_id = 1 THEN
        string_sql := FORMAT(
          $ex$
            SELECT json_agg(json_build_object('key', %4$s, 'value', %3$s))
            FROM (
              SELECT DISTINCT %3$s, %4$s
              FROM %1$s.%2$s
              ORDER BY %3$s
            ) t
          $ex$, lookup_schema, lookup_table, lookup_column, lookup_column_id
        );
      ELSE
        string_sql := FORMAT(
          $ex$
            SELECT json_agg(json_build_object('key', %4$s, 'value', %3$s))
            FROM (
              SELECT DISTINCT %3$s, %4$s
              FROM %1$s.%2$s
              WHERE id <> 1
              ORDER BY %3$s
            ) t
          $ex$, lookup_schema, lookup_table, lookup_column, lookup_column_id
        );

      END IF;

      EXECUTE string_sql INTO data;
    END IF;

    IF lookup_table IN ('group', 'location') THEN

      string_sql := FORMAT(
        $ex$
          SELECT json_agg(json_build_object('key', %4$s, 'value', %3$s))
          FROM (
            SELECT DISTINCT %3$s, %4$s
            FROM %1$s.%2$s
            WHERE org_id = %5$s
            ORDER BY %3$s
          ) t
        $ex$, lookup_schema, lookup_table, lookup_column, lookup_column_id, p_org_id
      );

      EXECUTE string_sql INTO data;
    END IF;

    IF lookup_table IN ('territory', 'business_type') THEN

      string_sql := FORMAT(
        $ex$
          SELECT json_agg(json_build_object('key', %4$s, 'value', %3$s))
          FROM (
            SELECT DISTINCT %3$s, %4$s
            FROM %1$s.%2$s
            ORDER BY %3$s
          ) t
        $ex$, lookup_schema, lookup_table, lookup_column, lookup_column_id
      );

      EXECUTE string_sql INTO data;

    END IF;

  END;
$BODY$
LANGUAGE plpgsql;

/* DROP FUNCTIONS

DROP FUNCTION IF EXISTS dbo.fn_get_lookup;
*/