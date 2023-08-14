CREATE TABLE main_sec.address (
  id SERIAL PRIMARY KEY,
  street_address VARCHAR(255),
  territory_id INT,
  city VARCHAR(100),
  postal_code VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
