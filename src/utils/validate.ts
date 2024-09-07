export const validateLogin = (name: string) => {
  const error: string[] = [];
  if (name.length <= 2)
    error.push("O campo de nome deve conter no minimo 3 caracteres.");

  return error;
};
