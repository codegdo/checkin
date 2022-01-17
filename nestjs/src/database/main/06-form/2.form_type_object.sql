-- CREATE TABLE FORM_TYPE_OBJECT
CREATE TABLE IF NOT EXISTS dbo.form_type_object (
  form_type_id INT NOT NULL,
  object_id INT NOT NULL,
  org_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  --
  PRIMARY KEY(form_type_id, object_id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL,
  FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE SET NULL
);

CREATE INDEX idx_form_type_object  ON dbo.form_type_object (form_type_id, object_id);

INSERT
INTO dbo.form_type_object(form_type_id, object_id, org_id)
VALUES
--user
('1', '1', null),
('1', '2', null);