-- Create the 'form_field' table
CREATE TABLE main_com.form_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,

  title VARCHAR(255),
  description TEXT,
  hint VARCHAR(255),
  placeholder VARCHAR(100),

  default_value VARCHAR(255),

  min INT,
  max INT,
  pattern VARCHAR(255),

  accessibility JSON,
  validation JSON,
  translation JSON,

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


INSERT INTO main_com.form_field (form_id, field_id, title, is_required) VALUES
(1,1,'Company Name','1'),
(1,20,'Business Type','1'),
(1,21,'Username','1'),
(1,22,'Password','1'),
(1,26,'Name','1'),
(1,27,'First Name','1'),
(1,28,'Last Name','1'),
(1,29,'Email','1'),
(1,30,'Phone','1');