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

    (101,101,null),
    (101,102,null),
    (101,103,null),
    (101,104,null),
    (101,105,null),

    (151,151,null),
    (151,152,null),
    (151,153,null),
    (151,154,null),
    (151,155,null),
    (151,156,null),

    (951,951,null),

    (1051,1051,null),
    (1051,1052,null),
    (1051,1053,null),
    (1051,1054,null),
    (1051,1055,null),
    (1052,1052,null),
    (1053,1053,null),
    (1054,1054,null),
    (1055,1055,null),

    (1151,1151,null),
    (1152,1152,null);

  ELSE
    RAISE NOTICE 'The view_object table is not empty.';
  END IF;
END;
$$;