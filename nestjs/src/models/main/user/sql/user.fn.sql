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
$$
LANGUAGE plpgsql;


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
$$
LANGUAGE plpgsql;

SELECT (sec.fn_user_signup('giang','do', 'giangd@gmail.com', 'gdo', 'password','{"username":"gdo"}', '123456')).*;

SELECT * FROM sec.fn_user_signup('giang','do', 'giangd@gmail.com', 'gdo', 'password','{"username":"gdo"}', '123456');