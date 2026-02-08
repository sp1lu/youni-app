import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

/** Types */
interface PWAContextValue {
    isInstalled: boolean
    canInstall: boolean
    downloadPWA: () => Promise<void>
}

/** Context */
export const PWAContext = createContext<PWAContextValue>({
    isInstalled: false,
    canInstall: false,
    downloadPWA: async () => { }
})

/** Provider */
export const PWAProvider = ({ children }: { children: ReactNode }) => {
    const [isInstalled, setIsInstalled] = useState(false)
    const [canInstall, setCanInstall] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)

    /** intercetta il prompt */
    useEffect(() => {
        const handler = (e: Event) => {
            console.log(e);            
            e.preventDefault();
            setDeferredPrompt(e as Event);
            setCanInstall(true);
        }

        window.addEventListener('beforeinstallprompt', handler);

        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        }
    }, []);

    /** rileva se già installata */
    useEffect(() => {
        const checkInstalled = () => {
            const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                // @ts-expect-error iOS
                window.navigator.standalone === true;
            setIsInstalled(isStandalone);
        }

        checkInstalled();
        window.addEventListener('appinstalled', checkInstalled);

        return () => {
            window.removeEventListener('appinstalled', checkInstalled);
        }
    }, [])

    /** trigger install */
    const downloadPWA = async () => {        
        if (!deferredPrompt) return;
        (deferredPrompt as any).prompt();
        await (deferredPrompt as any).userChoice;
        setDeferredPrompt(null);
        setCanInstall(false);
    }

    return (
        <PWAContext.Provider value={{ isInstalled, canInstall, downloadPWA }}>
            {children}
        </PWAContext.Provider>
    )
}

export const usePWA = () => useContext(PWAContext)