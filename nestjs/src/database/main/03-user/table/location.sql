-- CREATE TABLE LOCATION
CREATE TABLE IF NOT EXISTS org.location (
  id SERIAL NOT NULL,

  name VARCHAR(95),

  street_address VARCHAR(95),
  city VARCHAR(95),
  postal_code VARCHAR(15),
  territory_id INT,

  phone_number VARCHAR(20),
  fax_number VARCHAR(20),

  data JSONB,

  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id)
);