-- CREATE TABLE USER_WORKSPACE
CREATE TABLE IF NOT EXISTS sec.user_workspace (
  user_id INT NOT NULL,
  workspace_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, workspace_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE SET NULL,
  FOREIGN KEY(workspace_id) REFERENCES org.workspace(id) ON DELETE SET NULL
);

CREATE INDEX idx_user_workspace ON sec.user_workspace(user_id, workspace_id);