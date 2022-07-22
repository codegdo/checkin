-- CREATE TABLE USER_ACTIVITY
CREATE TABLE IF NOT EXISTS sec.user_activity (
  id SERIAL NOT NULL,
  user_id INT,
  activity_id INT,
  session_id VARCHAR(45),

  history JSONB DEFAULT '[]'::jsonb,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  UNIQUE(username),
  FOREIGN KEY(group_id) REFERENCES sec.group(id),
  FOREIGN KEY(contact_id) REFERENCES org.contact(id)
);