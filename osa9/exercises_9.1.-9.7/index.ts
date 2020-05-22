interface Body {
  daily_exercises: number[];
  target: number;
}

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from "./exerciseCalculator";
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(height) && !isNaN(weight)) {
    const result = {
      weight,
      height,
      bmi: calculateBmi(height, weight)
    };
    res.status(200).json(result);
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: Body = req.body;
  if (!isNaN(target) && !daily_exercises.some(isNaN)) {
    res.status(200).json(calculateExercises(daily_exercises, target));
  } else if (!daily_exercises || !target) {
    res.status(400).json({ error: 'parameters missing' });
  } else {
    res.status(400).json({ error: 'malformatted parameters' });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});