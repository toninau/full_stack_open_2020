import React from 'react';
import { Patient, Entry } from '../types';
import PatientDiagnosis from "./PatientDiagnosis";

type EntriesProps = {
  patient: Patient;
};

const PatientEntries: React.FC<EntriesProps> = ({ patient }: EntriesProps) => {
  return (
    <div>
      {patient.entries.map((entry: Entry) => (
        <div key={entry.id}>
          <p>{entry.date} <i>{entry.description}</i></p>
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <PatientDiagnosis key={code} code={code} />
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default PatientEntries;
