/** Contexts */
import { usePWA } from '../contexts'

/** Styles */
import './PWABanner.scss'

/** Component */
function PWABanner() {
    /** Contexts */
    const { isInstalled, downloadPWA } = usePWA();

    /** Node */
    return (
        !isInstalled &&
        <div className='pwabanner'>
            <button type='button' className='pwa-btn' onClick={downloadPWA}>Installa Youni come app</button>
        </div>
    )
}

export default PWABanner