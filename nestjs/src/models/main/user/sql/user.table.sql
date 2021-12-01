-- CREATE TABLE USER
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  username VARCHAR(45),
  password VARCHAR(85),
  passcode VARCHAR(4),

  contact_id INT,
  role_id INT,
  form_id INT,
  org_id INT,

  is_new_password BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  UNIQUE(username),
  UNIQUE(passcode),
  FOREIGN KEY(role_id) REFERENCES sec.role(id),
  FOREIGN KEY(contact_id) REFERENCES org.contact(id)
);

-- CREATE JOIN TABLE USER_LOCATION
CREATE TABLE IF NOT EXISTS sec.user_location (
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, location_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE CASCADE,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_location ON sec.user_location(user_id, location_id);