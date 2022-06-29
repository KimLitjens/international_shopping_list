import { Switch } from '@headlessui/react'
import styles from './switch.styles'

export default function MyToggle({ isDarkMode, setIsDarkMode }) {

    return (
        <Switch
            checked={isDarkMode}
            onChange={setIsDarkMode}
            className={styles.switch}
        >
            <span className="sr-only">Darkmode Toggle</span>
            <span
                className={styles.span({ isDarkMode })}
            />
        </Switch>
    )
}