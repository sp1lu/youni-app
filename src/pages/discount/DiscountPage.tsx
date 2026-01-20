/** Dependencies */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useParams } from 'react-router'
import EditorJSHTML from 'editorjs-html'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Models */
import { type Discount } from '../../features/discounts'

/** Services */
import { getDiscountById } from '../../features/discounts'

/** Components */
import { Drawer, Navbar } from '../../global/components'
import { getAllCities, getCityLabel, type City } from '../../features/users'

/** Style */
import './DiscountPage.scss'

/** Component */
function DiscountPage() {
    /** Params */
    const { id } = useParams();

    /** Contexts */
    const { user, logout } = useAuth();

    /** Memo */
    const editorjsParser = useMemo(() => EditorJSHTML(), []);

    /** State */
    const [discount, setDiscount] = useState<Discount | null>(null);
    const [cities, setCities] = useState<City[]>([]);

    /** Effects */
    useEffect(() => {
        if (!id) return;
        getDiscountById(id)
            .then((discount: Discount | null) => {
                setDiscount(discount);
            })
    }, []);

    useEffect(() => {
        getAllCities()
            .then((cities: City[]) => {
                setCities(cities);
            })
    }, []);

    /** Methods */

    /** Node */
    return (
        <div className='page discount-page'>
            {
                !discount ?
                    '' :
                    <div>
                        {/* <button type='button' className='button tertiary back-btn'>
                            <span className='filters-icon'></span>
                        </button> */}
                        <Link to='/discounts'>
                            <div className='back-btn'>
                                <span className='back-btn__icon'></span>
                            </div>
                        </Link>
                        <p>
                            {
                                cities ? `${getCityLabel(discount.city, cities)} ∙ Convenzione` : 'Convenzione'
                            }
                        </p>
                        <Drawer toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                            <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
                        </Drawer>
                        <img src={discount.img} alt='Immagine della convenzione' style={{ backgroundColor: discount.color }} className='discount-img' />
                        <h2>{discount.title}</h2>
                        <p>{discount.discount}</p>

                        <h2>Descrizione convenzione</h2>
                        <div dangerouslySetInnerHTML={{ __html: editorjsParser.parse(discount.content) }}></div>
                        <div>
                            <h2>Contatti</h2>
                            <div>
                                <a href={`mailto:${discount.email}`}>{discount.email}</a>
                                <a href={`tel:+39${discount.phone}`}>{discount.phone}</a>
                                <a href={`https://www.google.com/maps/search/?api=1&query=${discount.address}`} target='_blank'>{discount.address}</a>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default DiscountPage