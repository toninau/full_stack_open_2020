import React from "react";
import { useStateValue } from "../state";
import { Diagnosis } from "../types";


const PatientDiagnosis: React.FC<{code: string}> = ({ code }) => {
  const [{ diagnosis }] = useStateValue();
  const d: Diagnosis = diagnosis[code];

  return (
    <li>{d.code} {d.name}</li>
  );
};

export default PatientDiagnosis;