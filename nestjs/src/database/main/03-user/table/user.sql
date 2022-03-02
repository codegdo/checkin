-- CREATE TABLE USER
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  username VARCHAR(45),
  password VARCHAR(85),
  passcode VARCHAR(4),

  custom JSONB DEFAULT '[]'::jsonb,

  contact_id INT,
  group_id INT,
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
  FOREIGN KEY(group_id) REFERENCES sec.group(id),
  FOREIGN KEY(contact_id) REFERENCES org.contact(id)
);