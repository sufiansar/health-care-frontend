import { FieldDescription } from "@/components/ui/field";
import {
  getInpurtFieldError,
  IInputFieldError,
} from "@/lib/getInputFieldError";

type Props = {
  fieldName: string;
  state: IInputFieldError;
};

const InputFieldError = ({ fieldName, state }: Props) => {
  const error = getInpurtFieldError(fieldName, state);
  if (!error) return null;

  return (
    <FieldDescription className="text-red-600">
      {error}
    </FieldDescription>
  );
};

export default InputFieldError;
