SHOW rds.extensions;
SHOW hba_file;

-- INSTALL EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS postgres_fdw;

-- CREATE DATA WRAPPER SERVER
CREATE SERVER c_checkin_fdw 
FOREIGN DATA WRAPPER postgres_fdw 
OPTIONS (host '127.0.0.1', port '5434', dbname 'c_checkin');

CREATE USER MAPPING FOR current_user 
SERVER c_checkin_fdw;
--OPTIONS (user '', password '')

GRANT USAGE ON FOREIGN 
SERVER c_checkin_fdw 
TO current_user;

-- SHOW 
SELECT * FROM pg_user_mapping;
SELECT * FROM pg_extension;
select * from pg_foreign_server;
