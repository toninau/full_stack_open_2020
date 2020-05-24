import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';

const getEntries = (): Array<Patient> => {
  return patients;
};

const getNonSensitiveEntries = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const findById = (id: string): PublicPatient | undefined => {
  const entry = patients.find(p => p.id === id);
  return entry;
};

const addEntry = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById
};