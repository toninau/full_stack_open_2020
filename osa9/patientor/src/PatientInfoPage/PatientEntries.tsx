import React from "react";
import { Patient, Entry } from "../types";
import PatientDiagnosis from "./PatientDiagnosis";
import EntryDetails from "./EntryDetails";

import { Segment } from "semantic-ui-react";

const PatientEntries: React.FC<{ patient: Patient }> = ({ patient }) => {
  return (
    <div>
      {patient.entries.map((entry: Entry) => (
        <Segment key={entry.id}>
          <EntryDetails entry={entry} />
          <ul>
            {entry.diagnosisCodes?.map(code => (
              <PatientDiagnosis key={code} code={code} />
            ))}
          </ul>
        </Segment>
      ))}
    </div>
  );
};

export default PatientEntries;
