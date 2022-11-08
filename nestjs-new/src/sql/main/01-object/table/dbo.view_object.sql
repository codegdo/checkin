-- VIEW_OBJECT
CREATE TABLE
  dbo.view_object (
    view_id INTEGER NOT NULL,
    object_id INTEGER NOT NULL,
    company_id INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    --
    PRIMARY KEY(view_id, object_id),
    FOREIGN KEY(view_id) REFERENCES dbo.view(id) ON DELETE
    SET
      NULL,
      FOREIGN KEY(object_id) REFERENCES dbo.object(id) ON DELETE
    SET
      NULL
  );


CREATE INDEX idx_view_object ON dbo.view_object(view_id, object_id);


INSERT INTO
  dbo.view_object(view_id, object_id, company_id)
VALUES
  (100, 3, null),
  (100, 4, null),
  (100, 5, null),
  (100, 6, null),
  (100, 7, null),
  (100, 8, null),
  (100, 9, null),
  (100, 10, null),
  (101, 2, null),
  (101, 4, null),
  (101, 6, null),
  (200, 1, null),
  (201, 3, null),
  (201, 4, null),
  (201, 5, null),
  (201, 6, null),
  (201, 7, null),
  (201, 8, null),
  (201, 9, null),
  (201, 10, null),
  (202, 3, null),
  (202, 7, null),
  (202, 9, null),
  (203, 9, null),
  (204, 10, null),
  (205, 5, null),
  (206, 12, null),
  (207, 13, null),
  (208, 14, null),
  (209, 15, null),
  (210, 16, null),
  (211, 17, null),
  (212, 18, null),
  (213, 19, null),
  (214, 20, null),
  (215, 21, null),
  (300, 3, null),
  (301, 4, null),
  (302, 11, null),
  (400, 22, null),
  (401, 23, null),
  (402, 24, null),
  (500, 25, null),
  (510, 26, null),
  (520, 27, null),
  (530, 28, null);