import React from "react";
import styles from './Slider.scss';
import {Carousel} from "react-bootstrap";

const data = [
    {
        image: require('../../accets/img/baldurs-gate.jpg'),
        caption: "Baldurs Gate 3"
    },
    {
        image: require('../../accets/img/cyberpunk2077.jpg'),
        caption: "Cyberpunk 2077"
    },
    {
        image: require('../../accets/img/stalker2.jpg'),
        caption: "Stalker 2"
    }
]

export const Slider = () => {
    const [index, setIndex] = React.useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    return (
        <div className={`container`} id="game_carousel">
            <Carousel activeIndex={index} onSelect={handleSelect} className={`${styles.carouselInner}`}>
                {data.map((slide, i) => {
                    return (
                        <Carousel.Item className={`${styles.carouselItem}`} key={i}>
                            <img className={`d-block w-100`} src={slide.image} alt={`${slide.caption}`}/>
                            <Carousel.Caption>
                                <h3>
                                    {slide.caption}
                                </h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                })}
            </Carousel>
        </div>
    );
}