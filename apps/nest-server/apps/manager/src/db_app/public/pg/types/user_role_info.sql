-- Create a custom composite type to match the result structure
CREATE TYPE user_role_info AS (
    role_name text,
    is_superuser boolean,
    inherits_roles boolean,
    member_of text[]
);