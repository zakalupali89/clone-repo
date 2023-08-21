import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Controller } from 'react-hook-form';
import { ITextParams } from '../pages/interfaces/ITextParams';

export default function InputDate({ control }: ITextParams) {
  function minYear(date: Date, age: number) {
    const copyDate = new Date(date);
    copyDate.setFullYear(date.getFullYear() - age);
    return copyDate;
  }
  const minBirthdate = minYear(new Date(), 13);

  const validateDate = {
    required: 'Birth Date is required',
    validate: (value: any) => {
      const dob = new Date(value);
      return dob >= minBirthdate || 'You must be at least 13 years old';
    },
  };
  // const error = get(errors, name);
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 13);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name="dateOfBirth"
        control={control}
        rules={{
          required: true,
          validate: {
            min: (date) => (date as Date) <= minBirthdate || 'Please, enter a valid date',
          },
        }}
        render={({ field: { ref, onBlur, name, onChange, ...field }, fieldState }) => (
          <DatePicker
            value={value}
            onChange={onChange}
            label="Date of Birth"
            className="dark:bg-white"
            maxDate={maxDate}
            // error={fieldState.invalid} // Set error state based on field validation
            // helperText={fieldState.error?.message || ''}
          />
        )}
      />
    </LocalizationProvider>
  );
}
