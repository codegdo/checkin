-- Create the 'form' table
CREATE TABLE main_com.form (
  id SERIAL PRIMARY KEY,

  title VARCHAR(255) NOT NULL,
  description TEXT,

  data jsonb DEFAULT '[]',

  form_type_id INT NOT NULL,
  company_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  is_published BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  FOREIGN KEY (form_type_id) REFERENCES main_dbo.form_type(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER form_update_trigger
BEFORE UPDATE ON main_com.form
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();

INSERT INTO main_com.form(form_type_id, company_id, title, description, is_active, is_published) VALUES
('1',null,'Signup','New user signup','1','1');