-- Create the 'account' table
CREATE TABLE IF NOT EXISTS account (
  id SERIAL PRIMARY KEY,
  account_id VARCHAR(10) UNIQUE,
  plan_id INT,
  company_id INT NOT NULL,
  
  is_active BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50),
  FOREIGN KEY (company_id) REFERENCES company(id)
);

