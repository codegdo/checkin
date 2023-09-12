-- Create a table to track migration history
CREATE TABLE IF NOT EXISTS main_sys.migration (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(255),
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

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50)
);

INSERT INTO main_sys.migration (name, category, description, execution_order, app_version) VALUES
('Initial Setup Public Functions','initial_setup','Initial setup public functions for the application.',0,1);