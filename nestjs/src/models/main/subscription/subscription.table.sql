CREATE TABLE IF NOT EXISTS org.subscription (
  module_id INT NOT NULL,
  org_id INT NOT NULL,
  plan_id INT,
  is_renewed BOOLEAN,
  is_trial BOOLEAN,
  start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  end_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(module_id, org_id),
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE CASCADE,
  FOREIGN KEY(org_id) REFERENCES sec.organization(id) ON DELETE CASCADE,
  FOREIGN KEY(plan_id) REFERENCES dbo.plan(id)
);