BEGIN;

-- Delete associations that exist in form_field but are not in the updated list
DELETE FROM form_field
WHERE form_id = 1 AND field_id NOT IN (new_field_id_1, new_field_id_2, ...);

-- Update associations that exist and are modified in the updated list
UPDATE form_field AS ff
SET title = new_title, 
    position = new_position, 
    isRequired = new_isRequired
FROM (
    VALUES 
        (1, new_field_id_1, 'New Title 1', 1, true),
        (1, new_field_id_2, 'New Title 2', 2, false),
        -- Add other new field IDs with updated values here for form_id = 1
) AS new_fields(form_id, field_id, new_title, new_position, new_isRequired)
WHERE ff.form_id = new_fields.form_id 
AND ff.field_id = new_fields.field_id
AND (ff.title <> new_fields.new_title OR
     ff.position <> new_fields.new_position OR
     ff.isRequired <> new_fields.new_isRequired);

-- Insert associations that are in the updated list but not in form_field
INSERT INTO form_field (form_id, field_id, title, position, isRequired)
SELECT 1 AS form_id, field_id, 'New Title', 1, true
FROM (
    VALUES 
        (new_field_id_1),
        (new_field_id_2),
        -- Add other new field IDs here for form_id = 1
) AS new_fields(field_id)
WHERE field_id NOT IN (SELECT field_id FROM form_field WHERE form_id = 1);

COMMIT;
