CREATE OR REPLACE FUNCTION main_sys.fn_get_migration_by_category(category_name VARCHAR)
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
  FROM main_sys.migration m
  LEFT JOIN main_sys.migration_category mc ON m.migration_category_id = mc.id
  WHERE mc.name = category_name;

END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM main_sys.fn_get_migration_by_category('Data Initialization');