CREATE OR REPLACE FUNCTION _sys.fn_get_migration_all()
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
  FROM _sys.migration m
  LEFT JOIN _sys.migration_category mc ON m.migration_category_id = mc.id
  WHERE m.is_enabled = TRUE;

END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM _sys.fn_get_migration_all();