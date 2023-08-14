CREATE OR REPLACE FUNCTION fn_generate_random_string(length INT, prefix VARCHAR DEFAULT NULL)
RETURNS VARCHAR AS $$
DECLARE
  chars VARCHAR[] := ARRAY['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
                            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
                            'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3',
                            '4', '5', '6', '7', '8', '9'];
  random_string VARCHAR(15) := ''; -- Change VARCHAR(10) to TEXT
  i INT;
BEGIN
  IF prefix IS NOT NULL THEN
    random_string := prefix;
  END IF;
  
  FOR i IN 1..length LOOP
    random_string := random_string || chars[1 + floor(random() * 36)];
  END LOOP;
  
  RETURN random_string;
END;
$$ LANGUAGE plpgsql;
