-- CREATE TABLE GRIDVIEW
CREATE TABLE IF NOT EXISTS org.gridview (
  id SERIAL,
  gridview_type_id INT,
  org_id INT,

  data JSONB NOT NULL DEFAULT '[]'::jsonb,

  is_active BOOLEAN DEFAULT TRUE,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(gridview_type_id) REFERENCES dbo.gridview_type(id) ON DELETE SET NULL
);

INSERT
INTO org.gridview (gridview_type_id, org_id)
VALUES
(1, 2);