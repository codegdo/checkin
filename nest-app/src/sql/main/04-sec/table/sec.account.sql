-- ACCOUNT
CREATE TABLE main_sec.account (
  id serial PRIMARY KEY,
  subscription_id int,
  owner_id int,
  is_active boolean DEFAULT FALSE,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
  updated_by varchar(50),

  FOREIGN KEY (subscription_id) REFERENCES main_sec.subscription(id),
  FOREIGN KEY (owner_id) REFERENCES main_sec.user(id),
);

-- Roles help you manage permissions
-- Groups help you manage objects and subjects