-- TABLE
CREATE TABLE IF NOT EXISTS org.subscription_purchase (
  id SERIAL,
  subscription_id INT NOT NULL,
  org_id INT NOT NULL,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
);