-- Create the 'main_sec.account' table
CREATE TABLE main_sec.account (
  id SERIAL PRIMARY KEY,
  company_id INT,
  owner_id INT,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (company_id) REFERENCES main_sec.company(id),
  FOREIGN KEY (owner_id) REFERENCES main_sec.user(id)
);

