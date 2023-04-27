-- ACCOUNT
CREATE TABLE main_sec.account (
  id serial PRIMARY KEY,
  company_id int,
  owner_id int,
  is_active boolean DEFAULT FALSE,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  FOREIGN KEY (company_id) REFERENCES main_sec.company(id),
  FOREIGN KEY (owner_id) REFERENCES main_sec.user(id)
);
