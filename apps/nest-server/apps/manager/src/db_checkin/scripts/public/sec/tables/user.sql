DO $$
BEGIN
  -- Create the 'user' table
  CREATE TABLE IF NOT EXISTS user (
    id SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    passcode NUMERIC(4),
    group_id INT,
    company_id INT,
    is_require_reset BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT FALSE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    created_by VARCHAR(50) DEFAULT CURRENT_USER,
    updated_by VARCHAR(50),

    FOREIGN KEY (group_id) REFERENCES group(id)
  );
END;
$$;

