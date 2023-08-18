CREATE TABLE main_com.field_default (
  form_type_id INT NOT NULL,
  field_id INT NOT NULL,
  company_id INT,
  default_required BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  --
  PRIMARY KEY(form_type_id, field_id),
  FOREIGN KEY(form_type_id) REFERENCES main_dbo.form_type(id),
  FOREIGN KEY(field_id) REFERENCES main_com.field(id)
);

INSERT INTO main_com.field_default (form_type_id, field_id, company_id, default_required) VALUES
(1,1,null,'1'),
(1,21,null,'1'),
(1,22,null,'1'),
(1,26,null,'1'),
(1,27,null,'1'),
(1,28,null,'1'),
(1,29,null,'1'),
(1,30,null,'1');