-- Create the 'main_sec.group' table
CREATE TABLE main_sec.group (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  group_level INT DEFAULT 1,
  group_type_id INT NOT NULL,
  company_id INT,
  is_owner BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY(group_type_id) REFERENCES main_sec.group_type(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER group_update_trigger
BEFORE UPDATE ON main_sec.group
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();


--

INSERT
INTO main_sec.group (name, group_level, group_type_id, is_owner, is_active)
VALUES
('System', 0, 1, '1', '1'),
('Internal', 0, 2, '1', '1');