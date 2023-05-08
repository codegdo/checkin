CREATE OR REPLACE FUNCTION main_sec.generate_random_four_digit_number()
RETURNS integer AS
$$
DECLARE
    random_number integer;
BEGIN
    random_number := floor(random() * 9000 + 1000)::integer;
    RETURN random_number;
END;
$$
LANGUAGE plpgsql;