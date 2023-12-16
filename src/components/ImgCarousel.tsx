import { ArrowLeft, ArrowRight } from '@mui/icons-material';
import * as React from 'react';
import { imgUrl } from '../libs/movies/Async';
import { Cast } from '../types/Interfaces';
import notFound from '../assets/not-found.png'

export interface IImgCarouselProps {
    list: Cast[];
}

export function ImgCarousel(props: IImgCarouselProps) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const handleNext = () => {
        setCurrentIndex(
            (currentIndex + 1) % props.list?.length
        )
    }
    const handlePrev = () => {
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
        const play = setInterval(handleNext, 4000)
        return () => {
            clearInterval(play)
        }
    }, [currentIndex])
    const currentTransform = -currentIndex * 100

    return (
        <div>
            <div>
                <section
                    className="img-carousel"
                    onKeyDown={handleKeyDown}
                    onTouchMove={handleKeyDown}
                    tabIndex={0}>
                    <div className="navigation">
                        <button onClick={handleNext}><ArrowLeft /></button>
                        <button onClick={handlePrev}><ArrowRight /></button>
                    </div>
                    <div
                        className="items"
                        style={{
                            transform: `translateX(${currentTransform}%)`
                        }}>
                        {props.list !== undefined && props.list.map((item, id) => {
                            return (
                                <div className="item" key={id}>
                                    <img src={item.profile_path === null ? `${notFound}`:`${imgUrl}${item.profile_path}`} alt={item.name} />
                                    <aside>
                                        <p>{item.name}</p>
                                    </aside>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
        </div>
    );
}
