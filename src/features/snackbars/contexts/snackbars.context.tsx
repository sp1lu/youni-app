/** Dependencies */
import { createContext, useContext, useState, type ReactNode } from 'react'

/** Types */
import type { SnackbarData, SnackbarType } from '../types';

/** Types */
interface SnackbarsContextValue {
    snackbars: SnackbarData[],
    createSnackbar: (text: string, type: SnackbarType) => string,
    removeSnackbar: (id: string) => void
}

/** Context */
export const SnackbarsContext = createContext<SnackbarsContextValue>({
    snackbars: [],
    createSnackbar: () => '',
    removeSnackbar: () => { }
});

/** Provider */
export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
    const [snackbars, setSnackbars] = useState<SnackbarData[]>([]);

    const createSnackbar = (text: string, type: SnackbarType): string => {
        const id: string = `snackbar_${new Date().getTime()}`
        setSnackbars((oldValue: SnackbarData[]) => {
            return [
                ...oldValue, {
                    id,
                    text,
                    type
                }
            ];
        });
        return id;
    }

    const removeSnackbar = (id: string): void => {
        setSnackbars((oldValue: SnackbarData[]) => {
            return oldValue.filter((value: SnackbarData) => value.id !== id);
        })
    }

    return (
        <SnackbarsContext.Provider value={{ snackbars, createSnackbar, removeSnackbar }}>
            {children}
        </SnackbarsContext.Provider>
    )
}

export const useSnackbars = () => useContext(SnackbarsContext);