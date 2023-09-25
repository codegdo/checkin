-- Create the '_dbo.form_type_object' table
CREATE TABLE IF NOT EXISTS _dbo.form_type_object (
  form_type_id INT NOT NULL,
  object_id INT NOT NULL,
  company_id INT,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(form_type_id, object_id),
  FOREIGN KEY(form_type_id) REFERENCES _dbo.form_type(id),
  FOREIGN KEY(object_id) REFERENCES _dbo.object(id)
);

-- Insert data into the 'form_type_object' table
INSERT INTO _dbo.form_type_object (form_type_id, object_id, company_id) VALUES
(1,1,null),
(1,2,null),
(1,3,null),
(1,4,null),
(1,5,null);
