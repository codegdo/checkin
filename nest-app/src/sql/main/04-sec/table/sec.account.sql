-- ACCOUNT
CREATE TABLE main_sec.account (
  id INTEGER GENERATED ALWAYS AS IDENTITY NOT NULL,
  name VARCHAR(85),
  street_address VARCHAR(95),
  city VARCHAR(95),
  territory_id INT,
  postal_code VARCHAR(15),
  phone_number VARCHAR(20),
  website VARCHAR(85),
  owner_id INTEGER,
  business_type_id INTEGER,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  PRIMARY KEY (id),
  FOREIGN KEY (group_id) REFERENCES main_sec.group(id),
  FOREIGN KEY (contact_id) REFERENCES main_org.contact(id)
);


-- Roles help you manage permissions
-- Groups help you manage objects and subjects