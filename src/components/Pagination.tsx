import * as React from 'react';
import { Button } from './Button';
import { Itrending } from '../types/Interfaces';
import { LoadingSpinner } from './Loading';
import { Error } from './Error';
import { imgUrl } from '../libs/Async';
import {ArrowLeft,ArrowRight} from '@mui/icons-material'
import notFound from '../assets/not-found.png'

export interface IPaginationProps {
    isLoading: boolean;
    isError: boolean;
    error: any;
    list: Itrending[]
    title: string
}

export function Pagination(props: IPaginationProps) {
    /*handling loading and error state*/
    if (props.isLoading) {
        return <LoadingSpinner />
    }
    if (props.isError) {
        return <Error message={props.error?.message} />
    }
    //records to display on apage
    const [recordPerpage] = React.useState(6)
    //current page number
    const [currentPage, setCurrentPage] = React.useState(1)
    //index of the last record
    const lastRecordIndex = currentPage * recordPerpage
    //index of the first rcord
    const firstRecordIndex = lastRecordIndex - recordPerpage
    //records to display by slicing the array
    const currentRecords = props.list?.slice(firstRecordIndex, lastRecordIndex)
    //determing the number of pages
    const numberOfPages = Math.ceil(props.list?.length / recordPerpage)
    const pageNumber = [...Array(numberOfPages + 1).keys()].slice(1)
    const nextPage = () => {
        if (currentPage != numberOfPages) {
            setCurrentPage(currentPage + 1)
        }
    }

    const previousPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1)
        }
    }
    return (
        <div>
            <section className="pagination">
                <h3>{props.title}</h3>
                <article>
                    <ul>
                        <li>
                            <a href="#" onClick={previousPage}>
                              <ArrowLeft/>
                            </a>
                        </li>
                        {pageNumber.map((item) => {
                            return (
                                <li key={item}>
                                    <a href="#" onClick={() => setCurrentPage(item)}>
                                        {item}
                                    </a>
                                </li>
                            )
                        })}
                        <li>
                            <a href="#" onClick={nextPage}>
                              <ArrowRight/>
                            </a>
                        </li>
                    </ul>
                </article>
                <article className='current-records'>
                    {currentRecords.map((item, id) => {
                        return (
                            <div key={id}>
                                <img src={item.backdrop_path!==null?`${imgUrl}${item.backdrop_path}`:notFound} alt={item.title} />
                                <section>
                                    <p>{item.title}</p>
                                    <br />
                                    <Button id={item.id} />
                                </section>
                            </div>
                        )
                    })}
                </article>
            </section>
        </div>
    );
}
