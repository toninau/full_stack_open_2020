interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const hours: number[] = [3, 0, 2, 4.5, 0, 3, 1]

const calculateExercises = (dailyHours: number[], targetHour: number): Result => {
  const descriptions: string[] = ['room for improvement', 'not too bad but could be better', 'excellent']
  const average: number = dailyHours.reduce((a, b) => a + b) / dailyHours.length
  const trainingDays: number = dailyHours.filter(hour => hour !== 0).length
  const success: boolean = average >= targetHour ? true : false
  const rating: number = success ? 3 : average >= (targetHour * 0.85) ? 2 : 1
  const ratingDescription: string = descriptions[rating - 1]
  const result: Result = {
    periodLength: dailyHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHour,
    average
  }
  return result
}

console.log(calculateExercises(hours, 2))