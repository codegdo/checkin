-- CREATE TABLE GRID_FIELD
CREATE TABLE IF NOT EXISTS org.grid_field (
  form_id INT NOT NULL,
  field_id INT NOT NULL,

  label VARCHAR(255),
  description TEXT,

  position INT DEFAULT 0,
  parent_id INT,

  is_required BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(form_id, field_id),
  FOREIGN KEY(form_id) REFERENCES org.form(id) ON DELETE SET NULL,
  FOREIGN KEY(field_id) REFERENCES org.field(id) ON DELETE SET NULL
);

CREATE INDEX idx_grid_field  ON org.grid_field (form_id, field_id);

INSERT
INTO org.grid_field(form_id, field_id, label, position, parent_id)
VALUES
--user_group_grid
('3', '3', 'Name', '0', 15);