import React from "react";
import axios from "axios";
import { Container, Icon } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientInfo } from "../state";

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | null>(null);

  React.useEffect(() => {
    setPatient(patients[id]);
  }, [setPatient, patients, id]);

  React.useEffect(() => {
    const getPatientInfo = async () => {
      try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientInfo(patientInfoFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (patient && !patient.ssn) {
      getPatientInfo();
    }
  }, [dispatch, patient, id]);

  const getIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Icon name={'mars'} />;
      case Gender.Female:
        return <Icon name={'venus'} />;
      case Gender.Other:
        return <Icon name={'genderless'} />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {patient &&
        <Container>
          <h2>{patient.name}{getIcon(patient.gender)}</h2>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </Container>
      }
    </div>
  );
};

export default PatientListPage;