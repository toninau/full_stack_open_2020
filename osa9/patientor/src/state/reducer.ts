import { State } from "./state";
import { Patient, Diagnosis, HealthCheckEntry } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "SET_PATIENT_INFO";
    payload: Patient;
  }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }
  | {
    type: "ADD_HEALTH_CHECK_ENTRY";
    entry: HealthCheckEntry;
    id: string;
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_PATIENT_INFO":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis
        }
      };
    case "ADD_HEALTH_CHECK_ENTRY":
      const patient = state.patients[action.id];
      patient.entries.push(action.entry);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: patient
        }
      };
    default:
      return state;
  }
};


export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patients
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const setPatientInfo = (patient: Patient): Action => {
  return {
    type: 'SET_PATIENT_INFO',
    payload: patient
  };
};

export const setDiagnosisList = (diagnosis: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosis
  };
};

export const addHealthCheckEntry = (id: string, entry: HealthCheckEntry): Action => {
  return {
    type: "ADD_HEALTH_CHECK_ENTRY",
    entry,
    id
  };
};