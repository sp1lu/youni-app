/** Contexts */
import { useRef } from 'react';
import { usePWA } from '../contexts'

/** Interface */
type PWABannerProps = {
    closeIcon: string
}

/** Styles */
import './PWABanner.scss'

/** Component */
function PWABanner(props: PWABannerProps) {
    const { closeIcon } = props;

    /** Contexts */
    const { isInstalled, canInstall, downloadPWA } = usePWA();

    /** Refs */
    const popoverRef = useRef<HTMLDivElement>(null);

    /** Methods */
    const onBtnClick = async () => {
        if (canInstall) {
            await downloadPWA();
            return;
        }

        popoverRef.current?.showPopover();
    }

    /** Node */
    return (
        !isInstalled &&
        <div className='pwabanner'>
            <button type='button' className='primary pwa-btn' onClick={onBtnClick}>
                <span className='download-icon'></span>
                Installa Youni come app
            </button>
            <div ref={popoverRef} popover='auto' id='pwa-popover' className='pwa-popover'>
                <p className='popover__text'>Per installare l'app sul proprio dispositivo andare nella barra dal browser, cliccare su <b>condividi</b> e poi su <b>installa</b>.</p>
                <button type="button" popoverTarget='pwa-popover' popoverTargetAction='hide' className='popover__close tertiary'>
                    <span className='popover__icon' style={{ maskImage: `url(${closeIcon})` }}></span>
                </button>
            </div>
        </div>
    )
}

export default PWABanner