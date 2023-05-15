CREATE TABLE main_sec.company (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  street_address VARCHAR(200),
  city VARCHAR(50),
  territory_id INT,
  postal_code VARCHAR(20),
  phone_number VARCHAR(20),
  website VARCHAR(100),
  business_type_id INT,
  is_active BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (group_id) REFERENCES main_sec.group(id),
  FOREIGN KEY (contact_id) REFERENCES main_org.contact(id)
);

