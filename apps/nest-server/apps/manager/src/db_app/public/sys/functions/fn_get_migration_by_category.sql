CREATE OR REPLACE FUNCTION fn_get_migration_by_category(categoryName TEXT)
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
  WHERE mc.name = categoryName;

END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_get_migration_by_category(text) FROM public;

-- SELECT * FROM fn_get_migration_by_category('Data Initialization');