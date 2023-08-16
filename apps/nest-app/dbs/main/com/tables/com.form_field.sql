-- Create the 'form_field' table
CREATE TABLE main_com.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,

  label VARCHAR(100),
  description TEXT,
  hint VARCHAR(255),
  placeholder VARCHAR(100),

  default_value VARCHAR(255),

  position INT DEFAULT 0,
  map_to_parent VARCHAR(10),

  is_required BOOLEAN DEFAULT FALSE,
  is_disabled BOOLEAN DEFAULT FALSE,
  is_hidden BOOLEAN DEFAULT FALSE,
  is_readonly BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  updated_by VARCHAR(50),

  PRIMARY KEY(form_id, field_id),
  FOREIGN KEY(form_id) REFERENCES main_com.form(id),
  FOREIGN KEY(field_id) REFERENCES main_com.field(id)
);


-- Create a trigger that fires on UPDATE and calls the function
CREATE TRIGGER form_field_update_trigger
BEFORE UPDATE ON main_com.form_field
FOR EACH ROW
EXECUTE FUNCTION fn_updated_at();