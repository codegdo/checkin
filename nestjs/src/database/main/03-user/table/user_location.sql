-- CREATE TABLE USER_LOCATION
CREATE TABLE IF NOT EXISTS sec.user_location (
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, location_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE SET NULL,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE SET NULL
);

CREATE INDEX idx_user_location ON sec.user_location(user_id, location_id);