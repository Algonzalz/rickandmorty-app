

export const hasOnlyLetters = (value: React.KeyboardEvent<HTMLInputElement>) => !/[a-zA-Z ]/.test(value.key) ? value.preventDefault() : null;
export const hasOnlyLettersAndDot = (value: React.KeyboardEvent<HTMLInputElement>) => !/[a-zA-ZñÑáÁéÉÍíóÓúÚ. ]/.test(value.key) ? value.preventDefault() : null;

export const hasMinLengthMessage = "Longitud mínima requerida";
export const hasRequired = "Campo requerido";
export const hasMaxLengthMessage = "Longitud máxima requerida";
