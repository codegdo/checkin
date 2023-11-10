CREATE TABLE IF NOT EXISTS view_object (
  view_id INT NOT NULL,
  object_id INT NOT NULL,
  company_id INT,
  sort_order INT,

  PRIMARY KEY (view_id, object_id),
  FOREIGN KEY (view_id) REFERENCES view(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES object(id) ON DELETE CASCADE
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM view_object) = 0 THEN

    INSERT INTO view_object(view_id, object_id, company_id, sort_order) VALUES

    (2,7,null,1),
    (2,8,null,2),
    (2,9,null,3),
    (2,10,null,4),

    (3,5,null,6),
    (3,6,null,7),

    (4,1,null,9),
    (4,2,null,10),
    (4,3,null,11),
    (4,4,null,12),

    (101,7,null,14),
    (101,8,null,15),
    (101,9,null,16),

    (111,7,null,18),
    (111,8,null,19),
    (111,9,null,20),
    (111,10,null,21);

  ELSE
    RAISE NOTICE 'The view_object table is not empty.';
  END IF;
END;
$$;