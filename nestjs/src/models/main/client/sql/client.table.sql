-- CREATE TABLE CLIENT
CREATE TABLE IF NOT EXISTS sec.client (
  id SERIAL NOT NULL,
  first_name VARCHAR(45),
  last_name VARCHAR(45),
  email_address VARCHAR(45),
  phone_number VARCHAR(20),
  day_of_birth DATE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  --
  PRIMARY KEY(id),
  UNIQUE(phone_number)
);

-- CREATE JOIN TABLE CLIENT_LOCATION
CREATE TABLE IF NOT EXISTS sec.client_location (
  client_id INT NOT NULL,
  location_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(client_id, location_id),
  FOREIGN KEY(client_id) REFERENCES sec.client(id) ON DELETE CASCADE,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE CASCADE
);