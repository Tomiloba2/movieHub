import { Pagination } from '../components/Pagination';
import { useParams } from 'react-router-dom';
import { imgUrl } from '../libs/Async';
import { LoadingSpinner } from '../components/Loading';
import { Error } from '../components/Error';
import { Idetails } from '../types/Interfaces';
import notFound from '../assets/not-found.png'
import useQueriedData from '../libs/queries';

export function Details() {
  const { id } = useParams()
  const {
    detailMovie, recommendedMovie, similarMovie
  } = useQueriedData(id)

  if (detailMovie.isLoading) {
    return <LoadingSpinner />
  }
  if (detailMovie.isError) {
    return <Error message={detailMovie.error} />
  }
  
  const data: Idetails = detailMovie.data
  return (
    <div className='details'>
      <section >
        <article>
          <img loading='lazy' src={data.backdrop_path === null ? `${notFound}` : `${imgUrl}${data.backdrop_path}`} alt={data.title} className='details-img' />
          <div className="title">
            <h4>{data.original_title}</h4>
            <div>
              <span>runtime:&nbsp;{data.runtime}mins</span>
              <span>7.2</span>
            </div>
          </div>
          <hr />
          <div className="genres">
            <div className="release-date">
              <h5>Release Date</h5>
              <p>{data.release_date}</p>
            </div>
            <div className="genre">
              <h5>Genres</h5>
              <div>
                <ul>
                  {data.genres.map((item) => {
                    return (
                      <li key={item.id}>
                        {item.name}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div className="synopsis">
            <h5>Synopsis</h5>
            <p>
              {data.overview}
            </p>
          </div>
        </article>
        <article className='details-videos'>
          {/* {data.videos?.results.map((item) => {
            return (
              <div key={item.id}>
                {item.name}
                <a href={`https://www.youtube.com/watch?v=${item.key}`}>youtube</a>
              </div>
            )
          })} */}
        </article>
      </section>
      <section>
        {recommendedMovie.data?.length !== 0 ? (
          <Pagination
            title='Recommended'
            list={recommendedMovie.data}
            error={recommendedMovie.error}
            isLoading={recommendedMovie.isLoading}
            isError={recommendedMovie.isError} />
        ) : (null)}
      </section>
      <section>
        {similarMovie.data?.length !== 0 ? (
          <Pagination
            title='Similar'
            list={similarMovie.data}
            error={similarMovie.error}
            isLoading={similarMovie.isLoading}
            isError={similarMovie.isError} />
        ) : (null)}
      </section>

    </div>
  );
}
