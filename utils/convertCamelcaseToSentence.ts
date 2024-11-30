export const convertCamelcaseToSentence = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add spaces before uppercase letters
    .toLowerCase() // Convert the entire string to lowercase
    .replace(/^./, (char) => char.toUpperCase()); // Capitalize the first letter
};
