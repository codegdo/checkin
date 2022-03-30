import { hashPassword } from "./hash-and-validate.util";

export const encryptKeyValue = async (key: string | number, json: string): Promise<string> => {
  const data = JSON.parse(json);

  let item = data.find((i) => {
    return (i.key == key);
  });

  item.value = await hashPassword(item.value);

  return JSON.stringify(data);
}

/* 
  input: (key, value)
  ('a', '[{a: value}]')
  
  output:
  '[{a: hashedvalue}]'
*/