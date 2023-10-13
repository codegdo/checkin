CREATE OR REPLACE FUNCTION fn_migration_get_all_migrations()
RETURNS TABLE (
  id INT,
  name VARCHAR,
  category VARCHAR,
  execution_order INT,
  is_executed BOOLEAN,
  status VARCHAR
) AS $$
BEGIN

  RETURN QUERY
  SELECT
    m.id,
    m.name,
    mc.name AS category,
    m.execution_order,
    m.is_executed,
    m.status
  FROM migration m
  LEFT JOIN migration_category mc ON m.migration_category_id = mc.id
  WHERE m.is_enabled = TRUE;

END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_migration_get_all_migrations() FROM public;

-- SELECT * FROM fn_migration_get_all_migrations();