-- CREATE FUNCTION USER SIGNUP
CREATE OR REPLACE FUNCTION sec.fn_user_signup(
  p_first_name VARCHAR, 
  p_last_name VARCHAR, 
  p_email_address VARCHAR, 
  p_username VARCHAR, 
  p_password VARCHAR,
  p_data JSONB, 
  p_expired_at INT
)
--RETURNS RECORD
--RETURNS sec.user
RETURNS UUID
LANGUAGE plpgsql
AS
$$
  DECLARE
    contactId INT;
    userId INT;
    tokenId UUID;
    rec RECORD;
  BEGIN

    INSERT INTO org.contact(
      first_name,
      last_name,
      email_address
    )
    VALUES(p_first_name, p_last_name, p_email_address)
    RETURNING id INTO contactId;

    INSERT INTO sec.user(
      username,
      password,
      contact_id
    )
    VALUES(p_username, p_password, contactId)
    RETURNING id INTO userId;
    
    INSERT INTO sec.token(
      data, 
      expired_at
    ) 
    VALUES (p_data, p_expired_at)
    RETURNING id INTO tokenId;
    
    --rec := (contactId, userId, tokenId);
    
    --RETURN rec;
    RETURN tokenId;
  END;
$$;

SELECT * FROM sec.fn_user_signup('giang','do', 'giangd@gmail.com', 'gdo', 'password','{"username":"gdo"}', '123456');


CREATE OR REPLACE FUNCTION sec.fn_user_signup(
  p_first_name VARCHAR,
  p_last_name VARCHAR,
  p_email_address VARCHAR,
  p_username VARCHAR,
  p_password VARCHAR,
  p_data JSONB,
  p_expired_at INT
)
RETURNS SETOF sec.token
--RETURNS TABLE(token_id uuid)
LANGUAGE plpgsql
AS
$$
  BEGIN
    RETURN QUERY
    WITH c AS (
      INSERT INTO org.contact(
        first_name,
        last_name,
        email_address
      )
      VALUES (p_first_name, p_last_name, p_email_address)
      RETURNING id
    ), u AS (
      INSERT INTO sec.user(
        username,
        password,
        contact_id
      )
      --SELECT p_username, p_password, c.id FROM c
      VALUES(p_username, p_password, (SELECT id FROM c))
    )
    INSERT INTO sec.token(
      data,
      expired_at
    )
    --SELECT p_data, p_expired_at
    VALUES(p_data, p_expired_at)
    --RETURNING id;
    RETURNING *;
  END;
$$;


SELECT (sec.fn_user_signup('giang','do', 'giangd@gmail.com', 'gdo', 'password','{"username":"gdo"}', '123456')).*;


-- CREATE FUNCTION GET USER
CREATE OR REPLACE FUNCTION sec.fn_get_user(p_username VARCHAR)
RETURNS TABLE (
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "emailAddress" VARCHAR,
  username VARCHAR
)
LANGUAGE plpgsql
AS
$$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        c.first_name,
        c.last_name,
        c.email_address,
        u.username
      FROM sec.user u
      LEFT JOIN org.contact c ON c.id = u.contact_id
      WHERE u.username = p_username;
  END;
$$;

-- CREATE FUNCTION LOGIN USER
CREATE OR REPLACE FUNCTION sec.fn_login_user(p_username VARCHAR)
RETURNS TABLE (
  id INT,
  "firstName" VARCHAR,
  "lastName" VARCHAR,
  "emailAddress" VARCHAR,
  username VARCHAR,
  password VARCHAR,
  "roleId" INT,
  "roleType" dbo.role_type_enum,
  policy JSONB,
  "orgId" INT,
  "orgActive" BOOLEAN,
  "isActive" BOOLEAN,
  "isOwner" BOOLEAN
)
LANGUAGE plpgsql
AS
$$
  DECLARE

  BEGIN
    RETURN QUERY
      SELECT
        u.id,
        c.first_name,
        c.last_name,
        c.email_address,
        u.username,
        u.password,
        r.id,
        rt.name,
        p.data,
        u.org_id,
        o.is_active,
        u.is_active,
        r.is_owner
      FROM sec.user u
      LEFT JOIN sec.role r ON r.id = u.role_id
      LEFT JOIN sec.role_policy rp ON rp.role_id = r.id
      LEFT JOIN sec.policy p ON rp.policy_id = p.id
      LEFT JOIN dbo.role_type rt ON rt.id = r.role_type_id
      LEFT JOIN sec.organization o ON o.id = u.org_id
      LEFT JOIN org.contact c ON c.id = u.contact_id
      WHERE u.username = p_username;
  END;
$$;

SELECT * FROM sec.fn_login_user('gdo');




