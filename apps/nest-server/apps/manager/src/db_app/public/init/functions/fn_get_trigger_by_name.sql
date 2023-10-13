CREATE OR REPLACE FUNCTION fn_get_trigger_by_name(triggerName text)
RETURNS TABLE (
  schema_name text,
  table_name text,
  trigger_name text,
  trigger_event text,
  trigger_timing text
) AS $$
BEGIN
  RETURN QUERY (
    SELECT
      n.nspname AS schema_name,
      c.relname AS table_name,
      t.tgname AS trigger_name,
      CASE t.tgtype & B'00100000' WHEN B'00100000' THEN 'INSTEAD OF' ELSE 'BEFORE' END AS trigger_timing,
      CASE t.tgtype & B'00001111'
        WHEN B'00000001' THEN 'INSERT'
        WHEN B'00000010' THEN 'DELETE'
        WHEN B'00000100' THEN 'UPDATE'
        WHEN B'00001000' THEN 'TRUNCATE'
        ELSE 'UNKNOWN'
      END AS trigger_event
    FROM
      pg_catalog.pg_trigger t
      JOIN pg_catalog.pg_class c ON t.tgrelid = c.oid
      JOIN pg_catalog.pg_namespace n ON n.oid = c.relnamespace
    WHERE
      t.tgname = triggerName
  );
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_trigger_by_name(text) FROM public;
