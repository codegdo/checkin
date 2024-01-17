type MapKey<T> = (obj: T) => { key: string; value: string };

export function mapKeyAndValue<T>(inputArray: T[][], callback: MapKey<T>): Record<string, string>[] {
  // Initialize an empty result array
  const resultArray: Record<string, string>[] = [];

  for (const innerArray of inputArray) {
    // Initialize an empty object to store key-value pairs
    const reducedObject: Record<string, string> = {};

    for (const obj of innerArray) {
      // Use the callback function to map key and value
      const { key, value } = callback(obj);

      reducedObject[key] = value;
    }

    resultArray.push(reducedObject);
  }

  return resultArray;
}

/*
// Example usage:
interface ExampleObject {
  id: number;
  name: string;
  title: string;
  type: string;
  data: any;
  value: any;
  parentId: number | null;
  position: number;
  required: boolean;
}

// Example callback function to map key and value
const callback: MapKey<ExampleObject> = (obj) => {
  return {
    key: obj.name,
    value: obj.value,
  };
};

// Example usage:
const inputArray: ExampleObject[][] = [
  [
    {
      id: 1,
      name: 'roleId',
      title: 'Role Id',
      type: 'text',
      data: null,
      value: '123',
      parentId: null,
      position: 0,
      required: true,
    },
    {
      id: 1,
      name: 'roleName',
      title: 'Role Name',
      type: 'text',
      data: null,
      value: 'Admin',
      parentId: null,
      position: 0,
      required: true,
    },
  ],
];

// Pass the callback function to map key and value
const outputArray = mapKeyAndValue(inputArray, callback);
console.log(outputArray);
*/
