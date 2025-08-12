import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();

  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  const tipsForWhenActiveTask = {
    workTime: <span>Foque na sua tarefa e evite distrações.</span>,
    shortBreakTime: <span>Aproveite para descansar um pouco.</span>,
    longBreakTime: <span>Hora de relaxar e recarregar as energias.</span>,
  };
  const tipsForWhenNoActiveTask = {
    workTime: <span>Prepare-se para sua próxima tarefa .</span>,
    shortBreakTime: <span>Vamos dar uma pausa.</span>,
    longBreakTime: <span>Descanse um pouco mais.</span>,
  };

  return (
    <>
      {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
      {!state.activeTask && tipsForWhenNoActiveTask[nextCycleType]}
    </>
  );
}
