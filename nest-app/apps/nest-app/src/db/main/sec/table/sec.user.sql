-- USER
CREATE TABLE main_sec.user (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  passcode NUMERIC(4),
  group_id INT,
  role_id INT,
  company_id INT,
  is_reset_required BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (group_id) REFERENCES main_sec.group(id)
);


-- Roles help you manage permissions
-- Groups help you manage objects and subjects