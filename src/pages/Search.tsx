import * as React from 'react'
import { LoadingSpinner } from '../components/Loading';
import { Error } from '../components/Error';
import { apiKey, imgUrl, instance } from '../libs/movies/Async';
import { Link } from 'react-router-dom';
import notFound from '../assets/not-found.png';
import { genres } from '../libs/movies/genres';
import { useQuery } from '@tanstack/react-query';
import { Itrending } from '../types/Interfaces';

export function SearchPage() {
    const [query, setQuery] = React.useState('')
    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    const { data, refetch, isError, isLoading, error } = useQuery({
        queryFn: async () => {
            const res = await instance.get(`search/movie?api_key=${apiKey}&query=${query}`)
            return res.data?.results
        },
        queryKey: ['searchMovies'],
        enabled: false
    })
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        refetch()
    }
    return (
        <>
            <div>
                <form onSubmit={handleSearch} style={{
                    display: `flex`,
                    justifyContent: `space-between`
                }}>
                    <input
                        type="search"
                        placeholder='Search for your favourite movies'
                        value={query}
                        onChange={handleQuery}
                    />
                </form>
            </div>
            {!data ? (
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
                            {isLoading && <LoadingSpinner/>}
                            {data?.map((item: Itrending) => {
                                return (
                                    <div key={item.id}>
                                        <img
                                            width={'150px'}
                                            height={'200px'}
                                            loading='lazy' src={item.backdrop_path !== null ? `${imgUrl}${item.backdrop_path}` : notFound} alt={item.original_title} />
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
                            {isError && <Error message={error}/>}
                        </article>
                    </section>
                </div>
            )}

        </>
    );
}
