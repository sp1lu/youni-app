import { forwardRef, useImperativeHandle, useRef, useState, type ChangeEvent, type PropsWithChildren } from 'react'

/** Style */
import './Modal.scss'

/** Interface */
type ModalProps = PropsWithChildren<{
    closeIcon: string,
    title: string
}>

export type ModalHandle = {
    open: () => void,
    close: () => void
}

/** Component */
const Modal = forwardRef<ModalHandle, ModalProps>((props, ref) => {
    /** Props */
    const { children, closeIcon, title } = props;

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
        <div className={`modal ${isOpen ? 'modal--open' : ''}`}>
            <label className='modal-toggle'>
                <button type='button' className='modal-toggle__btn tertiary' onClick={onBtnClick}>
                    <span className='modal-toggle__icon' style={{ maskImage: `url(${closeIcon})` }}></span>
                </button>
            </label>
            <div className='modal-header'>
                <div className='modal-header__title-wrapper'>
                    <p>{title}</p>
                </div>
            </div>
            <div className='modal-content'>
                {children}
            </div>
        </div>
    )
})

export default Modal