// /** Dependencies */
// import { useState, type ChangeEvent, type PropsWithChildren } from 'react'

// /** Style */
// import './Drawer.scss'

// /** Interface */
// type DrawerProps = PropsWithChildren<{
//     toggleIcon: string,
//     closeIcon: string
// }>

// /** Component */
// function Drawer(props: DrawerProps) {
//     const { children, toggleIcon, closeIcon } = props;

//     /** State */
//     const [isOpen, setIsOpen] = useState<boolean>(false);

//     /** Methods */
//     const onCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
//         setIsOpen(event.target.checked);
//     }

//     /** Node */
//     return (
//         <div className='drawer'>
//             <label className='drawer-toggle'>
//                 <input type='checkbox' className='drawer-toggle__input' defaultChecked={isOpen} onChange={onCheckboxChange} />
//                 <span className='drawer-toggle__icon' style={{ maskImage: `url(${isOpen ? closeIcon : toggleIcon})` }}></span>
//             </label>
//             <div className={`drawer-content ${isOpen ? 'drawer-content--open' : ''}`}>
//                 {children}
//             </div>
//         </div>
//     )
// }

// export default Drawer

/** Dependencies */
import { forwardRef, useImperativeHandle, useState, type PropsWithChildren } from 'react'

/** Interface */
type DrawerProps = PropsWithChildren<{
    toggleIcon: string,
    closeIcon: string
}>

export type DrawerHandle = {
    open: () => void,
    close: () => void
}

/** Style */
import './Drawer.scss'

/** Component */
const Drawer = forwardRef<DrawerHandle, DrawerProps>((props, ref) => {
    const { children, closeIcon } = props;

    /** Refs */
    useImperativeHandle(ref, () => {
        return {
            open: () => setIsOpen(true),
            close: () => setIsOpen(false)
        }
    });

    /** State */
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /** Methods */
    const onBtnClick = () => {
        setIsOpen(false);
    }

    /** Node */
    return (
        <div className={`drawer ${isOpen ? 'drawer--open' : ''}`}>
            <label className='drawer-toggle'>
                <button type='button' className='drawer-toggle__btn tertiary' onClick={onBtnClick}>
                    <span className='drawer-toggle__icon' style={{ maskImage: `url(${closeIcon})` }}></span>
                </button>
            </label>
            <div className={`drawer-content ${isOpen ? 'drawer-content--open' : ''}`}>
                {children}
            </div>
        </div>
    )
})

export default Drawer