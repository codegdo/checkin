DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_type
    WHERE typname = 'type_user_role_info'
  ) THEN
    -- Create the custom composite type
    CREATE TYPE type_user_role_info AS (
      role_name text,
      is_superuser boolean,
      inherits_roles boolean,
      member_of text[]
    );
  END IF;
END $$;
