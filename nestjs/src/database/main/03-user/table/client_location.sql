-- CREATE TABLE CLIENT_LOCATION
CREATE TABLE IF NOT EXISTS sec.client_location (
  client_id INT NOT NULL,
  location_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(client_id, location_id),
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE SET NULL,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE SET NULL
);

CREATE INDEX idx_client_location ON sec.client_location(client_id, location_id);