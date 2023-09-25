-- Create the 'org.field_default' table
CREATE TABLE IF NOT EXISTS org.field_default (
  form_type_id INT NOT NULL,
  field_id INT NOT NULL,
  company_id INT,
  default_required BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(form_type_id, field_id),
  FOREIGN KEY(form_type_id) REFERENCES main_dbo.form_type(id),
  FOREIGN KEY(field_id) REFERENCES org.field(id)
);

-- Insert data into the 'field_default' table
INSERT INTO org.field_default (form_type_id, field_id, company_id, default_required) VALUES
(1,27,null,'1'),
(1,28,null,'1'),
(1,29,null,'1'),
(1,30,null,'1'),
(1,1,null,'1'),
(1,2,null,'1'),
(1,6,null,'1'),
(1,26,null,'1'),
(1,39,null,'1'),
(1,41,null,'1'),
(1,42,null,'1'),
(1,43,null,'1'),
(1,44,null,'1'),
(1,45,null,'1'),
(1,46,null,'1'),
(1,31,null,'1');