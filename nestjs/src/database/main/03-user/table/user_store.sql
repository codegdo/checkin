-- CREATE TABLE USER_STORE
CREATE TABLE IF NOT EXISTS sec.user_store (
  user_id INT NOT NULL,
  store_id INT NOT NULL,
  biz_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, store_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE SET NULL,
  FOREIGN KEY(store_id) REFERENCES org.store(id) ON DELETE SET NULL
);

CREATE INDEX idx_user_store ON sec.user_store(user_id, store_id);