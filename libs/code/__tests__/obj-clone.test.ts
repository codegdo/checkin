import objClone from '../src/utils/obj-clone.util';

describe('objClone', () => {
  it('should clone an object', () => {
    const obj = {
      name: 'John',
      age: 30,
      hobbies: ['reading', 'running'],
      address: {
        street: '123 Main St',
        city: 'Exampleville',
      },
    };

    const clonedObj = objClone(obj);

    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj); // Ensure the cloned object is a new instance

    // Modify the cloned object and verify the original object is not affected
    clonedObj.name = 'Jane';
    clonedObj.hobbies.push('painting');
    clonedObj.address.city = 'New Exampleville';

    expect(clonedObj).not.toEqual(obj);
    expect(obj.name).toBe('John');
    expect(obj.hobbies).toEqual(['reading', 'running']);
    expect(obj.address.city).toBe('Exampleville');
  });

  it('should return the same value for non-object inputs', () => {
    expect(objClone(null)).toBe(null);
    expect(objClone(undefined)).toBe(undefined);
    expect(objClone(42)).toBe(42);
    expect(objClone('hello')).toBe('hello');
    expect(objClone(true)).toBe(true);
  });

  test('should clone an object with nested arrays', () => {
    const originalObject = {
      id: 1,
      name: 'John',
      hobbies: ['Reading', 'Gardening'],
      friends: [
        { id: 2, name: 'Jane' },
        { id: 3, name: 'Bob' },
      ],
    };

    const clonedObject = objClone(originalObject);

    // Check if clonedObject is a different reference than originalObject
    expect(clonedObject).not.toBe(originalObject);

    // Check if the contents of clonedObject are equal to originalObject
    expect(clonedObject).toEqual(originalObject);
  });

  test('should clone an array of objects with nested properties', () => {
    const originalArray = [
      { id: 1, name: 'John', hobbies: ['Reading', 'Gardening'] },
      { id: 2, name: 'Jane', hobbies: ['Running', 'Painting'] },
    ];

    const clonedArray = objClone(originalArray);

    // Check if clonedArray is a different reference than originalArray
    expect(clonedArray).not.toBe(originalArray);

    // Check if the contents of clonedArray are equal to originalArray
    expect(clonedArray).toEqual(originalArray);
  });
});
