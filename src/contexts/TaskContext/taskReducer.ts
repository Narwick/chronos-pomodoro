import type { TaskModel } from '../../models/TaskModel';
import type { TaskStateModel } from '../../models/TaskStateModel';
import { formatSecondsToMinutes } from '../../utils/formatSecondsToMinutes';
import { getNextCycle } from '../../utils/getNextCycle';
import { initialTaskState } from './initialTaskState';
import { TaskActionTypes, type TaskActionModel } from './taskActions';

export function taskReducer(
  state: TaskStateModel,
  action: TaskActionModel,
): TaskStateModel {
  switch (action.type) {
    case TaskActionTypes.START_TASK: {
      const newTask = action.payload;
      const nextCycle = getNextCycle(state.currentCycle);
      const secondsRemaining = newTask ? newTask.duration * 60 : 0;

      return {
        ...state,
        activeTask: newTask || null,
        currentCycle: nextCycle,
        secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
        tasks: newTask ? [...state.tasks, newTask] : state.tasks,
      };
    }
    case TaskActionTypes.INTERRUPT_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task: TaskModel) => {
          if (task.id === state.activeTask?.id) {
            return {
              ...task,
              interruptDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.COMPLETE_TASK: {
      return {
        ...state,
        activeTask: null,
        secondsRemaining: 0,
        formattedSecondsRemaining: '00:00',
        tasks: state.tasks.map((task: TaskModel) => {
          if (task.id === state.activeTask?.id) {
            return {
              ...task,
              completeDate: Date.now(),
            };
          }
          return task;
        }),
      };
    }
    case TaskActionTypes.RESET_STATE:
      return {
        ...initialTaskState,
      };
    case TaskActionTypes.COUNT_DOWN:
      return {
        ...state,
        secondsRemaining: action.payload?.secondsRemaining,
        formattedSecondsRemaining: formatSecondsToMinutes(
          action.payload?.secondsRemaining,
        ),
      };
    case TaskActionTypes.CHANGE_SETTINGS:
      return {
        ...state,
        config: {
          workTime: action.payload?.workTime ?? state.config.workTime,
          shortBreakTime: action.payload?.shortBreakTime ?? state.config.shortBreakTime,
          longBreakTime: action.payload?.longBreakTime ?? state.config.longBreakTime,
        },
      };
    default:
      return state;
  }
}
