-- Create the 'main_sec.group' table
CREATE TABLE main_sec.group (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  group_level INT DEFAULT 1,
  access_level_id INT,
  company_id INT,
  is_owner BOOLEAN,
  is_active BOOLEAN,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),
  FOREIGN KEY(access_level_id) REFERENCES main_sec.access_level(id)
);

--

INSERT
INTO main_sec.group (name, group_level, access_level_id, is_owner, is_active)
VALUES
('System', 0, 1, '1', '1'),
('Internal', 0, 2, '1', '1');
