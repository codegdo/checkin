-- CREATE TABLE WORKSPACE_CLIENT
CREATE TABLE IF NOT EXISTS org.workspace_client (
  workspace_id INT NOT NULL,
  client_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(workspace_id, client_id),
  FOREIGN KEY(workspace_id) REFERENCES org.workspace(id) ON DELETE SET NULL,
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE SET NULL
);

CREATE INDEX idx_workspace_client ON org.workspace_client(workspace_id, client_id);