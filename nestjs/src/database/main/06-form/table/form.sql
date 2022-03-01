-- CREATE TABLE FORM
CREATE TABLE IF NOT EXISTS org.form (
  id SERIAL,
  name VARCHAR(95),
  label VARCHAR(95),
  description VARCHAR(255),

  data JSONB NOT NULL DEFAULT '[
    {
      "id": "f_header",
      "type": "header",
      "role": "block",
      "data": [],
      "position": 0,
      "parentId": null
    },
    {
      "id": "f_main",
      "type": "main",
      "role": "block",
      "data": [],
      "position": 1,
      "parentId": null
    },
    {
      "id": "f_footer",
      "type": "footer",
      "role": "block",
      "data": [],
      "position": 2,
      "parentId": null
    },
    {
      "id": "f_button",
      "label": "Submit",
      "name": "submit",
      "type": "button",
      "role": "inline",
      "data": null,
      "value": null,
      "position": 3,
      "parentId": "f_footer"
    }
  ]'::jsonb,

  form_type_id INT,
  biz_id INT,

  is_active BOOLEAN DEFAULT TRUE,
  is_publish BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(form_type_id) REFERENCES dbo.form_type(id) ON DELETE SET NULL
);

INSERT
INTO org.form (name, label, description, form_type_id, biz_id, is_publish)
VALUES
('auth_signup', 'Signup', null, '1', null, '1'),
('auth_setup', 'Setup', null, '1', null, '1'),
('user_add', 'Users', null, '2', null, '1');