-- Create the 'group_type' table
CREATE TABLE IF NOT EXISTS sec.group_type (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER
);

-- Insert data into the 'group_type' table
INSERT INTO sec.group_type (name, description)
VALUES
  ('internal', 'Internal access levels'),
  ('external', 'External access levels'),
  ('system', 'System access levels');