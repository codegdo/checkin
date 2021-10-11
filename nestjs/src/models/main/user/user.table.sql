-- TABLE
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  email_address VARCHAR(45),
  username VARCHAR(45),
  password VARCHAR(75),

  data JSONB,
  
  contact_id INT,
  location_id INT,
  role_id INT,
  org_id INT,

  is_new_password BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(id),
  UNIQUE(username),
  FOREIGN KEY(role_id) REFERENCES sec.role(id)
);