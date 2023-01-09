-- GROUP_POLICY
CREATE TABLE "main.sec".group_policy (
  group_id int not null,
  policy_id int not null,
  company_id int,
  created_at timestamp default current_timestamp,
  --
  primary key(group_id, policy_id),
  foreign key(group_id) references "main.sec".group(id) on delete set null,
  foreign key(policy_id) references "main.sec".policy(id) on delete set null
);

CREATE INDEX idx_group_policy on "main.sec".group_policy(group_id, policy_id);

INSERT
INTO "main.sec".group_policy(group_id, policy_id)
VALUES
('1', '1'),
('2', '2'),
('3','3'),
('3': '4');