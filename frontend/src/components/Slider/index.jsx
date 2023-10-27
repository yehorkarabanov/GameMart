import React from "react";
import styles from './Slider.module.scss';
import {Carousel} from "react-bootstrap";

const data = [
    {
        image: require('../../accets/img/baldurs-gate.jpg'),
        caption: "Baldurgs Gate 3"
    },
    {
        image: require('../../accets/img/cyberpunk2077.jpg'),
        caption: "Cyberpunk2077"
    },
    {
        image: require('../../accets/img/baldurs-gate.jpg'),
        caption: "Baldurgs Gate 3"
    }
]

export const Slider = () => {
    const [index, setIndex] = React.useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    }

    return (
        <div className={`container`}>
            <Carousel activeIndex={index} onSelect={handleSelect}>
                {data.map((slide, i) => {
                    return (
                        <Carousel.Item>
                            <img className={`d-block w-100`} src={slide.image} alt={`slider image`}/>
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