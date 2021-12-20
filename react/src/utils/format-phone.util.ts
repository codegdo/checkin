export const formatPhone = (value: string): string => {
  const len = value.length;

  if (len == 0) {
    return '';
  } else if (len > 0 && len <= 3) {
    return `${value}`;
  } else if (len > 3 && len <= 6) {
    return `${value.substring(0, 3)}-${value.substring(3, 6)}`;
  } else if (len > 6) {
    return `(${value.substring(0, 3)})${value.substring(3, 6)}-${value.substring(
      6,
      10
    )}`;
  } else {
    return value;
  }
};

/*
{
  input:
  '8583571474'

  output:
  '858-357-1474'
}
*/
