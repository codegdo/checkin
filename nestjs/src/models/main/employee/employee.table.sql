CREATE TABLE IF NOT EXISTS sec.employee (
  id SERIAL NOT NULL,

  first_name VARCHAR(45),
  last_name VARCHAR(45),
  passcode VARCHAR(20),

  street_address VARCHAR(95),
  city VARCHAR(95),
  postal_code VARCHAR(18),
  territory_id INT,
  phone_number VARCHAR(20),

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  --
  PRIMARY KEY(id),
  UNIQUE(passcode),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id)
);