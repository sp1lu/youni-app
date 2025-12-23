/** Dependencies */
import { useRef, type PropsWithChildren } from 'react'

/** Types */
type SliderProps = {}

/** Styles */
import './Slider.scss'

/** Component */
function Slider(props: PropsWithChildren<SliderProps>) {
    /** Props */
    const { children } = props;

    /** Refs */
    const slider = useRef<HTMLDivElement | null>(null);

    /** Methods */
    const onBtnClick = (direction: 'prev' | 'next') => {
        if (!slider || !slider.current) return;

        const { clientWidth } = slider.current;
        const scrollAmout: number = clientWidth * .8;

        slider.current.scrollBy({
            left: direction === 'next' ? scrollAmout : -scrollAmout,
            behavior: 'smooth'
        })
    }

    /** Node */
    return (
        <div className='slider'>
            <button type='button' className='slider__button slider__button--left' onClick={() => onBtnClick('prev')}>
                <span className='slider__icon'></span>
            </button>
            <div ref={slider} className='slider__content'>{children}</div>
            <button type='button' className='slider__button slider__button--right' onClick={() => onBtnClick('next')}>
                <span className='slider__icon'></span>
            </button>
        </div>
    )
}

export default Slider