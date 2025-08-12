import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';
import styles from './styles.module.css';

type CyclesProps = {
  labelText?: string;
  id?: string;
  placeholder?: string;
} & React.ComponentProps<'input'>;

export function Cycles({ labelText }: CyclesProps) {
  const { state } = useTaskContext();

  const cycleStep = Array.from({ length: state.currentCycle }, (_, i) => i + 1);
  const cycleDescriptionMap = {
    workTime: 'Foco',
    shortBreakTime: 'Descanso curto',
    longBreakTime: 'Descanso longo',
  };
  return (
    <div className={styles.cycles}>
      <span className={styles.label}>{labelText}</span>
      <div className={styles.cycleDots}>
        {cycleStep.map((_, index) => {
          const nextCycle = getNextCycle(index);
          const nextCycleType = getNextCycleType(nextCycle);
          return (
            <span
              key={`${nextCycleType}_${nextCycle}`}
              aria-label={`${cycleDescriptionMap[nextCycleType]}`}
              title={`${cycleDescriptionMap[nextCycleType]}`}
              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
            ></span>
          );
        })}
      </div>
    </div>
  );
}
