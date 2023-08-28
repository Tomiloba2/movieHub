import { Carousel } from '../components/Carousel';
import { Pagination } from '../components/Pagination';
import useQueriedData from '../libs/queries'

export function Home() {
    const {
        popular, now_playing, trending, upComing,topRated
    } = useQueriedData()
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
                        title='Now Showing'
                        list={now_playing.data}
                        error={now_playing.error}
                        isLoading={now_playing.isLoading}
                        isError={now_playing.isError} />
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
