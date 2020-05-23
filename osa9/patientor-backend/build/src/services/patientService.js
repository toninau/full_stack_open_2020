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
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};
const addEntry = (patient) => {
    const newPatient = Object.assign({ id: uuid_1.v1() }, patient);
    patients_1.default.push(newPatient);
    return newPatient;
};
exports.default = {
    getEntries,
    addEntry,
    getNonSensitiveEntries
};
