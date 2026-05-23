/** Dependencies */
import { Link } from 'react-router'

/** Components */
import { PWABanner } from '../../features/pwa'
import { Header } from '../../global/components'

/** Style */
import './StripeCancelPage.scss'

/** Component */
function StripeCancelPage() {
    return (
        <div className='page stripe-cancel-page'>
            <Header text='Annullamento' style={{ fontWeight: 700, textAlign: 'center' }}></Header>
            <PWABanner closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} />

            <div className='stripe-cancel-page-body'>
                <div className='subscribe-event-success-infos'>
                    <div className='cancel'>
                        <div className='confirm__icon-wrapper'>
                            <span className='cancel__icon'></span>
                        </div>
                        <div className='cancel__texts'>
                            <h3 className='cancel__title'>Pagamento annullato</h3>
                            <p className='cancel__msg'>Il pagamento è stato annullato e l'iscrizione all'evento non avvenuta</p>
                        </div>
                    </div>
                </div>

                <div className='subscribe-event-success-cta'>
                    <Link to={`/`} className='button primary'>{'Torna alla home'}</Link>
                </div>
            </div>
        </div>
    )
}

export default StripeCancelPage