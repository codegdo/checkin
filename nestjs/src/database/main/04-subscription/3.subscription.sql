-- TABLE
CREATE TABLE IF NOT EXISTS org.subscription (

  subscription_plan_id INT NOT NULL,
  subscription_type_id INT NOT NULL,
  workspace_id INT NOT NULL,
  org_id INT NOT NULL,
  owner_id INT NOT NULL,
  
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
  PRIMARY KEY(module_id, org_id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL,
  FOREIGN KEY(org_id) REFERENCES sec.organization(id) ON DELETE SET NULL,
  FOREIGN KEY(subscription_type_id) REFERENCES dbo.subscription_type(id)
);