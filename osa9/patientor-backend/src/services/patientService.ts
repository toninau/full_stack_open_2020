import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import {
  Patient, PublicPatient, NewPatient, Entry, NewBaseEntry, NewHospitalEntry,
  NewHealthCheckEntry, NewOccupationalHealthCareEntry, HealthCheckEntry,
  HospitalEntry, OccupationalHealthCareEntry
} from '../types';

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

const parseBaseEntry = (entry: NewBaseEntry): void => {
  if (!entry.date) {
    throw new Error('Date missing');
  } else if (!entry.description) {
    throw new Error('Description missing');
  } else if (!entry.specialist) {
    throw new Error('Specialist missing');
  }
};

const parseHospitalEntry = (entry: NewHospitalEntry): HospitalEntry => {
  parseBaseEntry(entry);
  const newEntry = {
    id: uuid(),
    type: entry.type,
    description: entry.description,
    date: entry.date,
    specialist: entry.specialist,
    diagnosisCodes: entry.diagnosisCodes,
    discharge: entry.discharge
  };
  return newEntry;
};

const parseHealthCheckEntry = (entry: NewHealthCheckEntry): HealthCheckEntry => {
  parseBaseEntry(entry);
  if (entry.healthCheckRating === null || entry.healthCheckRating === undefined) {
    throw new Error('healthCheckRating missing');
  }
  const newEntry = {
    id: uuid(),
    type: entry.type,
    description: entry.description,
    date: entry.date,
    specialist: entry.specialist,
    diagnosisCodes: entry.diagnosisCodes,
    healthCheckRating: entry.healthCheckRating
  };
  return newEntry;
};

const parseOccupationalHealthCareEntry = (entry: NewOccupationalHealthCareEntry): OccupationalHealthCareEntry => {
  parseBaseEntry(entry);
  if (!entry.employerName) {
    throw new Error('EmployerName missing');
  }
  const newEntry = {
    id: uuid(),
    type: entry.type,
    description: entry.description,
    date: entry.date,
    specialist: entry.specialist,
    diagnosisCodes: entry.diagnosisCodes,
    employerName: entry.employerName,
    sickLeave: entry.sickLeave
  };
  return newEntry;
};

const addPatientEntry = (entry: Entry, id: string): Entry => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  const patient = patients.find(p => p.id === id);
  if (!patient) {
    throw new Error(
      `No matching id found: ${id}`
    );
  }
  let newEntry;
  switch (entry.type) {
    case 'HealthCheck':
      newEntry = parseHealthCheckEntry(entry);
      patient?.entries.push(newEntry);
      break;
    case 'Hospital':
      newEntry = parseHospitalEntry(entry);
      patient?.entries.push(newEntry);
      break;
    case 'OccupationalHealthcare':
      newEntry = parseOccupationalHealthCareEntry(entry);
      patient?.entries.push(newEntry);
      break;
    default:
      return assertNever(entry);
  }
  return newEntry;
};

export default {
  getEntries,
  addEntry,
  getNonSensitiveEntries,
  findById,
  addPatientEntry
};