import { FieldDescription } from "@/components/ui/field";
import { getInputFieldError, IInputErrorState } from "@/lib/getInputFieldError";

interface InputFieldErrorProps {
  fieldName: string;
  state: IInputErrorState;
}

const InputFieldError = ({ fieldName, state }: InputFieldErrorProps) => {
  if (getInputFieldError(fieldName, state)) {
    return (
      <FieldDescription className="text-red-600">
        {getInputFieldError(fieldName, state)}
      </FieldDescription>
    );
  }

  return null;
};

export default InputFieldError;
