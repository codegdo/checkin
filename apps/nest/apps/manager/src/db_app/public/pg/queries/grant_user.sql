CREATE ROLE db_admin_role;

-- grant SELECT privilege on a specific table to custom_role
GRANT SELECT ON table_name TO custom_role;

GRANT USAGE ON SCHEMA public TO api_manager;
REVOKE USAGE ON SCHEMA public FROM api_manager;

GRANT CREATE ON SCHEMA public TO api_manager;
REVOKE CREATE ON SCHEMA public FROM api_manager;

GRANT USAGE ON SCHEMA public TO api_manager;

CREATE USER db_admin;

-- assign password to user
ALTER USER db_admin PASSWORD 'new_password';

-- inherit role
ALTER ROLE api_manager INHERIT superuser;
ALTER ROLE api_manager INHERIT nosuperuser;

-- member of or role group
GRANT db_admin_role TO db_admin;

--


REVOKE ALL ON SCHEMA public FROM PUBLIC;

GRANT db_admin_role TO api_manager;
REVOKE db_admin_role FROM api_manager;

REVOKE ALL PRIVILEGES ON DATABASE your_database FROM username;


SELECT proname, proacl FROM pg_proc WHERE proname = 'pr_required_run_script';
SELECT has_function_privilege('api_app_user', 'pr_required_run_script(text, text, integer)', 'EXECUTE');



ALTER USER api_app_user PASSWORD 'password';
ALTER USER api_worker_user PASSWORD 'password';
ALTER USER api_manager PASSWORD 'password';


