-- CREATE TABLE USER
CREATE TABLE IF NOT EXISTS sec.user (
  id SERIAL NOT NULL,
  email_address VARCHAR(45),
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
  FOREIGN KEY(role_id) REFERENCES sec.role(id)
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
CREATE OR REPLACE FUNCTION sec.fn_signupuser(_email_address varchar, _username varchar, _password varchar)
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
      VALUES(_email_address, _username, _password)
      RETURNING id
    )
    TABLE u;
  END;
$$
LANGUAGE plpgsql;

SELECT sec.fn_signupuser('giangd@gmail.com', 'gdo1111111', 'hello');

-- CREATE PROCEDURE SIGNUP_USER
CREATE OR REPLACE PROCEDURE sec.sp_signupuser(_email_address varchar, _username varchar, _password varchar)
AS
$$
  BEGIN
    INSERT INTO sec.user(
      email_address,
      username,
      password
    )
    VALUES(_email_address, _username, _password);
    COMMIT;
  END;
$$
LANGUAGE plpgsql;

CALL sec.sp_signupuser('giangd@gmail.com', 'gdo11111111', 'hello');