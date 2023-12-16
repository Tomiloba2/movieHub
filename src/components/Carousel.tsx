import * as React from 'react';
import { Button } from './Button';
import { Itrending } from '../types/Interfaces';
import { imgUrl } from '../libs/movies/Async';
import { LoadingSpinner } from './Loading';
import { Error } from './Error';
import { ArrowLeft, ArrowRight } from '@mui/icons-material'

export interface ICarouselProps {
    isLoading: boolean;
    isError: boolean;
    list: Itrending[];
    error: any;
}

export function Carousel(props: ICarouselProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const handleNext = () => {
        setCurrentIndex(
            (currentIndex + 1) % props.list?.length
        )
    }
    const handlePrev =() => {
        setCurrentIndex(
            (currentIndex - 1 + props.list?.length) % props.list?.length
        )
    }
    //enabling keyboard and touch navigation
    const handleKeyDown = (e: any) => {
        if (e.key === "ArrowRight") {
            handleNext()
        } else if (e.key === "ArrowLeft") {
            handlePrev()
        }
    }
    //creating autoplay
    React.useEffect(() => {
        const play = setInterval(handleNext, 15000)
        return () => {
            clearInterval(play)
        }
    }, [currentIndex])
    const currentTransform = -currentIndex * 100
    /*handling loading and error state*/
    if (props.isLoading) {
        return <LoadingSpinner />
    }
    if (props.isError) {
        return <Error message={props.error?.message} />
    }
    return (
        <div>
            <section
                className="carousel-wrapper"
                onKeyDown={handleKeyDown}
                onTouchMove={handleKeyDown}
                tabIndex={0}>
                <div className="carousel-navigation">
                    <button onClick={handleNext}><ArrowLeft /></button>
                    <button onClick={handlePrev}><ArrowRight /></button>
                </div>
                <div
                    className="carousel-items"
                    style={{
                        transform: `translateX(${currentTransform}%)`
                    }}>
                    {props.list!==undefined && props.list.map((item, id) => {
                        return (
                            <div className="carousel-item" key={id}>
                                <img src={`${imgUrl}${item.backdrop_path}`} alt="" />
                                <aside>
                                    <h2>{item.original_title}</h2>
                                    <br />
                                    {item.overview.slice(0, 150)}...
                                    <br /><br />
                                    <Button id={item.id} />
                                </aside>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    );
}
