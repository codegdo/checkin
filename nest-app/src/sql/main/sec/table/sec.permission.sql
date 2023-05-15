-- Create the 'main_sec.permission' table
CREATE TABLE main_sec.permission (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  permission_level_id INT,
  view_id INT,
  is_active BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by VARCHAR(50) DEFAULT CURRENT_USER,
  FOREIGN KEY (permission_level_id) REFERENCES main_sec.permission_level(id) ON DELETE SET NULL,
  FOREIGN KEY (view_id) REFERENCES main_sec.view(id) ON DELETE SET NULL
);



/*
{
  "permission": [
    {
      "id": 3,
      "name": "Profile",
      "description": "Profile Access",
      "data": {
        "version": "2023",
        "statement": [
          {
            "sid": 1,
            "action": [
              "profile:getProfile",
              "profile:updateProfile"
            ],
            "effect": "allow",
            "resource": "profile",
            "condition": {}
          }
        ]
      }
    },
    {
      "id": 4,
      "name": "Invite",
      "description": "Invite Access",
      "data": {
        "version": "2023",
        "statement": [
          {
            "sid": 1,
            "action": [
              "invite:getInvite"
            ],
            "effect": "allow",
            "resource": "invite",
            "condition": {}
          }
        ]
      }
    }
  ]
}
*/