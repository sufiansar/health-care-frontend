export interface IInputFieldError {
  success: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}

const getInpurtFieldError = (fieldName: string, state: IInputFieldError) => {
  if (state && state.errors) {
    const fieldError = state.errors.find((error) => error.field === fieldName);
    return fieldError ? fieldError.message : null;
  } else return null;
};

export { getInpurtFieldError };
