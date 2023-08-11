-- Function to generate a random alphanumeric string of length 10
CREATE OR REPLACE FUNCTION fn_generate_random_string(length INT)
RETURNS VARCHAR AS $$
DECLARE
  chars VARCHAR[] := ARRAY['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                            'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
                            '4', '5', '6', '7', '8', '9'];
  random_string VARCHAR(10) := '';
  i INT;
BEGIN
  FOR i IN 1..length LOOP
    random_string := random_string || chars[1 + floor(random() * 36)];
  END LOOP;
  RETURN random_string;
END;
$$ LANGUAGE plpgsql;