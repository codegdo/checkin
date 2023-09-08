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