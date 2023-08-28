import { useSearch } from '../context/SearchContext';
export function SearchBar() {
    const val = useSearch()

    return (
        <form onSubmit={val?.handleSearch} style={{
            display: `flex`,
            justifyContent: `space-between`
        }}>
            <input
                type="search"
                placeholder='Search for your favourite movies'
                value={val?.query}
                onChange={val?.handleQuery}
            />
            {/*<input type="button" value="search" style={{
                borderRadius: `50%`,
                backgroundColor: ` #f14510`,
                border: `none`,
                color: `white`
            }} onClick={val?.handleSearch} />*/}
        </form>
    );
}
