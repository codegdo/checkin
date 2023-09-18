CREATE OR REPLACE FUNCTION main_sys.fn_get_migration_rollbacks_next(input_migration_rollback_id INT)
RETURNS SETOF main_sys.migration_script AS $$
BEGIN
  -- Select all migration scripts associated with the provided migration_rollback_id
  RETURN QUERY
  SELECT ms.*
  FROM main_sys.migration_script ms
  WHERE ms.migration_rollback_id = input_migration_rollback_id;
END;
$$ LANGUAGE plpgsql;

-- SELECT * FROM main_sys.fn_get_migration_rollbacks_next(1);