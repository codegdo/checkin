-- CREATE TABLE SUBSCRIPTION
CREATE TABLE IF NOT EXISTS org.subscription (
  id SERIAL NOT NULL,
  subscription_plan_id INT NOT NULL,
  workspace_id INT NOT NULL,
  biz_id INT NOT NULL,
  owner_id INT NOT NULL,
  
  is_active BOOLEAN,
  is_renew BOOLEAN,
  is_trial BOOLEAN,

  purchase_date TIMESTAMP,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(subscription_plan_id) REFERENCES dbo.subscription_plan(id)
);