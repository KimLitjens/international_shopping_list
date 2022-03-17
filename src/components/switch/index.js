import { Switch } from '@headlessui/react'

export default function MyToggle({ isDarkMode, setIsDarkMode }) {

    return (
        <Switch
            checked={isDarkMode}
            onChange={setIsDarkMode}
            className={`bg-dark-first dark:bg-first
                 relative inline-flex items-center h-6 rounded-full w-11
                my-auto ml-2`}
        >
            <span className="sr-only">Darkmode Toggle</span>
            <span
                className={`${isDarkMode ? 'translate-x-6' : 'translate-x-1'
                    } inline-block w-4 h-4 transform bg-accent rounded-full`}
            />
        </Switch>
    )
}