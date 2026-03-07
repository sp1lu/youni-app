/** Dependencies */
import { Link } from 'react-router'

/** Components */
import { PWABanner } from '../../features/pwa'
import { Header } from '../../global/components'

/** Style */
import './StripeSuccessPage.scss'

/** Component */
function StripeSuccessPage() {
    /** Node */
    return (
        <div className='page stripe-success-page'>
            <Header text='Conferma partecipazione' style={{ fontWeight: 700, textAlign: 'center' }}></Header>
            <PWABanner />

            <div className='stripe-success-page-body'>
                <div className='subscribe-event-success-infos'>
                    <div className='confirmed'>
                        <div className='confirm__icon-wrapper'>
                            <span className='confirmed__icon'></span>
                        </div>
                        <div className='confirmed__texts'>
                            <h3 className='confirmed__title'>Pagamento confermato</h3>
                            <p className='confirmed__msg'>Non vediamo l'ora tu sia dei nostri!</p>
                        </div>
                    </div>
                </div>

                <div className='subscribe-event-success-cta'>
                    <Link to={`/account/my-tickets`} className='button primary'>{'Vai ai tuoi biglietti'}</Link>
                </div>
            </div>
        </div>
    )
}

export default StripeSuccessPage