import React from 'react';
import { useStateValue } from "../state";
import { Diagnosis } from '../types';

type DiagnosisProps = {
  code: string;
};

const PatientDiagnosis: React.FC<DiagnosisProps> = ({ code }: DiagnosisProps) => {
  const [{ diagnosis }] = useStateValue();
  const d: Diagnosis = diagnosis[code];

  return (
    <li>{d.code} {d.name}</li>
  );
};

export default PatientDiagnosis;