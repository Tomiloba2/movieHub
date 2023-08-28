import fetchData, { apiKey, detailFetchData } from '../libs/Async';
import { useQuery } from '@tanstack/react-query'

//details page queries
const useQueriedData = (id?: string | undefined) => {
    //home page queries
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

    const now_playing = useQuery({
        queryKey: ['now_playing'],
        queryFn: () => fetchData(`/movie/now_playing?api_key=${apiKey} `)
    })
    const upComing = useQuery({
        queryKey: ['upcoming'],
        queryFn: () => fetchData(`/movie/upcoming?api_key=${apiKey} `)
    })
    //details movie queries
    const detailMovie = useQuery({
        queryKey: ['details', id],
        queryFn: () => detailFetchData(`movie/${id}?api_key=${apiKey}&append_to_response=videos`)
    })
    const detailMovieVideos = useQuery({
        queryKey: ['detailsVideos', id],
        queryFn: () => detailFetchData(`movie/${id}/videos?api_key=${apiKey}&language=en-US&append_to_response=videos`)
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

    return (
        {
            detailMovieVideos,
            detailMovie, recommendedMovie, similarMovie,
            trending, popular, topRated, now_playing, upComing
        }
    )
}

export default useQueriedData;