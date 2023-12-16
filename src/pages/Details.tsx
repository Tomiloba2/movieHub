import { Pagination } from '../components/Pagination';
import { useParams, Link } from 'react-router-dom';
import { imgUrl } from '../libs/movies/Async';
import { LoadingSpinner } from '../components/Loading';
import { Error } from '../components/Error';
import { Idetails } from '../types/Interfaces';
import notFound from '../assets/not-found.png'
import { StarBorderPurple500Outlined } from '@mui/icons-material';
import fetchData, { apiKey, detailFetchData } from '../libs/movies/Async';
import { useQuery } from '@tanstack/react-query'
import { ImgCarousel } from '../components/ImgCarousel';


export function Details() {
  const { id } = useParams()
  const detailMovie = useQuery({
    queryKey: ['details', id],
    queryFn: () => detailFetchData(`movie/${id}?api_key=${apiKey}&append_to_response=credits,videos`)
  })
  const recommendedMovie = useQuery({
    queryKey: ['recommendations', id],
    queryFn: () => fetchData(`movie/${id}/recommendations?api_key=${apiKey}`),
    enabled: !!id
  })
  const similarMovie = useQuery({
    queryKey: ['similar', id],
    queryFn: () => fetchData(`movie/${id}/similar?api_key=${apiKey}`),
    enabled: !!id
  })


  if (detailMovie.isLoading) {
    return <LoadingSpinner />
  }
  if (detailMovie.isError) {
    return <Error message={detailMovie.error} />
  }

  const data: Idetails | undefined = detailMovie.data
  return (
    <div className='details'>
      <section >
        <article>
          <img
            src={data?.backdrop_path === null ? `${notFound}` : `${imgUrl}${data?.backdrop_path}`}
            alt={data?.title}
            className='details-img' />
          <div className="title">
            <h4>{data?.original_title}</h4>
            <div>
              <span>runtime:&nbsp;{data?.runtime}mins</span>
              <span>
                <StarBorderPurple500Outlined /> <br />
                {data?.vote_average}
              </span>
            </div>
          </div>
          <hr />
          <div className="genres">
            <div className="release-date">
              <h5>Release Date</h5>
              <p>
                {data?.release_date}
              </p>
            </div>
            <div className="genre">
              <h5>Genres</h5>
              <div>
                <ul>
                  {data?.genres.map((item) => {
                    return (
                      <li key={item.id}>
                        <Link to={`/genres/${item.id}`}>
                          {item.name}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <article className='details-videos'>
            {data?.videos?.results[0]?.site === `YouTube` ? (
              <iframe
                width={`100%`}
                height={345}
                src={`https://www.youtube.com/embed/${data?.videos?.results[0].key}`}
                frameBorder={0}
                allowFullScreen
                style={{
                  borderRadius: `20px`
                }}
              ></iframe>
            ) : null}
          </article><br /><br />
          <div className="synopsis">
            <h5>Synopsis</h5>
            <p>
              {data?.overview}
            </p>
          </div><br /><br />
          <div className="cast">
            <h5>Cast</h5>
            {data?.credits.cast !== undefined && (
              <ImgCarousel
                list={data?.credits.cast} />
            )}
          </div>
        </article>
      </section><br /><br />
      <section>
        {recommendedMovie.data?.length !== 0 ? (
          <Pagination
            title='Recommended For You'
            list={recommendedMovie.data}
            error={recommendedMovie.error}
            isLoading={recommendedMovie.isLoading}
            isError={recommendedMovie.isError} />
        ) : (null)}
      </section><br/>
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
