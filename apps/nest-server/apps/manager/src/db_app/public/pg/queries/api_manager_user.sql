ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO api_manager_user;

ALTER USER api_app_user PASSWORD 'password';
ALTER USER api_worker_user PASSWORD 'password';
ALTER USER api_manager_user PASSWORD 'password';

GRANT ALL PRIVILEGES ON SCHEMA public TO PUBLIC;
REVOKE ALL PRIVILEGES ON SCHEMA public FROM PUBLIC;

GRANT USAGE ON SCHEMA public TO PUBLIC;
REVOKE USAGE ON SCHEMA public FROM PUBLIC;

GRANT USAGE ON SCHEMA public TO api_manager_user;
REVOKE USAGE ON SCHEMA public FROM api_manager_user;

GRANT CREATE ON SCHEMA public TO api_manager_user;
REVOKE CREATE ON SCHEMA public FROM api_manager_user;

GRANT EXECUTE ON PROCEDURE pr_required_run_script(text, text, integer) TO api_manager_user;
REVOKE EXECUTE ON PROCEDURE pr_required_run_script(text, text, integer) FROM api_manager_user;

GRANT EXECUTE ON PROCEDURE pr_required_drop_functions(text[]) TO api_manager_user;
REVOKE EXECUTE ON PROCEDURE pr_required_drop_functions(text[]) FROM api_manager_user;

GRANT EXECUTE ON FUNCTION fn_required_drop_procedures(text[]) TO api_manager_user;
REVOKE EXECUTE ON FUNCTION fn_required_drop_procedures(text[]) FROM api_manager_user;

ALTER PROCEDURE pr_required_run_script(text, text, integer) OWNER TO api_manager_user;
ALTER PROCEDURE pr_required_drop_functions(text[]) OWNER TO api_manager_user;
ALTER PROCEDURE pr_required_drop_procedures(text[]) OWNER TO api_manager_user;

ALTER PROCEDURE pr_required_run_script(text, text, integer) OWNER TO postgres;
ALTER PROCEDURE pr_required_drop_functions(text[]) OWNER TO postgres;
ALTER PROCEDURE pr_required_drop_procedures(text[]) OWNER TO postgres;

SELECT * FROM pg_get_granted_privileges_by_user('api_manager_user');

SELECT * FROM pg_get_all_privileges();