export type Habit = {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
  lastCompleted: string | null;
};