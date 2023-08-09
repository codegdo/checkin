-- FORM
CREATE TABLE main_com.form (
  id SERIAL PRIMARY KEY,

  label VARCHAR(255),
  description VARCHAR(255),

  form_type_id INT,
  company_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (form_type_id) REFERENCES main_dbo.form_type(id)
);


-- Create a trigger function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER form_update_trigger
BEFORE UPDATE ON main_org.form
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

INSERT INTO main_com.form(form_type_id, company_id, label, description, is_active, is_published) VALUES
('1',null,'Signup','New user signup','1','1');