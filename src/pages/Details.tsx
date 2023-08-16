import { Pagination } from '../components/Pagination';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'
import fetchData, { apiKey, detailFetchData, imgUrl } from '../libs/Async';
import { LoadingSpinner } from '../components/Loading';
import { Error } from '../components/Error';
import { Idetails } from '../types/Interfaces';
import notFound from '../assets/not-found.png'
//import { useEffect } from 'react';


export function Details() {
  const { id } = useParams()
  const detailMovie = useQuery({
    queryKey: ['details',id],
    queryFn: () => detailFetchData(`movie/${id}?api_key=${apiKey}`)
  })
  const recommendedMovie = useQuery({
    queryKey: ['recommendations',id],
    queryFn: () => fetchData(`movie/${id}/recommendations?api_key=${apiKey}`),
    enabled:!!id
  })
  if (detailMovie.isLoading) {
    return <LoadingSpinner />
  }
  if (detailMovie.isError) {
    return <Error message={detailMovie.error} />
  }
  console.log(recommendedMovie.data);
  
  const data: Idetails = detailMovie.data
  return (
    <div className='details'>
      <section >
        <article>
          <img src={data.backdrop_path===null?`${notFound}`:`${imgUrl}${data.backdrop_path}`} alt={data.title} className='details-img' />
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
      </section>
      <section>
        <Pagination
          title='Recommended'
          list={recommendedMovie.data}
          error={recommendedMovie.error}
          isLoading={recommendedMovie.isLoading}
          isError={recommendedMovie.isError} />
      </section>
    </div>
  );
}
