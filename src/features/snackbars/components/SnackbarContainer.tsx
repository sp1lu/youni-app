/** Dependencies */
import { createPortal } from 'react-dom'

/** Types */
import type { SnackbarData } from '../types'

/** Contexts */
import { useSnackbars } from '../contexts'

/** Components */
import Snackbar from './Snackbar';

/** Styles */
import './SnackbarContainer.scss'

/** Component */
function SnackbarContainer() {
    const { snackbars, removeSnackbar } = useSnackbars();

    const onSnackbarClick = (id: string): void => {
        removeSnackbar(id);
    }

    return createPortal(
        <div className='snackbar-container'>
            {
                snackbars.map((snackbar: SnackbarData) => (
                    <Snackbar key={snackbar.id} snackbar={snackbar} onSnackbarClick={() => onSnackbarClick(snackbar.id)} />
                ))
            }
        </div>,
        document.body
    )
}

export default SnackbarContainer