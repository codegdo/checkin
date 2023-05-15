CREATE TABLE main_sec.contact (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email_address VARCHAR(50),
  phone_number VARCHAR(20),
  street_address VARCHAR(100),
  city VARCHAR(100),
  postal_code VARCHAR(15),
  territory_id INT,
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (territory_id) REFERENCES main_pub.territory(id)
);
