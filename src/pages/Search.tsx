import { useSearch } from '../context/SearchContext';
import { LoadingSpinner } from '../components/Loading';
import { Error } from '../components/Error';
import { imgUrl } from '../libs/Async';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';

export function SearchPage() {
    const val = useSearch()
    if (val?.loading) {
        return <LoadingSpinner />
    }
    if (val?.err.isError) {
        return <Error message={val.err.error} />
    }
    const data = val?.data
    console.log(data);

    return (
        <>
            <div>
                <SearchBar />
            </div>
            <div className='search'>
                <section className='top-result'>
                    <h3>Top Results</h3>
                    <article>
                        {data?.map((item) => {
                            return (
                                <div key={item.id}>
                                    <img src={`${imgUrl}${item.backdrop_path}`} alt={item.original_title} />
                                    <p>
                                        <Link to={`/details/${item.id}`} style={{
                                            color:`white`,
                                            textDecoration:`none`
                                        }}>
                                            {item.original_title}
                                            <br />
                                            {item.media_type} {item.release_date}
                                        </Link>
                                    </p>
                                </div>
                            )
                        })}
                    </article>
                </section>
            </div>
        </>
    );
}
