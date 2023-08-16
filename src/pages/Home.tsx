import { useQuery } from '@tanstack/react-query'
import { Carousel } from '../components/Carousel';
import { Pagination } from '../components/Pagination';
import fetchData, { apiKey } from '../libs/Async';

export function Home() {
    const trending = useQuery({
        queryKey: ["trending"],
        queryFn: () => fetchData(`trending/movie/day?api_key=${apiKey}`)
    })
    const popular = useQuery({
        queryKey: ['popular'],
        queryFn: () => fetchData(`/movie/popular?api_key=${apiKey} `)
    })
    const topRated = useQuery({
        queryKey: ['top-rated'],
        queryFn: () => fetchData(`/movie/top_rated?api_key=${apiKey} `)
    })
    const upComing = useQuery({
        queryKey: ['upcoming'],
        queryFn: () => fetchData(`/movie/upcoming?api_key=${apiKey} `)
    })
    console.log(popular.data);

    return (
        <div className='home'>
            <section>
                <h4>
                    Recommendations for you
                </h4>
                <div>
                    <Carousel
                        list={trending.data}
                        error={trending.error}
                        isLoading={trending.isLoading}
                        isError={trending.isError} />
                </div>
                <div>
                    <Pagination
                        title='Popular'
                        list={popular.data}
                        error={popular.error}
                        isLoading={popular.isLoading}
                        isError={popular.isError} />
                </div>
                <div>
                    <Pagination
                        title='Top rated'
                        list={topRated.data}
                        error={topRated.error}
                        isLoading={topRated.isLoading}
                        isError={topRated.isError} />
                </div>
                <div>
                    <Pagination
                        title='Up coming'
                        list={upComing.data}
                        error={upComing.error}
                        isLoading={upComing.isLoading}
                        isError={upComing.isError} />
                </div>
            </section>
        </div>
    );
}
