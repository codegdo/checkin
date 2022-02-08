-- CREATE TABLE SUBSCRIPTION_MODULE
CREATE TABLE IF NOT EXISTS org.subscription_module (
  subscription_id INT NOT NULL,
  module_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(subscription_id, module_id),
  FOREIGN KEY(subscription_id) REFERENCES org.permission(id) ON DELETE SET NULL,
  FOREIGN KEY(module_id) REFERENCES dbo.module(id) ON DELETE SET NULL
);

CREATE INDEX idx_subscription_module ON org.subscription_module(subscription_id, module_id);