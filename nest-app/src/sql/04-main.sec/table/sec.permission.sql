-- PERMISSION
CREATE TABLE "main.sec".permission(
  id integer generated always as identity not null,
  name varchar(85) unique,
  
  permission_level_id integer,
  view_id integer,
  is_active boolean,

  created_at timestamp default current_timestamp,
  created_by varchar(45) default current_user,
  --
  primary key(id),
  foreign key (permission_level_id) references "main.dbo".permission_level(id) on delete set null,
  foreign key (view_id) references "main.dbo".view(id) on delete set null 
);

/*
{
  "policy": [
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