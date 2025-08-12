import { SaveIcon } from 'lucide-react';
import { Container } from '../../components/Container';
import { DefaultButton } from '../../components/DefaultButton';
import { DefaultInput } from '../../components/DefaultInput';
import { Heading } from '../../components/Heading';
import { MainTemplate } from '../../templates/MainTemplate';
import { useEffect, useRef } from 'react';
import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { toastifyAdapter } from '../../adapters/toastifyAdapter';
import { TaskActionTypes } from '../../contexts/TaskContext/taskActions';

export function Settings() {
  const { state, dispatch } = useTaskContext();
  const workTimeInputRef = useRef<HTMLInputElement>(null);
  const shortBreakTimeInputRef = useRef<HTMLInputElement>(null);
  const longBreakTimeInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.title = 'Configurações - Chronos Pomodoro';
  }, []);
  function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    toastifyAdapter.dismiss();
    const formErrors = [];

    const workTime = Number(workTimeInputRef.current?.value);
    const shortBreakTime = Number(shortBreakTimeInputRef.current?.value);
    const longBreakTime = Number(longBreakTimeInputRef.current?.value);

    if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
      formErrors.push('Digite apenas números para todos os campos.');
    }

    if (
      workTime < 1 ||
      workTime > 99 ||
      shortBreakTime < 1 ||
      shortBreakTime > 99 ||
      longBreakTime < 1 ||
      longBreakTime > 99
    ) {
      formErrors.push(
        'Digite apenas números entre 1 e 99 para todos os campos.',
      );
    }

    if (formErrors.length > 0) {
      formErrors.forEach(e => {
        toastifyAdapter.error(e);
      });
      return;
    }

    dispatch({
      type: TaskActionTypes.CHANGE_SETTINGS,
      payload: {
        workTime,
        shortBreakTime,
        longBreakTime,
      },
    });
    toastifyAdapter.success('Configurações salvas.');
  }

  return (
    <MainTemplate>
      <Container>
        <Heading>Configurações</Heading>
      </Container>
      <Container>
        <p style={{ textAlign: 'center' }}>
          Modifique as configurações para tempo de foco, descanso curto e
          descanso longo.
        </p>
      </Container>
      <Container>
        <form action='' className='form' onSubmit={handleSaveSettings}>
          <div className='formRow'>
            <DefaultInput
              id='workTime'
              labelText='Foco'
              ref={workTimeInputRef}
              defaultValue={state.config.workTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='shortBreakTime'
              labelText='Descanso Curto'
              ref={shortBreakTimeInputRef}
              defaultValue={state.config.shortBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultInput
              id='longBreakTime'
              labelText='Descanso Longo'
              ref={longBreakTimeInputRef}
              defaultValue={state.config.longBreakTime}
              type='number'
            />
          </div>
          <div className='formRow'>
            <DefaultButton
              icon={<SaveIcon />}
              aria-label='Salvar configurações'
              title='Salvar configurações'
            />
          </div>
        </form>
      </Container>
    </MainTemplate>
  );
}
