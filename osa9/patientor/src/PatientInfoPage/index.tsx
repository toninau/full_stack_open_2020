import React from "react";
import axios from "axios";
import { Container, Icon, Button } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import { Patient, Gender, HealthCheckEntry } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientInfo, addHealthCheckEntry } from "../state";

import PatientEntries from "./PatientEntries";

import { EntryFormValues } from "../AddEntryModal/AddEntryForm";
import AddEntryModal from "../AddEntryModal";

const PatientListPage: React.FC = () => {
  const [{ patients }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = React.useState<Patient | null>(null);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<HealthCheckEntry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addHealthCheckEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

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
        return <Icon name='mars' />;
      case Gender.Female:
        return <Icon name='venus' />;
      case Gender.Other:
        return <Icon name='genderless' />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      {patient &&
        <Container>
          <h2>{patient.name}{getIcon(patient.gender)}</h2>
          <p>
            ssn: {patient.ssn}<br />
            occupation: {patient.occupation}
          </p>
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
          <h3>entries</h3>
          <PatientEntries patient={patient} />
        </Container>
      }
    </div>
  );
};

export default PatientListPage;