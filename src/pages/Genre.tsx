import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import fetchData, { apiKey, imgUrl } from '../libs/movies/Async';
import { Itrending } from '../types/Interfaces';
import { Button } from '../components/Button';
import notFound from '../assets/not-found.png'
import { Error } from '../components/Error';
import { LoadingSpinner } from '../components/Loading';


export function Genres() {
  const { id } = useParams()
  const movieGenre = useQuery({
    queryKey: ['genres', id,],
    queryFn: () => fetchData(`discover/movie?api_key=${apiKey}&with_genres=${id}`)
  })
  if (movieGenre.isLoading) {
    return <LoadingSpinner />
  }
  if (movieGenre.isError) {
    return <Error message={movieGenre.error} />
  }
  const data: Itrending[] = movieGenre.data
  return (
    <div>
      <article className='current-records'>
        {data?.map((item) => {
          return (
            <div key={id}>
              <img
                loading='lazy'
                style={{objectFit:'cover'}}
                src={item.backdrop_path !== null ? `${imgUrl}${item.backdrop_path}` : notFound}
                alt={item.title} />
              <section>
                <p>{item.title}</p>
                <br />
                <Button id={item.id} />
              </section>
            </div>
          )
        })}
      </article>

    </div>
  );
}
