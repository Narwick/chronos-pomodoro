import styles from './styles.module.css';

type DefaultInputProps = {
  labelText?: string;
  id?: string;
  placeholder?: string;
} & React.ComponentProps<'input'>;

export function DefaultInput({ type, id, labelText, ...rest }: DefaultInputProps) {
  return (
    <>
      {labelText && <label htmlFor={id}>{labelText}</label> }

      <input className={styles.input} type={type} id={id} {...rest}/>
    </>
  );
}
