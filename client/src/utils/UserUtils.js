export const generateRandomColorFromUsername = (username) => {
  if (!username) {
    return null;
  }

  let charCode = '#';

  for (const c of username) {
    charCode += String(c.charCodeAt(0));
  }

  return charCode.slice(0, 7);
};

export const generateShortName = (username) => {
  if (!username) {
    return '';
  }
  // Get uppercase letter
  const uppercaseLetters = username.match(/[A-Z]/g);

  if (uppercaseLetters) {
    return uppercaseLetters.join('').slice(0, 2);
  }

  // Filter non-letter characters
  const data = username.replace(/((?![a-z0-9]).)/g, '');

  if (!data[0]) {
    return '';
  }

  return data[0].toUpperCase();
};
