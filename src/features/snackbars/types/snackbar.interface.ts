/** Types */
import type { SnackbarType } from './snackbar-type.type'

/** Interface */
export interface SnackbarData {
    id: string;
    text: string;
    type: SnackbarType
}