import * as yup from 'yup';

export const CreateNewInventoryItemValidator = yup.object().shape({
  unitsAvailable: yup
    .number()
    .required('Units available is mandatory')
    .nullable('Available units cannot be empty'),
  name: yup.string().required('Item name is mandatory').nullable()
});
