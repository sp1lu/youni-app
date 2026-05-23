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

    /** Detect install */
    const detectPWA = () => {
        return (
            window.matchMedia('(display-mode: standalone)').matches ||
            // @ts-expect-error iOS
            window.navigator.standalone === true ||
            document.referrer.includes('android-app://')
        );
    }

    /** intercetta il prompt */
    useEffect(() => {
        const handler = (e: Event) => {
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
        const installed =
            detectPWA() ||
            localStorage.getItem('pwa-installed') === 'true';

        if (installed) {
            localStorage.setItem('pwa-installed', 'true');
        }

        setIsInstalled(installed);
    }, []);

    /** install completed */
    useEffect(() => {
        const onAppInstalled = () => {
            localStorage.setItem(
                'pwa-installed',
                'true'
            );

            setIsInstalled(true);
            setCanInstall(false);
            setDeferredPrompt(null);
        }

        window.addEventListener(
            'appinstalled',
            onAppInstalled
        );

        return () => {
            window.removeEventListener(
                'appinstalled',
                onAppInstalled
            );
        }

    }, []);

    /** trigger install */
    const downloadPWA = async () => {
        if (!deferredPrompt) return;
        const promptEvent = deferredPrompt as any;
        promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === 'accepted') {
            localStorage.setItem('pwa-installed', 'true');
            setIsInstalled(true);
        }
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