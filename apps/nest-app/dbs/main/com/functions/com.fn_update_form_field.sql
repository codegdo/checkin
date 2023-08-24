CREATE OR REPLACE FUNCTION main_com.fn_update_form_fields(
  input_form_id INT, 
  input_fields jsonb[]
)
RETURNS VOID AS $$
BEGIN
  FOR i IN 1..array_length(input_fields, 1) LOOP
    -- Extract properties from the JSON object
    DECLARE
      var_form_id INT := (input_fields[i]->>'form_id')::INT;
      var_field_id INT := (input_fields[i]->>'field_id')::INT;
      var_label VARCHAR := input_fields[i]->>'label';
      var_description VARCHAR := input_fields[i]->>'description';
      var_hint VARCHAR := input_fields[i]->>'hint';
      var_placeholder VARCHAR := input_fields[i]->>'placeholder';
      var_default_value VARCHAR := input_fields[i]->>'default_value';
      var_min INT := (input_fields[i]->>'min')::INT;
      var_max INT := (input_fields[i]->>'max')::INT;
      var_pattern VARCHAR := input_fields[i]->>'pattern';
      var_accessibility jsonb := input_fields[i]->>'accessibility';
      var_validation jsonb := input_fields[i]->>'validation';
      var_translation jsonb := input_fields[i]->>'translation';
      var_position INT := (input_fields[i]->>'position')::INT;
      var_map_to_parent VARCHAR := (input_fields[i]->>'map_to_parent');
    BEGIN
      -- Check if the field already exists for the form
      IF EXISTS (SELECT 1 FROM form_field WHERE form_id = var_form_id AND field_id = var_field_id) THEN
        -- Update all properties for the existing field
        UPDATE form_field
        SET 
          label = var_label,
          description = var_description,
          hint = var_hint,
          placeholder = var_placeholder,
          default_value = var_default_value,
          min = var_min,
          max = var_max,
          pattern = var_pattern,
          accessibility = var_accessibility,
          validation = var_validation,
          translation = var_translation,
          position = var_position,
          map_to_parent = var_map_to_parent
        WHERE form_id = var_form_id AND field_id = var_field_id;
      ELSE
        -- Insert a new field with all properties if it doesn't exist
        INSERT INTO form_field (form_id, field_id, label, description, hint, placeholder, default_value, min, max, pattern, accessibility, validation, translation, position, map_to_parent)
        VALUES (
          var_form_id, var_field_id, var_label, var_description, var_hint, var_placeholder, var_default_value,
          var_min, var_max, var_pattern, var_accessibility, var_validation, var_translation, var_position, var_map_to_parent
        );
      END IF;
    END;
  END LOOP;

  -- Remove fields that are no longer part of the form
  DELETE FROM form_field
  WHERE form_id = input_form_id
    AND (form_id, field_id) NOT IN (
      SELECT
        (input_fields[i]->>'form_id')::INT,
        (input_fields[i]->>'field_id')::INT
      FROM
        generate_series(1, array_length(input_fields, 1)) AS i
    );
END;
$$ LANGUAGE plpgsql;
