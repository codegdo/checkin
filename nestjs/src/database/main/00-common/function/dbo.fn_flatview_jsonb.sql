CREATE OR REPLACE FUNCTION dbo.fn_flatview_jsonb()
RETURN text
AS
$fn$
  DECLARE
    cols text;
  BEGIN
    EXECUTE FORMAT(
      $ex$
        SELECT string_agg(format('%2$s->>%%1$L "%%1$s"', key), ', ')
        FROM (
          SELECT DISTINCT key
          FROM %1$s, jsonb_each(%2$s)
          ORDER by 1
        ) s;
      $ex$, p_table_name, p_json_column
    )
    INTO cols;

    EXECUTE FORMAT(
      $ex$
        DROP VIEW IF EXISTS %1$s_view;
        CREATE VIEW %1$s_view AS
        SELECT %2$s
        FROM %1$s
      $ex$, p_table_name, p_json_column
    );

    RETURN cols;
  END;
$fn$
LANGUAGE plpgsql;