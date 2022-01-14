-- CREATE TABLE SUBSCRIPTION_PLAN
CREATE TABLE IF NOT EXISTS dbo.subscription_plan (
    id SERIAL NOT NULL,
    name VARCHAR(45),
    description VARCHAR(255),
    duration INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(45) DEFAULT CURRENT_USER,
    updated_by VARCHAR(45),
    --
    PRIMARY KEY(id)
);

INSERT
INTO dbo.subscription_plan(id, name, description, duration)
VALUES

('1', 'monthly', 'Every month', '30'),
('2', 'semiannual', 'Every six month', '180'),
('3', 'annual', 'Every year', '360'),
('4', 'trial', 'Trial', '15');

-- CREATE TABLE SUBSCRIPTION
CREATE TABLE IF NOT EXISTS org.subscription (
  id SERIAL NOT NULL,
  subscription_plan_id INT NOT NULL,
  workspace_id INT NOT NULL,
  org_id INT NOT NULL,
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

-- CREATE TABLE SUBSCRIPTION_AUDIT
CREATE TABLE IF NOT EXISTS org.subscription_audit (
  id SERIAL NOT NULL,
  subscription_id INT,
  subscription_plan_id INT,
  workspace_id INT,
  org_id INT,
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

-- CREATE TABLE SUBSCRIPTION_PURCHASE
CREATE TABLE IF NOT EXISTS org.subscription_purchase (
  id SERIAL,
  subscription_id INT NOT NULL,
  org_id INT NOT NULL,

  payment_method VARCHAR(25),
  status VARCHAR(45),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id)
);

-- CREATE TABLE SUBSCRIPTION_MODULE
CREATE TABLE IF NOT EXISTS org.subscription_module (
  subscription_id INT NOT NULL,
  module_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(subscription_id, module_id),
  FOREIGN KEY(subscription_id) REFERENCES org.subscription(id) ON DELETE SET NULL,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL
);

CREATE INDEX idx_subscription_module ON org.subscription_module(subscription_id, module_id);

-- SELECT TABLES

SELECT * FROM dbo.subscription_plan;

--

-- DROP TABLES

DROP TABLE IF EXISTS
dbo.subscription_plan,
org.subscription,
org.subscription_audit,
org.subscription_purchase,
org.subscription_module CASCADE;

-- END