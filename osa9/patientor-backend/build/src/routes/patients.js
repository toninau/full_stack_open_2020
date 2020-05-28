"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getNonSensitiveEntries());
});
router.get('/:id', (req, res) => {
    const patient = patientService_1.default.findById(req.params.id);
    if (patient) {
        res.send(patient);
    }
    else {
        res.status(404).end();
    }
});
router.post('/:id/entries', (req, res) => {
    try {
        const newEntry = patientService_1.default.addPatientEntry(req.body, req.params.id);
        res.json(newEntry);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
        else {
            res.status(400).end();
        }
    }
});
router.post('/', (req, res) => {
    try {
        const newPatient = utils_1.default(req.body);
        const addedPatient = patientService_1.default.addEntry(newPatient);
        res.json(addedPatient);
    }
    catch (e) {
        if (e instanceof Error) {
            res.status(400).send(e.message);
        }
        else {
            res.status(400).end();
        }
    }
});
exports.default = router;
