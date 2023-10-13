-- This function generates a random string of a specified length with an optional prefix.
CREATE OR REPLACE FUNCTION fn_generate_random_string(length INT, prefix VARCHAR DEFAULT NULL)
RETURNS VARCHAR AS $$
DECLARE
  -- Define the characters to use for generating the random string.
  chars VARCHAR[] := ARRAY['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                            'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
                            '4', '5', '6', '7', '8', '9'];
  random_string VARCHAR := ''; -- Change VARCHAR(15) to VARCHAR
  i INT;
BEGIN
  -- If a prefix is provided, initialize the random_string with it.
  IF prefix IS NOT NULL THEN
    random_string := prefix;
  END IF;

  -- Generate the random string by appending random characters from 'chars'.
  FOR i IN 1..length LOOP
    random_string := random_string || chars[1 + floor(random() * 36)];
  END LOOP;

  -- Return the generated random string.
  RETURN random_string;
END;
$$ LANGUAGE plpgsql;

REVOKE EXECUTE ON FUNCTION fn_generate_random_string(integer, varchar) FROM public;

-- Example 1: Generate a random string of length 8 without a prefix
--SELECT fn_generate_random_string(8);

-- Example 2: Generate a random string of length 10 with a prefix
--SELECT fn_generate_random_string(10, 'ID-');

