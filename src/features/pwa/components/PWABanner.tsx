/** Contexts */
import { usePWA } from '../contexts'

/** Component */
function PWABanner() {
    /** Contexts */
    const { downloadPWA } = usePWA();

    /** Node */
    return (
        <div className='pwabanner'>
            <button type='button' onClick={downloadPWA}>Installa Youni come app</button>
        </div>
    )
}

export default PWABanner