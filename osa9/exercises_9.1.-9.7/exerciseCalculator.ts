interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseValues {
  target: number;
  hours: number[];
}

const argumentParser = (args: Array<string>): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  const hours = args.slice(3).map(hour => Number(hour));
  if (!isNaN(Number(args[2])) && !hours.some(isNaN)) {
    return {
      target: Number(args[2]),
      hours
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (dailyHours: number[], targetHour: number): Result => {
  const descriptions: string[] = ['room for improvement', 'not too bad but could be better', 'excellent'];
  const average: number = dailyHours.reduce((a, b) => a + b) / dailyHours.length;
  const trainingDays: number = dailyHours.filter(hour => hour !== 0).length;
  const success: boolean = average >= targetHour ? true : false;
  const rating: number = success ? 3 : average >= (targetHour * 0.85) ? 2 : 1;
  const ratingDescription: string = descriptions[rating - 1];
  const result: Result = {
    periodLength: dailyHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHour,
    average
  };
  return result;
};

try {
  const { hours, target } = argumentParser(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  if (e instanceof Error) {
    console.log('Error, something bad happened, message: ', e.message);
  }
}