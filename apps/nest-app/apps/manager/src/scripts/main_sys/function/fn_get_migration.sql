CREATE OR REPLACE FUNCTION main_sys.fn_get_migration(input_migration_id VARCHAR)
RETURNS TABLE (
  script_path VARCHAR,
  script_order INT
) AS $$
BEGIN

  RETURN QUERY
  SELECT
    ms.script_path,
    ms.script_order
  FROM main_sys.migration m
  LEFT JOIN main_sys.migration_script ms ON m.id = ms.migration_id
  WHERE (
    CASE
      WHEN (input_migration_id ~ '^\d+$') THEN
        m.id = CAST(input_migration_id AS INT)
      ELSE
        m.name = input_migration_id
    END
  );

END;
$$ LANGUAGE plpgsql;

SELECT * FROM main_sys.fn_get_migration('1');