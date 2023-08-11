CREATE TABLE main_sec.contact (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  address VARCHAR(100),
  city VARCHAR(50),
  zipcode VARCHAR(15),
  territory_id INT,
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (territory_id) REFERENCES main_pub.territory(id)
);