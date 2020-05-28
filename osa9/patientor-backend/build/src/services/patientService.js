"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const patients_1 = __importDefault(require("../../data/patients"));
const getEntries = () => {
    return patients_1.default;
};
const getNonSensitiveEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
};
const findById = (id) => {
    const entry = patients_1.default.find(p => p.id === id);
    return entry;
};
const addEntry = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
const parseBaseEntry = (entry) => {
    if (!entry.date) {
        throw new Error('Date missing');
    }
    else if (!entry.description) {
        throw new Error('Description missing');
    }
    else if (!entry.specialist) {
        throw new Error('Specialist missing');
    }
};
const parseHospitalEntry = (entry) => {
    parseBaseEntry(entry);
    const newEntry = {
        id: uuid_1.v1(),
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        discharge: entry.discharge
    };
    return newEntry;
};
const parseHealthCheckEntry = (entry) => {
    parseBaseEntry(entry);
    if (entry.healthCheckRating === null || entry.healthCheckRating === undefined) {
        throw new Error('healthCheckRating missing');
    }
    const newEntry = {
        id: uuid_1.v1(),
        type: entry.type,
        description: entry.description,
        date: entry.date,
        specialist: entry.specialist,
        diagnosisCodes: entry.diagnosisCodes,
        healthCheckRating: entry.healthCheckRating
    };
    return newEntry;
};
const parseOccupationalHealthCareEntry = (entry) => {
    parseBaseEntry(entry);
    if (!entry.employerName) {
        throw new Error('EmployerName missing');
    }
    const newEntry = {
        id: uuid_1.v1(),
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
const addPatientEntry = (entry, id) => {
    const assertNever = (value) => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };
    const patient = patients_1.default.find(p => p.id === id);
    if (!patient) {
        throw new Error(`No matching id found: ${id}`);
    }
    let newEntry;
    switch (entry.type) {
        case 'HealthCheck':
            newEntry = parseHealthCheckEntry(entry);
            patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
            break;
        case 'Hospital':
            newEntry = parseHospitalEntry(entry);
            patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
            break;
        case 'OccupationalHealthcare':
            newEntry = parseOccupationalHealthCareEntry(entry);
            patient === null || patient === void 0 ? void 0 : patient.entries.push(newEntry);
            break;
        default:
            return assertNever(entry);
    }
    return newEntry;
};
exports.default = {
    getEntries,
    addEntry,
    getNonSensitiveEntries,
    findById,
    addPatientEntry
};
