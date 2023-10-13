CREATE OR REPLACE FUNCTION fn_get_procedure_by_name(procedureName text)
RETURNS TABLE (
    schema_name text,
    procedure_name text,
    parameter_name text,
    data_type text
) AS $$
BEGIN
  RETURN QUERY (
    SELECT
      p.pronamespace::regnamespace AS schema_name,
      p.proname AS procedure_name,
      pa.para_name AS parameter_name,
      pg_catalog.format_type(pa.para_type, NULL) AS data_type
    FROM
      pg_catalog.pg_proc p
    JOIN
      pg_catalog.pg_namespace n
    ON
      n.oid = p.pronamespace
    LEFT JOIN (
      SELECT
        a.attnum AS para_num,
        a.attname AS para_name,
        t.oid AS para_type,
        a.attrelid AS para_proc_id
      FROM
        pg_catalog.pg_attribute a
      JOIN
        pg_catalog.pg_type t
      ON
        a.atttypid = t.oid
      WHERE
        NOT a.attisdropped
    ) pa
    ON
      pa.para_proc_id = p.oid
    WHERE
      p.proname = procedureName
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_procedure_by_name(text) FROM public;
