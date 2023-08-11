-- FIELD
CREATE TABLE main_comp.field (
  id SERIAL PRIMARY KEY,

  name VARCHAR(50) NOT NULL,

  type VARCHAR(20) NOT NULL,
  data_type VARCHAR(20) NOT NULL,
  
  value VARCHAR(100),
  data_value JSON,

  length INT,

  mapping VARCHAR(100),
  lookup VARCHAR(100),

  map_to_parent VARCHAR(10),

  parent_id INT,
  object_id INT,
  company_id INT,
  
  has_dependent BOOLEAN NOT NULL DEFAULT FALSE,
  is_dependent BOOLEAN NOT NULL DEFAULT FALSE,

  is_key BOOLEAN NOT NULL DEFAULT FALSE,
  is_new BOOLEAN NOT NULL DEFAULT TRUE,
  is_renew BOOLEAN NOT NULL DEFAULT TRUE,
  is_internal BOOLEAN NOT NULL DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  CONSTRAINT field_name_unique UNIQUE (name),
  CHECK (type IN ('text', 'number', 'date', 'email', 'tel', 'radio', 'checkbox', 'component')),
  CHECK (data_type IN ('field', 'group', 'grid')),
  FOREIGN KEY (object_id) REFERENCES main_dbo.object(id)
);

-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER field_update_trigger
BEFORE UPDATE ON main_comp.field
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();

INSERT INTO main_comp.form(form_type_id, company_id, label, description, is_active, is_published) VALUES
('1',null,'Signup','New user signup','1','1');