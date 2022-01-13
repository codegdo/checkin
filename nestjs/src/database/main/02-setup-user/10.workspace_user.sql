-- CREATE TABLE WORKSPACE_USER
CREATE TABLE IF NOT EXISTS org.workspace_user (
  workspace_id INT NOT NULL,
  user_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(workspace_id, user_id),
  FOREIGN KEY(workspace_id) REFERENCES org.workspace(id) ON DELETE SET NULL,
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE SET NULL
);

CREATE INDEX idx_workspace_user ON org.workspace_user(workspace_id, user_id);