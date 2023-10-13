-- Create a table to track migration dependencies
CREATE TABLE IF NOT EXISTS _sys.migration_dependency (
  id SERIAL PRIMARY KEY,
  migration_id INT,
  depends_on_migration_id INT,
  FOREIGN KEY (migration_id) REFERENCES _sys.migration (id),
  FOREIGN KEY (depends_on_migration_id) REFERENCES _sys.migration (id)
);

-- Define the target schema name and new schema name
DO $$ 
DECLARE 
    target_schema_name TEXT := 'sec'; -- Replace with your target schema name
    new_schema_name TEXT := 'sec_1';  -- Replace with your new schema name
    query_text TEXT := 'CREATE TABLE IF NOT EXISTS sec.migration_dependency (
    id SERIAL PRIMARY KEY,
    migration_id INT,
    depends_on_migration_id INT,
    FOREIGN KEY (migration_id) REFERENCES sec.migration (id),
    FOREIGN KEY (depends_on_migration_id) REFERENCES sec.migration (id)
  );';
BEGIN
    -- Use REGEXP_REPLACE to replace the schema name
    query_text := REGEXP_REPLACE(
        query_text,
        format('\b%s\b', target_schema_name), -- Use word boundaries to match the schema name
        new_schema_name,
        'g' -- 'g' flag for global replacement
    );

    -- Print the modified query text
    RAISE NOTICE 'Modified Query Text: %', query_text;
END;
$$;
