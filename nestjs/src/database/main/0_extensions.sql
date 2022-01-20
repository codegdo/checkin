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



CREATE OR REPLACE FUNCTION fn_lookup_get_value(OUT data jsonb)
RETURNS jsonb
AS
$BODY$
    DECLARE
      sql text := 'SELECT json_agg(territory)::jsonb FROM dbo.territory';
    BEGIN
      EXECUTE FORMAT(sql) INTO data;
    END;
$BODY$
LANGUAGE plpgsql;





SELECT json_agg(territory)::jsonb FROM dbo.territory;
SELECT array_to_json(array_agg(territory)) FROM dbo.territory;

SELECT json_agg(
    json_build_object(
        'key', territory.id,
        'value', territory.state
    )
) from dbo.territory;


SELECT
    json_build_object(
        'a', json_agg(territory.id),
        'b', json_agg(territory.state)
    )::jsonb
FROM dbo.territory;

SELECT to_jsonb(r)
FROM (
    SELECT
        array_agg(territory.id) AS a,
        array_agg(territory.state) AS b
    FROM dbo.territory
) r;




