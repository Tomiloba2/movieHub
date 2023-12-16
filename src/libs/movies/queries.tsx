import fetchData, { apiKey, detailFetchData } from './Async';
import { useQuery } from '@tanstack/react-query'

//details page queries
const useQueriedData = (id?: string | undefined) => {
    //home page queries
    //details movie queries
    const detailMovie = useQuery({
        queryKey: ['details', id],
        queryFn: () => detailFetchData(`movie/${id}?api_key=${apiKey}&append_to_response=videos`)
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
            detailMovie, recommendedMovie, similarMovie
        }
    )
}

export default useQueriedData;