CREATE TABLE IF NOT EXISTS policy (
  id serial PRIMARY KEY,
  name VARCHAR(255),
  data JSONB DEFAULT '{"version": "1.0", "permission": {}, "statement": []}',
  
  role_type_id INT NOT NULL,
  company_id INT,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END,
  updated_by VARCHAR(50)
);