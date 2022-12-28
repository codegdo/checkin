alter table sec.user
add constraint fk_user_group
foreign key (group_id)
references sec.group (id);