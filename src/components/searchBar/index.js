import styles from './seachBar.styles'

const SearchBar = ({ searchQuery, setSearchQuery }) => (
    <form className="justify-self-center" action="/" method="get">
        <label htmlFor="header-search">
            <span className={styles.span}>Search blog posts</span>
        </label>
        <input
            value={searchQuery}
            onInput={e => setSearchQuery(e.target.value)}
            type="text"
            id="header-search"
            placeholder="Search blog posts"
            name="s"
        />
        <button className={styles.button} type="submit">Search</button>
    </form>
);

export default SearchBar;