import * as React from 'react';
import { apiKey, instance } from '../libs/Async';
import { Itrending } from '../types/Interfaces';


export interface IContext {
    query: string;
    handleQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
    data: Itrending[] | undefined,
    loading: boolean | null;
    err: { isError: boolean, error: any };
}
const SearchContext = React.createContext<IContext | null>(null)

export interface ISearchProviderProps {
    children: React.ReactNode
}

export function SearchProvider(props: ISearchProviderProps) {
    const [query, setQuery] = React.useState('')
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState<boolean | null>(null)
    const [err, setErr] = React.useState<{ isError: boolean, error: any }>({ isError: false, error: `` })
    const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    const handleSearch = () => {
        const fetchMovie = async () => {
            setLoading(true)
            try {
                const res = await instance.get(`search/movie?api_key=${apiKey}&query=${query}`)
                setData(res.data?.results)
                setQuery(``)
            } catch (error) {
                setErr({ ...err, isError: true, error })
            } finally {
                setLoading(false)
            }
        }
        fetchMovie()
    }

    const value = { query, handleQuery, handleSearch, data, loading, err }
    return (
        <div>
            <SearchContext.Provider value={value}>
                {props.children}
            </SearchContext.Provider>
        </div>
    );
}

export function useSearch() {
    return React.useContext(SearchContext)
}