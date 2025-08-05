import styles from './styles.module.css';

type CyclesProps = {
  labelText?: string;
  id?: string;
  placeholder?: string;
} & React.ComponentProps<'input'>;

export function Cycles({ labelText, ...rest }: CyclesProps) {
  return (
    <div className={styles.cycles}>
      <span className={styles.label}>
        {labelText}
      </span>
      <div className={styles.cycleDots}>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.shortBreakTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.workTime}`}></span>
        <span className={`${styles.cycleDot} ${styles.longBreakTime}`}></span>
      </div>
    </div>
  );
}
