-- CREATE TABLE ROLE_POLICY
CREATE TABLE IF NOT EXISTS sec.role_policy (
  role_id INT NOT NULL,
  policy_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(role_id, policy_id),
  FOREIGN KEY(role_id) REFERENCES sec.role(id) ON DELETE SET NULL,
  FOREIGN KEY(policy_id) REFERENCES sec.policy(id) ON DELETE SET NULL
);

CREATE INDEX idx_role_policy ON sec.role_policy(role_id, policy_id);