-- Create the 'territory' table
CREATE TABLE IF NOT EXISTS territory (
  id SERIAL PRIMARY KEY,
  country VARCHAR(100),
  country_code VARCHAR(3),
  state VARCHAR(100),
  state_code VARCHAR(5),
  region VARCHAR(100),
  continent VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CASE
    WHEN SESSION_USER IS NOT NULL THEN SESSION_USER
    ELSE CURRENT_USER
  END
);

DO $$
BEGIN
  -- Check if the territory table has no records
  IF (SELECT COUNT(*) FROM territory) = 0 THEN
    -- Insert data into the 'territory' table
    INSERT INTO territory (country, country_code, state, state_code, region, continent)
    VALUES
      ('United States', 'USA', 'Alabama', 'AL', 'South', 'North America'),
      ('United States', 'USA', 'Alaska', 'AK', 'West', 'North America'),
      ('United States', 'USA', 'Arizona', 'AZ', 'West', 'North America'),
      ('United States', 'USA', 'Arkansas', 'AR', 'South', 'North America'),
      ('United States', 'USA', 'California', 'CA', 'West', 'North America'),
      ('United States', 'USA', 'Colorado', 'CO', 'West', 'North America'),
      ('United States', 'USA', 'Connecticut', 'CT', 'Northeast', 'North America'),
      ('United States', 'USA', 'Delaware', 'DE', 'Northeast', 'North America'),
      ('United States', 'USA', 'Florida', 'FL', 'Southeast', 'North America'),
      ('United States', 'USA', 'Georgia', 'GA', 'Southeast', 'North America'),
      ('United States', 'USA', 'Hawaii', 'HI', 'West', 'North America'),
      ('United States', 'USA', 'Idaho', 'ID', 'West', 'North America'),
      ('United States', 'USA', 'Illinois', 'IL', 'Midwest', 'North America'),
      ('United States', 'USA', 'Indiana', 'IN', 'Midwest', 'North America'),
      ('United States', 'USA', 'Iowa', 'IA', 'Midwest', 'North America'),
      ('United States', 'USA', 'Kansas', 'KS', 'Midwest', 'North America'),
      ('United States', 'USA', 'Kentucky', 'KY', 'South', 'North America'),
      ('United States', 'USA', 'Louisiana', 'LA', 'South', 'North America'),
      ('United States', 'USA', 'Maine', 'ME', 'Northeast', 'North America'),
      ('United States', 'USA', 'Maryland', 'MD', 'Northeast', 'North America'),
      ('United States', 'USA', 'Massachusetts', 'MA', 'Northeast', 'North America'),
      ('United States', 'USA', 'Michigan', 'MI', 'Midwest', 'North America'),
      ('United States', 'USA', 'Minnesota', 'MN', 'Midwest', 'North America'),
      ('United States', 'USA', 'Mississippi', 'MS', 'South', 'North America'),
      ('United States', 'USA', 'Missouri', 'MO', 'Midwest', 'North America'),
      ('United States', 'USA', 'Montana', 'MT', 'West', 'North America'),
      ('United States', 'USA', 'Nebraska', 'NE', 'Midwest', 'North America'),
      ('United States', 'USA', 'Nevada', 'NV', 'West', 'North America'),
      ('United States', 'USA', 'New Hampshire', 'NH', 'Northeast', 'North America'),
      ('United States', 'USA', 'New Jersey', 'NJ', 'Northeast', 'North America'),
      ('United States', 'USA', 'New Mexico', 'NM', 'West', 'North America'),
      ('United States', 'USA', 'New York', 'NY', 'Northeast', 'North America'),
      ('United States', 'USA', 'North Carolina', 'NC', 'Southeast', 'North America'),
      ('United States', 'USA', 'North Dakota', 'ND', 'Midwest', 'North America'),
      ('United States', 'USA', 'Ohio', 'OH', 'Midwest', 'North America'),
      ('United States', 'USA', 'Oklahoma', 'OK', 'South', 'North America'),
      ('United States', 'USA', 'Oregon', 'OR', 'West', 'North America'),
      ('United States', 'USA', 'Pennsylvania', 'PA', 'Northeast', 'North America'),
      ('United States', 'USA', 'Rhode Island', 'RI', 'Northeast', 'North America'),
      ('United States', 'USA', 'South Carolina', 'SC', 'Southeast', 'North America'),
      ('United States', 'USA', 'South Dakota', 'SD', 'Midwest', 'North America'),
      ('United States', 'USA', 'Tennessee', 'TN', 'South', 'North America'),
      ('United States', 'USA', 'Texas', 'TX', 'South', 'North America'),
      ('United States', 'USA', 'Utah', 'UT', 'West', 'North America'),
      ('United States', 'USA', 'Vermont', 'VT', 'Northeast', 'North America'),
      ('United States', 'USA', 'Virginia', 'VA', 'Southeast', 'North America'),
      ('United States', 'USA', 'Washington', 'WA', 'West', 'North America'),
      ('United States', 'USA', 'West Virginia', 'WV', 'Southeast', 'North America'),
      ('United States', 'USA', 'Wisconsin', 'WI', 'Midwest', 'North America'),
      ('United States', 'USA', 'Wyoming', 'WY', 'West', 'North America'),
      ('United States', 'USA', '--', '--', '--', 'North America')
      ;
  ELSE
    -- The territory table has records
    RAISE NOTICE 'The territory table is not empty.';
  END IF;

END;
$$;