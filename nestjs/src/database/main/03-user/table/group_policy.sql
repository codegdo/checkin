-- CREATE TABLE GROUP_POLICY
CREATE TABLE IF NOT EXISTS sec.group_policy (
  group_id INT NOT NULL,
  policy_id INT NOT NULL,
  biz_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(group_id, policy_id),
  FOREIGN KEY(group_id) REFERENCES sec.group(id) ON DELETE SET NULL,
  FOREIGN KEY(policy_id) REFERENCES sec.policy(id) ON DELETE SET NULL
);

CREATE INDEX idx_group_policy ON sec.group_policy(group_id, policy_id);

INSERT
INTO sec.group_policy(group_id, policy_id)
VALUES
('1', '1'),
('2', '2');