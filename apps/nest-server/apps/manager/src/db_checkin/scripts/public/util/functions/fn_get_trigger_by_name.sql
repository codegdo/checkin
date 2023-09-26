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
      t.tgnamespace::regnamespace AS schema_name,
      t.tgrelid::regclass AS table_name,
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
    WHERE
      t.tgname = triggerName
  );
END;
$$ LANGUAGE plpgsql;
