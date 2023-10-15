-- Create a table to track migration dependencies
CREATE TABLE IF NOT EXISTS migration_dependency (
  id SERIAL PRIMARY KEY,
  migration_id INT,
  depends_on_migration_id INT,
  FOREIGN KEY (migration_id) REFERENCES migration (id),
  FOREIGN KEY (depends_on_migration_id) REFERENCES migration (id)
);
