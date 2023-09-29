CREATE ROLE db_admin_role;

-- grant SELECT privilege on a specific table to custom_role
GRANT SELECT ON table_name TO custom_role;

GRANT CREATE ON SCHEMA public TO api_manager_user;
REVOKE CREATE ON SCHEMA public FROM api_manager_user;

CREATE USER db_admin;

-- assign password to user
ALTER USER db_admin PASSWORD 'new_password';

-- assign user to role group
--ALTER ROLE db_admin IN ROLE db_admin_role;
--ALTER ROLE db_admin INHERIT db_admin_role;
-- or
GRANT db_admin_role TO db_admin;

--
ALTER ROLE api_manager_user INHERIT superuser;
ALTER ROLE api_manager_user INHERIT nosuperuser;

GRANT db_admin_role TO api_manager_user;
REVOKE db_admin_role FROM api_manager_user;

REVOKE ALL PRIVILEGES ON DATABASE your_database FROM username;


