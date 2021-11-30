-- CREATE TABLE CONTACT
CREATE TABLE IF NOT EXISTS org.contact (
  id SERIAL NOT NULL,

  first_name CHARACTER VARYING(45),
  last_name CHARACTER VARYING(45),
  email_address CHARACTER VARYING(45),
  phone_number CHARACTER VARYING(20),

  street_address CHARACTER VARYING(95),
  city CHARACTER VARYING(95),
  postal_code INT(18),
  territory_id INT,
  
  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id)
);