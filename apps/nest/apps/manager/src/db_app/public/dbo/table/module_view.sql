CREATE TABLE IF NOT EXISTS module_view (
  module_id INT NOT NULL,
  view_id INT NOT NULL,
  company_id INT,
  sort_order INT,

  PRIMARY KEY (module_id, view_id),
  FOREIGN KEY (module_id) REFERENCES module(id) ON DELETE SET NULL ON UPDATE CASCADE,
  FOREIGN KEY (view_id) REFERENCES view(id) ON DELETE SET NULL ON UPDATE CASCADE
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM module_view) = 0 THEN
    
    INSERT INTO module_view(module_id, view_id, company_id, sort_order) VALUES

    (2,2,null,1),
    (2,3,null,2),
    (2,4,null,3),

    (21,101,null,5),

    (22,111,null,7);

  ELSE
    RAISE NOTICE 'The module_view table is not empty.';
  END IF;
END;
$$;