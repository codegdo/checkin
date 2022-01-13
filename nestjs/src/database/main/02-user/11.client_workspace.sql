-- CREATE TABLE CLIENT_WORKSPACE
CREATE TABLE IF NOT EXISTS sec.client_workspace (
  client_id INT NOT NULL,
  workspace_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(client_id, workspace_id),
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE SET NULL,
  FOREIGN KEY(workspace_id) REFERENCES org.workspace(id) ON DELETE SET NULL
);

CREATE INDEX idx_client_workspace ON sec.client_workspace(client_id, workspace_id);