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

    (2,2,null),

    (151,151,null),
    (151,152,null),
    (151,153,null),
    (151,154,null),
    (151,155,null),
    (151,156,null),
    (152,152,null),
    (153,153,null),
    (154,154,null),
    (155,155,null),
    (156,156,null),

    (201,201,null),
    (201,202,null),
    (201,203,null),
    (201,204,null),
    (201,205,null),
    (202,202,null),
    (203,203,null),
    (204,204,null),
    (205,205,null),

    (951,951,null),

    (1001,1001,null),
    (1001,1002,null),
    (1001,1003,null),
    (1001,1004,null),
    (1001,1005,null),
    (1002,1002,null),
    (1003,1003,null),
    (1004,1004,null),
    (1005,1005,null),

    (1151,1151,null),
    (1152,1152,null);

  ELSE
    RAISE NOTICE 'The view_object table is not empty.';
  END IF;
END;
$$;