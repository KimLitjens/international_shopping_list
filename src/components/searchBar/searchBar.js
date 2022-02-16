import styles from './seachBar.styles'

const SearchBar = ({ clearInputField, searchQuery, setSearchQuery }) => (
    <form className="justify-self-center" action="/" method="get">
        <label htmlFor="header-search">

        </label>
        <input
            onInput={e => setSearchQuery(e.target.value.toLowerCase())}
            type="text"
            id="header-search"
            placeholder="Search Shopping List"
            name="s"
        />
        <button className={styles.button} type="button" onClick={clearInputField}>Clear</button>
    </form>
);

export default SearchBar;