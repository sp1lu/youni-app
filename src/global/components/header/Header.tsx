/** Dependencies */
import { type CSSProperties, type PropsWithChildren, Children, isValidElement } from 'react'

/** Types */
type HeaderProps = {
    text: string;
    style?: CSSProperties;
}

/** Style */
import './Header.scss'

/** Slots */
Header.Left = ({ children }: PropsWithChildren) => <>{children}</>
Header.Right = ({ children }: PropsWithChildren) => <>{children}</>

/** Node */
function Header(props: PropsWithChildren<HeaderProps>) {
    const { text, style, children } = props;

    const items = Children.toArray(children);

    const leftElement = items.find(child => isValidElement(child) && child.type === Header.Left);
    const rightElement = items.find(child => isValidElement(child) && child.type === Header.Right);

    /** Node */
    return (
        <div className='header-comp'>
            <div className='header-left'>{leftElement}</div>
            <div className='header-center'>
                <p style={style}>{text}</p>
            </div>
            <div className='header-right'>{rightElement}</div>
        </div>
    )
}

export default Header