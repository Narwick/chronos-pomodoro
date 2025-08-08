import type { TaskStateModel } from "./TaskStateModel";

export type TaskModel = {
  id: string;
  name: string;
  description: string;
  duration: number; // Duration in minutes
  startDate: number;
  completeDate: number | null; // Date when the task was completed 
  InterruptDate: number | null; // Date when the task was interrupted
  type: keyof TaskStateModel['config']; // 'workTime', 'shortBreakTime', 'longBreakTime'
}