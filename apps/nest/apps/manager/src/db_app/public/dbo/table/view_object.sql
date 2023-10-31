CREATE TABLE IF NOT EXISTS view_object (
  view_id INT NOT NULL,
  object_id INT NOT NULL,
  company_id INT,

  PRIMARY KEY (view_id, object_id),
  FOREIGN KEY (view_id) REFERENCES view(id) ON DELETE CASCADE,
  FOREIGN KEY (object_id) REFERENCES object(id) ON DELETE CASCADE
);

DO $$
BEGIN
  IF (SELECT COUNT(*) FROM view_object) = 0 THEN

    INSERT INTO view_object(view_id, object_id, company_id) VALUES

    (1,1,null),

    (150,150,null),
    (150,151,null),
    (150,152,null),
    (150,153,null),
    (150,154,null),
    (150,155,null),
    (151,151,null),
    (152,152,null),
    (153,153,null),
    (154,154,null),
    (155,155,null),

    (200,200,null),
    (200,201,null),
    (200,202,null),
    (200,203,null),
    (200,204,null),
    (201,201,null),
    (202,202,null),
    (203,203,null),
    (204,204,null),

    (950,950,null),

    (1000,1000,null),
    (1000,1001,null),
    (1000,1002,null),
    (1000,1003,null),
    (1000,1004,null),
    (1001,1001,null),
    (1002,1002,null),
    (1003,1003,null),
    (1004,1004,null),

    (1150,1150,null),
    (1151,1151,null);

  ELSE
    RAISE NOTICE 'The view_object table is not empty.';
  END IF;
END;
$$;