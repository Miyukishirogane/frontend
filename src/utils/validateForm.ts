type TValidateParam = { value: number; message?: string } | number;

export type TValidateCase = {
  min: (param: TValidateParam) => string | undefined;
  max: (param: TValidateParam) => string | undefined;
};

export type TOptionValidate = Partial<{
  min: TValidateParam;
  max: TValidateParam;
  validate: (value: string | number) => string | undefined;
}>;

export const validate = (inputValue: string | number, rule: TOptionValidate | undefined, name: string) => {
  const validateFunc = {
    min: params => {
      if (typeof params === 'number') {
        const errMessage = `${name} must greater than ${params}`;
        return Number(inputValue) < params ? errMessage : undefined;
      } else {
        const { value, message } = params;
        const errMessage = message || `${name} must greater than ${value}`;
        return Number(inputValue) < value ? errMessage : undefined;
      }
    },
    max: params => {
      if (typeof params === 'number') {
        const errMessage = `${name} must smaller than ${params}`;
        return Number(inputValue) > params ? errMessage : undefined;
      } else {
        const { value, message } = params;
        const errMessage = message || `${name} must smaller than ${value}`;
        return Number(inputValue) > value ? errMessage : undefined;
      }
    },
  } as TValidateCase;

  const result: (string | undefined)[] = [];

  for (const [key, validateItem] of Object.entries(rule || {})) {
    if (typeof validateItem === 'function') {
      result.push(validateItem(inputValue));
    } else {
      if (validateItem) {
        const status = validateFunc[key as keyof TValidateCase](validateItem);
        result.push(status);
      }
    }
  }

  const isError = result.every(item => Boolean(item));
  const error = result.filter(item => Boolean(item));

  return { isError: isError, error: error };
};
