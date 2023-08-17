import { useSearch } from '../context/SearchContext';
import { LoadingSpinner } from '../components/Loading';
import { Error } from '../components/Error';
import { imgUrl } from '../libs/Async';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/SearchBar';
import notFound from '../assets/not-found.png';
import { genres } from '../libs/genres';

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
            {data?.length === 0 ? (
                <div className="genres-css">
                    {genres.map((item) => {
                        return (
                            <section key={item.id}>
                                <Link to={`/genres/${item.id}`}>
                                    <img src={item.img} alt={item.name} />
                                    <p>
                                        {item.name}
                                    </p>
                                </Link>
                            </section>
                        )
                    })}
                </div>
            ) : (
                <div className='search'>
                    <section className='top-result'>
                        <h3>Top Results</h3>
                        <article>
                            {data?.map((item) => {
                                return (
                                    <div key={item.id}>
                                        <img loading='lazy' src={item.backdrop_path !== null ? `${imgUrl}${item.backdrop_path}` : notFound} alt={item.original_title} />
                                        <p>
                                            <Link to={`/details/${item.id}`} style={{
                                                color: `white`,
                                                textDecoration: `none`
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
            )}

        </>
    );
}
