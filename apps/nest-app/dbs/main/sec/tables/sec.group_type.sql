-- Create the 'group_type' table
CREATE TABLE main_sec.group_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert data into the 'group_type' table
INSERT INTO main_sec.group_type (name, description)
VALUES
  ('internal', 'Internal access levels'),
  ('external', 'External access levels'),
  ('system', 'System access levels');