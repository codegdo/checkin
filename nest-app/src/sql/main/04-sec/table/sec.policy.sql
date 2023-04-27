-- POLICY
CREATE TABLE main_sec.policy (
  id serial PRIMARY KEY,
  name varchar(100),
  description varchar(255),
  data jsonb,
  access_level_id int,
  company_id int,
  is_active boolean,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
  updated_by varchar(50),
);

--

INSERT
INTO main_sec.policy (name, description, data, access_level_id, is_active)
VALUES
('System Owner', 'Full Access', '{"version": "2023","statement":[{"sid": 1,"effect":"allow","action":"*","resource":"*","condition":{}}]}', '1', '1'),
('Admin Owner', 'Full Access', '{"version": "2023","statement":[{"sid": 1,"effect":"allow","action":"*","resource":"*","condition":{}}]}', '2', '1');