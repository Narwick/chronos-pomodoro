import styles from './Heading.module.css';

type HeadingProps = {
    children?: React.ReactNode;
};

export function Heading({ children }: Readonly<HeadingProps>) {
    return (
        <header >
            {children}
        </header>
    );
}