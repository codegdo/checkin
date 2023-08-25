-- Create the 'group_type' table
CREATE TABLE main_sec.group_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

-- Insert data into the 'group_type' table
INSERT INTO main_sec.group_type (name, description)
VALUES
  ('internal', 'Internal access levels'),
  ('external', 'External access levels'),
  ('system', 'System access levels');