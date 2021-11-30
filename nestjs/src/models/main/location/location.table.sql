-- CREATE TABLE LOCATION
CREATE TABLE IF NOT EXISTS org.location (
  id SERIAL NOT NULL,

  name CHARACTER VARYING(95),

  street_address CHARACTER VARYING(95),
  city CHARACTER VARYING(95),
  postal_code CHARACTER VARYING(18),
  territory_id INT,

  phone_number CHARACTER VARYING(20),
  fax_number CHARACTER VARYING(20),

  owner_id INT,
  org_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(territory_id) REFERENCES dbo.territory(id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
);