-- CREATE TABLE USER
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  username VARCHAR(45),
  password VARCHAR(85),
  passcode VARCHAR(45),

  contact_id INT,
  role_id INT,
  form_id INT,
  org_id INT,

  is_new_password BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  UNIQUE(username),
  UNIQUE(passcode),
  FOREIGN KEY(role_id) REFERENCES sec.role(id),
  FOREIGN KEY(contact_id) REFERENCES org.contact(id)
);

-- CREATE JOIN TABLE USER_LOCATION
CREATE TABLE IF NOT EXISTS sec.user_location (
  user_id INT NOT NULL,
  location_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(user_id, location_id),
  FOREIGN KEY(user_id) REFERENCES sec.user(id) ON DELETE CASCADE,
  FOREIGN KEY(location_id) REFERENCES org.location(id) ON DELETE CASCADE
);

CREATE INDEX idx_user_location ON sec.user_location(user_id, location_id);




-- CREATE FUNCTION SIGNUP_USER
CREATE OR REPLACE FUNCTION sec.fn_signupuser(p_first_name varchar, p_last_name varchar, p_email_address varchar, p_username varchar, p_password varchar)
RETURNS void
AS
$$
  DECLARE
    contactId integer;
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
      VALUES(p_username, p_password, contactId);
  END;
$$
LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION sec.fn_signupuser(p_first_name varchar, p_last_name varchar, p_email_address varchar, p_username varchar, p_password varchar)
RETURNS SETOF sec.user
--RETURNS TABLE(u_id integer, u_usename varchar)
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
    )
    INSERT INTO sec.user(
      username,
      password,
      contact_id
    )
    SELECT p_username, p_password, id FROM c
    --RETURNING id, username
    RETURNING *;
  END;
$$
LANGUAGE plpgsql;

SELECT (sec.fn_signupuser('trish','do', 'giangd@gmail.com', 'gdo99', 'hello99')).*;



CREATE OR REPLACE FUNCTION sec.fn_signupuser(p_email_address varchar, p_username varchar, p_password varchar)
RETURNS TABLE(row_id int)
AS
$$
  BEGIN
    RETURN QUERY
    
    WITH u AS (
      INSERT INTO sec.user(
        email_address,
        username,
        password
      )
      VALUES(p_email_address, p_username, p_password)
      RETURNING id
    )
    TABLE u;

  END;
$$
LANGUAGE plpgsql;

SELECT sec.fn_signupuser('giangd@gmail.com', 'gdo1111111', 'hello');

-- CREATE PROCEDURE SIGNUP_USER
CREATE OR REPLACE PROCEDURE sec.sp_signupuser(p_email_address varchar, p_username varchar, p_password varchar)
AS
$$
  BEGIN
    INSERT INTO sec.user(
      username,
      password
    )
    VALUES(p_username, p_password);

    INSERT INTO sec.user(
      email_address
    )
    VALUES(p_email_address);
    COMMIT;
  END;
$$
LANGUAGE plpgsql;

CALL sec.sp_signupuser('giangd@gmail.com', 'gdo11111111', 'hello');