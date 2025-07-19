const generateCustomPassword = () => {
  const digits = Array.from({ length: 4 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  return digits + letters;
};

module.exports = { generateCustomPassword };
