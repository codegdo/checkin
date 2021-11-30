CREATE TABLE IF NOT EXISTS sec.organization (
  id SERIAL NOT NULL,
  name CHARACTER VARYING(45) NOT NULL,

  street_address CHARACTER VARYING(45),
  city CHARACTER VARYING(45),
  postal_code CHARACTER VARYING(15),
  territory_id INT,
  phone_number CHARACTER VARYING(15),
  fax_number CHARACTER VARYING(15),
  website CHARACTER VARYING(45),
  subdomain CHARACTER VARYING(45) NOT NULL,

  data JSONB,

  owner_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by CHARACTER VARYING(45) DEFAULT CURRENT_USER,
  updated_by CHARACTER VARYING(45),
  --
  PRIMARY KEY(id),
  UNIQUE(subdomain, owner_id),
  FOREIGN KEY(owner_id) REFERENCES sec.user(id)
);