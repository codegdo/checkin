-- CREATE TABLE SUBSCRIPTION_AUDIT
CREATE TABLE IF NOT EXISTS org.subscription_audit (
  id SERIAL NOT NULL,
  subscription_id INT,
  subscription_plan_id INT,
  workspace_id INT,
  biz_id INT,
  owner_id INT,
  
  is_active BOOLEAN,
  is_renew BOOLEAN,
  is_trial BOOLEAN,

  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);