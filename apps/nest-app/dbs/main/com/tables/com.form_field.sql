-- Create the 'form_field' table
CREATE TABLE org.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,

  label VARCHAR(100),
  description VARCHAR(255),
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
  FOREIGN KEY(form_id) REFERENCES org.form(id),
  FOREIGN KEY(field_id) REFERENCES org.field(id)
);


CREATE TABLE main_com.form (
  id SERIAL PRIMARY KEY,

  form_id INT,
  field_id INT,

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