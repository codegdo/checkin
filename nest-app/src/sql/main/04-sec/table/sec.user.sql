-- USER
CREATE TABLE main_sec.user(
  id serial PRIMARY KEY,
  username varchar(30) UNIQUE NOT NULL,
  password varchar(100) NOT NULL,
  passcode numeric(4),
  group_id int,
  role_id int,
  company_id int,
  is_reset_required boolean DEFAULT FALSE,
  is_active boolean DEFAULT FALSE,

  created_at timestamp DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by varchar(50) DEFAULT CURRENT_USER,
  updated_by varchar(50),

  FOREIGN KEY (group_id) REFERENCES main_sec.group(id)
);

-- Roles help you manage permissions
-- Groups help you manage objects and subjects