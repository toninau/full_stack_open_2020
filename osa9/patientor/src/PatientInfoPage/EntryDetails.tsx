import React from "react";
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthCareEntry } from "../types";
import { Icon } from "semantic-ui-react";

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <Icon name='doctor' /></h3>
      <p><em>{entry.description}</em></p>
      <p>rating: {entry.healthCheckRating}</p>
    </div>
  );
};

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <Icon name='hospital' /></h3>
      <p><em>{entry.description}</em></p>
    </div>
  );
};

const Occupational: React.FC<{ entry: OccupationalHealthCareEntry }> = ({ entry }) => {
  return (
    <div>
      <h3>{entry.date} <Icon name='stethoscope' /> {entry.employerName}</h3>
      <p><em>{entry.description}</em></p>
    </div>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    case "Hospital":
      return <Hospital entry={entry} />;
    case "OccupationalHealthcare":
      return <Occupational entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
