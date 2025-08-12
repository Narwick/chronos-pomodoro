import { DefaultInput } from '../DefaultInput';
import { Cycles } from '../Cycles';
import { DefaultButton } from '../DefaultButton';
import { PlayCircleIcon, StopCircleIcon } from 'lucide-react';
import { useRef } from 'react';
import type { TaskModel } from '../../models/TaskModel';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';
import { Tips } from '../Tips';
import { toastifyAdapter } from '../../adapters/toastifyAdapter';

export function MainForm() {
  const { state, dispatch } = useTaskContext();
  const taskNameInput = useRef<HTMLInputElement>(null);
  const lastTaskName = state.tasks[state.tasks.length - 1]?.name ?? ''
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);

  function handleCreateNewTask(event: React.FormEvent) {
    event.preventDefault();

    if (!taskNameInput.current) return;

    const taskName = taskNameInput.current.value.trim();
    if (taskName.length === 0) {
      toastifyAdapter.warn('Por favor, digite o nome da tarefa.');
      return;
    }

    const newTask: TaskModel = {
      id: Date.now().toString(),
      name: taskName,
      startDate: Date.now(),
      completeDate: null,
      interruptDate: null,
      duration: state.config[nextCycleType],
      type: nextCycleType,
    };


    dispatch({ type: TaskActionTypes.START_TASK, payload: newTask });
    toastifyAdapter.success('Tarefa Iniciada!')
  }  

  function handleStopCurrentTask() {
    toastifyAdapter.error('Tarefa Interrompida!')
    dispatch({ type: TaskActionTypes.INTERRUPT_TASK });
  }

  return (
    <form onSubmit={handleCreateNewTask} action='' className='form'>
      <div className='formRow'>
        <DefaultInput
          labelText='Task'
          type='text'
          id='input'
          placeholder='Digite algo'
          disabled={!!state.activeTask}
          ref={taskNameInput}
          defaultValue={lastTaskName}
        />
      </div>

      <div className='formRow'>
        <Tips/>
      </div>

      {state.currentCycle > 0 && (
        <div className='formRow'>
          <Cycles labelText='Ciclos' />
        </div>
      )}
      <div className='formRow'>
        {!state.activeTask && (
          <DefaultButton
            aria-label='Iniciar nova tarefa'
            title='Iniciar nova tarefa'
            type='submit'
            icon={<PlayCircleIcon />}
            key='botton_submit'
          />
        )}
        {!!state.activeTask && (
          <DefaultButton
            aria-label='Interromper tarefa atual'
            title='Interromper tarefa atual'
            type='button'
            color='red'
            icon={<StopCircleIcon />}
            onClick={handleStopCurrentTask}
            key='botton'
          />
        )}
      </div>
    </form>
  );
}
