-- Create a table to track migration history
CREATE TABLE IF NOT EXISTS main_sys.migration (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'Pending' CHECK (status IN ('Pending', 'InProgress', 'Completed', 'Failed')),
  error_message TEXT,

  executed_timestamp TIMESTAMP,
  execution_duration INTERVAL,
  execution_sequence INT,
  execution_attempts INT DEFAULT 0,
  
  is_executed BOOLEAN NOT NULL DEFAULT FALSE,

  timestamp_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  completed_at TIMESTAMP
);

    

