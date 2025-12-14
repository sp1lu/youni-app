/** Dependencies */
import { useEffect } from 'react'

/** Types */
import type { SnackbarData } from '../types'

/** Styles */
import './Snackbar.scss'

/** Component */
function Snackbar({ snackbar, onSnackbarClick }: { snackbar: SnackbarData, onSnackbarClick: () => void }) {
    const { text, type } = snackbar;

    /** Effect */
    useEffect(() => {
        setTimeout(onSnackbarClick, 2000);
    }, []);

    /** Node */
    return (
        <div className='snackbar'>
            <div className={`snackbar__icon ${type === 'SUCCESS' ? 'snackbar__icon--success' : 'snackbar__icon--error'}`}>
                <span>
                    {
                        type === 'SUCCESS' ?
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M400-304 240-464l56-56 104 104 264-264 56 56-320 320Z" /></svg> :
                            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-429 316-265q-11 11-25 10.5T266-266q-11-11-11-25.5t11-25.5l163-163-164-164q-11-11-10.5-25.5T266-695q11-11 25.5-11t25.5 11l163 164 164-164q11-11 25.5-11t25.5 11q11 11 11 25.5T695-644L531-480l164 164q11 11 11 25t-11 25q-11 11-25.5 11T644-266L480-429Z" /></svg>
                    }
                </span>
            </div>
            <p className='snackbar__text'>{text}</p>
            <button type='button' className='snackbar__btn' onClick={onSnackbarClick}>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M480-429 316-265q-11 11-25 10.5T266-266q-11-11-11-25.5t11-25.5l163-163-164-164q-11-11-10.5-25.5T266-695q11-11 25.5-11t25.5 11l163 164 164-164q11-11 25.5-11t25.5 11q11 11 11 25.5T695-644L531-480l164 164q11 11 11 25t-11 25q-11 11-25.5 11T644-266L480-429Z" /></svg>
                </span>
            </button>
        </div>
    )
}

export default Snackbar