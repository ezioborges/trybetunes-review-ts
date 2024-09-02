export const loginInputValidation = (name: string) => {
    if (name.length <= 3) return 'O campo de nome deve possuir no mínimo 3 caracteres.';
}