-- Create a table to track migration history
CREATE TABLE IF NOT EXISTS main_sys.migrations (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'InProgress', 'Completed', 'Failed')),
  error_message TEXT,

  executed_timestamp TIMESTAMP,
  execution_duration INTERVAL,
  execution_attempts INT DEFAULT 0,
  execution_completed_at TIMESTAMP,
  is_executed BOOLEAN NOT NULL DEFAULT FALSE,
  has_dependent BOOLEAN DEFAULT FALSE, -- Added has_dependent column

  version INT, -- Added version number
  checksum VARCHAR(64), -- Added checksum or hash
  dependency_id INT, -- Added dependency on another migration
  environment VARCHAR(50), -- Added environment or target system

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50)
);