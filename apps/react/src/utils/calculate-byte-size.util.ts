const calculateByteSize = (str: string) => {
  return encodeURIComponent(str).replace(/%[A-F\d]{2}/g, 'U').length;
}

const calculateKilobytes = (str: string) => {
  const bytes = calculateByteSize(str);
  return bytes / 1024;
}

const calculateMegabytes = (str: string) => {
  const kilobytes = calculateKilobytes(str);
  return kilobytes / 1024;
}

export { calculateByteSize, calculateKilobytes, calculateMegabytes };