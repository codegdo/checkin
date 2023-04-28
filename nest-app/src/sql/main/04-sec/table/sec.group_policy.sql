-- Create the 'main_sec.group_policy' table
CREATE TABLE main_sec.group_policy (
  group_id INT NOT NULL,
  policy_id INT NOT NULL,
  company_id INT,
  PRIMARY KEY (group_id, policy_id),
  FOREIGN KEY (group_id) REFERENCES main_sec.group(id) ON DELETE SET NULL,
  FOREIGN KEY (policy_id) REFERENCES main_sec.policy(id) ON DELETE SET NULL
);

-- Create an index on the 'group_id' and 'policy_id' columns
CREATE INDEX idx_group_policy ON main_sec.group_policy(group_id, policy_id);


INSERT
INTO main_sec.group_policy(group_id, policy_id)
VALUES
('1', '1'),
('2', '2');