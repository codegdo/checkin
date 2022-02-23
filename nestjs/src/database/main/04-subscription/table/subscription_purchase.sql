-- CREATE TABLE SUBSCRIPTION_PURCHASE
CREATE TABLE IF NOT EXISTS org.subscription_purchase (
  id SERIAL,
  subscription_id INT NOT NULL,
  biz_id INT NOT NULL,

  payment_method VARCHAR(25),
  status VARCHAR(45),
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);