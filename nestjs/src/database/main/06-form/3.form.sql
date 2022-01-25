-- CREATE TABLE FORM
CREATE TABLE IF NOT EXISTS org.form (
  id SERIAL,
  name VARCHAR(95),
  label VARCHAR(95),
  description VARCHAR(255),

  data JSONB NOT NULL DEFAULT '[
    {
      "id": "f-wrap", 
      "type": "div", 
      "role": "block", 
      "data": [], 
      "position": 0, 
      "parentId": null
    },
    {
      "id": "f-header", 
      "type": "div", 
      "role": "block", 
      "data": [], 
      "position": 1, 
      "parentId": "f-wrap"
    },
    {
      "id": "f-main", 
      "type": "div", 
      "role": "block", 
      "data": [], 
      "position": 2, 
      "parentId": "f-wrap"
    },
    {
      "id": "f-footer", 
      "type": "div", 
      "role": "block", 
      "data": [], 
      "position": 3, 
      "parentId": "f-wrap"
    }
  ]'::jsonb,

  form_type_id INT,
  org_id INT,

  is_active BOOLEAN,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL
);

INSERT
INTO org.form (name, label, description, form_type_id, org_id, is_active)
VALUES
('login', 'Login', null, '1', null, '1'),
('signup', 'Signup', null, '1', null, '1');