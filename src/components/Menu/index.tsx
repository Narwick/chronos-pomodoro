import { HistoryIcon, HouseIcon, MoonIcon, SettingsIcon, SunIcon } from 'lucide-react';
import styles from './styles.module.css';
import { useState, useEffect } from 'react';
import { RouterLink } from '../RouterLink';

type AvailableThemes = 'dark' | 'light';

export function Menu() {
  const [theme, setTheme] = useState<AvailableThemes>(()=> {
    const savedTheme = localStorage.getItem('theme') as AvailableThemes;
    return savedTheme || 'dark';
  });

  const nextThemeIcon = {
    dark: <SunIcon />,
    light: <MoonIcon />,
  }
  function handleThemeChange(
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) {
    event.preventDefault();
    setTheme(prevTheme => {
      const nextTheme = prevTheme === 'dark' ? 'light' : 'dark';
      return nextTheme;
    });
  }
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  return (
    <nav className={styles.menu}>
      <RouterLink href='/' className={styles.menuLink} aria-label='Home' title='Home'>
        <HouseIcon />
      </RouterLink>
      <RouterLink
        href='/history'
        className={styles.menuLink}
        aria-label='Histórico'
        title='Histórico'
      >
        <HistoryIcon />
      </RouterLink>
      <RouterLink
        href='/settings'
        className={styles.menuLink}
        aria-label='Configurações'
        title='Configurações'
      >
        <SettingsIcon />
      </RouterLink>
      <RouterLink
        href='#'
        className={styles.menuLink}
        aria-label='Tema'
        title='Tema'
        onClick={handleThemeChange}
      >
        {nextThemeIcon[theme]}
      </RouterLink>
    </nav>
  );
}
