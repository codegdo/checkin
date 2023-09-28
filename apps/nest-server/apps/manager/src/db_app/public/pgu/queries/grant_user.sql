CREATE ROLE custom_role;

-- Grant SELECT privilege on a specific table to custom_role
GRANT SELECT ON table_name TO custom_role;

GRANT CREATE ON SCHEMA public TO api_manager_user;
REVOKE CREATE ON SCHEMA public FROM api_manager_user;

CREATE USER myuser;

-- Assign password to user
ALTER USER myuser PASSWORD 'new_password';

-- Assign user to role group
ALTER ROLE myuser IN ROLE custom_role; 
-- or
GRANT custom_role TO myuser;

