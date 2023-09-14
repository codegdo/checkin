-- Create a table to track migration history
CREATE TABLE IF NOT EXISTS main_sys.migration (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,

  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'InProgress', 'Completed', 'Failed')),
  error_message TEXT,

  started_at TIMESTAMP,
  duration INTERVAL,
  completed_at TIMESTAMP,
  execution_order INT DEFAULT 0,

  is_executed BOOLEAN NOT NULL DEFAULT FALSE,
  has_dependent BOOLEAN DEFAULT FALSE,

  app_version INT,
  build_version VARCHAR(50),
  commit_hash VARCHAR(40),
  checksum VARCHAR(64),
  environment VARCHAR(50),

  category_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),
  FOREIGN KEY (category_id) REFERENCES main_sys.migration_category (id) ON DELETE CASCADE
);

INSERT INTO main_sys.migration (name, description, execution_order, app_version, migration_category_id) VALUES
('Setup Public Functions','Setup public functions for the application.',0,1,1);