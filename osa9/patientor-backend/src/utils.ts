/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient } from './types';

const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    ...object
  };
  return newPatient;
};

export default toNewPatient;