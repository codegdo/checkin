-- CREATE TABLE GRIDVIEW CONFIG
CREATE TABLE IF NOT EXISTS org.gridview_config (
  id SERIAL,
  gridview_id INT,
  org_id INT,
  with_paging INT,

  data JSONB NOT NULL DEFAULT '[]'::jsonb,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  created_by VARCHAR(45) DEFAULT CURRENT_USER,
  updated_by VARCHAR(45),
  --
  PRIMARY KEY(id),
  FOREIGN KEY(gridview_id) REFERENCES dbo.gridview(id) ON DELETE SET NULL
);

INSERT
INTO org.gridview_config (gridview_id, org_id, with_paging, data)
VALUES
(1, 1, 20, '{
	"username": {
    "label": "Username",
    "sortOrder": 1,
    "isDefault": 1,
    "isSearch": 1,
    "isVisible": 1
  },
  "firstName": {
    "label": "First Name",
    "sortOrder": 2,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  },
  "lastName": {
    "label": "Last Name",
    "sortOrder": 3,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  },
  "emailAddress": {
    "label": "Email Address",
    "sortOrder": 4,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  },
  "phoneNumber": {
    "label": "Phone Number",
    "sortOrder": 5,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  },
  "level": {
    "label": "Level",
    "sortOrder": 6,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  },
  "group": {
    "label": "Group",
    "sortOrder": 7,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  },
  "type": {
    "label": "Type",
    "sortOrder": 8,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  },
  "isActive": {
    "label": "Active",
    "sortOrder": 9,
    "isDefault": 0,
    "isSearch": 1,
    "isVisible": 1
  }
}');