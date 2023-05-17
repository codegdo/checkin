-- Create the 'main_sec.policy' table
CREATE TABLE main_sec.policy (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description VARCHAR(255),
  data JSONB,
  access_level_id INT,
  company_id INT,
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50)
);


--

INSERT
INTO main_sec.policy (name, description, data, access_level_id, is_active)
VALUES
('System Owner', 'Full Access', '{"version": "2023","statement":[{"sid": 1,"effect":"allow","action":"*","resource":"*","condition":{}}]}', '1', '1'),
('Admin Owner', 'Full Access', '{"version": "2023","statement":[{"sid": 1,"effect":"allow","action":"*","resource":"*","condition":{}}]}', '2', '1');