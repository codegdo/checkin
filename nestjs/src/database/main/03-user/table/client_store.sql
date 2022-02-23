-- CREATE TABLE CLIENT_STORE
CREATE TABLE IF NOT EXISTS sec.client_store (
  client_id INT NOT NULL,
  store_id INT NOT NULL,
  biz_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(client_id, store_id),
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE SET NULL,
  FOREIGN KEY(store_id) REFERENCES org.store(id) ON DELETE SET NULL
);

CREATE INDEX idx_client_store ON sec.client_store(client_id, store_id);