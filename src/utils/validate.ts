export const validateLogin = (name: string) => {
  const error: string[] = [];
  if (name.length <= 2)
    error.push("O campo de nome deve conter no minimo 3 caracteres.");

  return error;
};

const emailValid = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

export const validateProfileEdit = (
  name: string,
  email: string,
  description: string
) => {
  const errors: string[] = [];

  if (!emailValid(email))
    errors.push("Email não encontrado! Verifique se está correto.");
  if (name.length < 1) errors.push("Por favor insira um nome!");
  if (description.length < 1) errors.push("Por favor insera uma descrição!");

  return errors;
};

export const validateSearch = (artist: string) => {
  return artist.length <= 2;
};
