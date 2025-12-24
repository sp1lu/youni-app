/** Dependencies */
import type { CSSProperties, ReactNode } from 'react'
import { NavLink } from 'react-router'

/** Style */
import './Card.scss'

/** Interface */
type CardProps = {
    uid: string,
    img: string,
    text: string,
    desc: string,
    path: string,
    chip?: string,
    url?: never,
    objectFit?: CSSProperties['objectFit'],
    backgroundColor?: string
} |
{
    uid: string,
    img: string,
    text: string,
    desc: string,
    url: string,
    chip?: string,
    path?: never,
    objectFit?: CSSProperties['objectFit'],
    backgroundColor?: string
}

/** Component */
function Card(props: CardProps) {
    const { uid, img, text, desc, path, url, chip, backgroundColor, objectFit } = props;

    const Wrapper = ({ children }: { children: ReactNode }) => {
        if (path) {
            return <NavLink to={`/${path}/${uid}`} className='link-wrapper'>{children}</NavLink>
        }

        if (url) {
            return <a href={url} className='link-wrapper' target='_blank'>{children}</a>
        }

        return <div className='link-wrapper'>{children}</div>
    }

    return (
        <div className='card'>
            <Wrapper>
                <NavLink to='/' className='card__chip'>{chip}</NavLink>
                <div className='card__img-wrapper' style={{ backgroundColor, display: img.length === 0 ? 'none' : 'block' }}>
                    <img src={img} className='card__img' loading='lazy' style={{ objectFit: objectFit ?? 'cover' }} />
                </div>
                <p className='card__text fw-700'>{text}</p>
                <p className='card__desc reset-margin'>{desc}</p>
            </Wrapper>
        </div>
    )
}

export default Card