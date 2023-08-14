CREATE TABLE main_sec.contact (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100),
  
  address VARCHAR(100),
  territory_id INT,
  city VARCHAR(50),
  zip_code VARCHAR(15),
  phone VARCHAR(20),
  
  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (territory_id) REFERENCES main_pub.territory(id)
);