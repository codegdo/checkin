ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT SELECT ON TABLES TO api_manager;

ALTER USER api_app PASSWORD 'password';
ALTER USER api_worker PASSWORD 'password';
ALTER USER api_manager PASSWORD 'password';

GRANT ALL PRIVILEGES ON SCHEMA public TO public;
REVOKE ALL PRIVILEGES ON SCHEMA public FROM public;

GRANT USAGE ON SCHEMA public TO public;
REVOKE USAGE ON SCHEMA public FROM public;

GRANT USAGE ON SCHEMA public TO api_manager;
REVOKE USAGE ON SCHEMA public FROM api_manager;

GRANT CREATE ON SCHEMA public TO api_manager;
REVOKE CREATE ON SCHEMA public FROM api_manager;

GRANT EXECUTE ON PROCEDURE pr_required_run_script(text, text, integer) TO api_manager;
REVOKE EXECUTE ON PROCEDURE pr_required_run_script(text, text, integer) FROM api_manager;

GRANT EXECUTE ON PROCEDURE pr_required_drop_functions(text[]) TO api_manager;
REVOKE EXECUTE ON PROCEDURE pr_required_drop_functions(text[]) FROM api_manager;

GRANT EXECUTE ON FUNCTION fn_required_drop_procedures(text[]) TO api_manager;
REVOKE EXECUTE ON FUNCTION fn_required_drop_procedures(text[]) FROM api_manager;

ALTER PROCEDURE pr_required_run_script(text, text, integer) OWNER TO api_manager;
ALTER PROCEDURE pr_required_drop_functions(text[]) OWNER TO api_manager;
ALTER PROCEDURE pr_required_drop_procedures(text[]) OWNER TO api_manager;

ALTER PROCEDURE pr_required_run_script(text, text, integer) OWNER TO postgres;
ALTER PROCEDURE pr_required_drop_functions(text[]) OWNER TO postgres;
ALTER PROCEDURE pr_required_drop_procedures(text[]) OWNER TO postgres;

SELECT * FROM pg_get_granted_privileges_by_user('api_manager');

SELECT * FROM pg_get_all_privileges();

-- important - api_app inherit public and public has EXECUTE by default
REVOKE EXECUTE ON PROCEDURE pr_migration_get_scripts_by_id(int) FROM public;
GRANT EXECUTE ON PROCEDURE pr_migration_get_scripts_by_id(int) TO api_app;