/** Dependencies */
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'

/** Services */
import { getAllDiscountCategories, getDiscountCategoryLabel } from '../../global/services'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import { getAllDiscounts, type Discount } from '../../features/discounts'
import type { DiscountCategory } from '../../global/types'
import type { ModalHandle } from '../../global/components/modal/Modal'

/** Components */
import { Card, Drawer, Modal, Navbar } from '../../global/components'

/** Style */
import './DiscountsPage.scss'

function DiscountsPage() {
    /** Contexts */
    const { user, logout } = useAuth();

    /** Refs */
    const modalRef = useRef<ModalHandle | null>(null);

    /** State */
    const [isLoadingDiscounts, setIsLoadingDiscounts] = useState<boolean>(false);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [filteredDiscounts, setFilteredDiscounts] = useState<Discount[]>([]);
    const [discountCategories, setDiscountsCategories] = useState<DiscountCategory[]>([]);
    const [filterForm, setFilterForm] = useState<Record<string, boolean>>({});

    /** Effects */
    useEffect(() => {
        setIsLoadingDiscounts(true);
        getAllDiscounts()
            .then((discounts: Discount[]) => {
                setDiscounts(discounts.filter((e) => e.city === user?.city))
                setFilteredDiscounts(discounts.filter((e) => e.city === user?.city))
                console.log(discounts);

            })
            .catch((err: unknown) => err)
            .finally(() => setIsLoadingDiscounts(false));
    }, [])

    useEffect(() => {
        getAllDiscountCategories()
            .then((categories: DiscountCategory[]) => setDiscountsCategories(categories))
            .catch((err: unknown) => err)
    }, [])

    /** Methods */
    const onModalToggleClick = (): void => {
        modalRef.current?.open();
    }

    const onInpuChange = (event: ChangeEvent, id: string): void => {
        const input = event.target as HTMLInputElement;
        const value: boolean = input.checked;

        setFilterForm((prevValue) => {
            return {
                ...prevValue,
                [id]: value
            }
        })
    }

    const onFormSubmit = (formEvent: FormEvent): void => {
        formEvent.preventDefault();
        const keys: Set<string> = new Set(
            Object.entries(filterForm)
                .filter(([_, v]: [string, boolean]) => v)
                .map(([k, _]: [string, boolean]) => k)
        );

        setFilteredDiscounts(
            keys.size === 0 ?
                discounts :
                discounts.filter((discount: Discount) => discount.categories.some(c => keys.has(c)))
        );

        modalRef.current?.close();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /** Node */
    return (
        <div className='page discounts-page'>
            <button type='button' className='button tertiary filters-toggle' onClick={onModalToggleClick}>
                <span className='filters-icon'></span>
            </button>
            <p className='title-s discounts-title'>Convenzioni</p>
            <Drawer toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
            </Drawer>

            {
                isLoadingDiscounts ?
                    <p className='discounts-list__empty'>Caricamento convenzioni in corso...</p> :
                    <div className='discounts-list'>
                        {
                            filteredDiscounts.length > 0 ?
                                filteredDiscounts.map((d: Discount) => (
                                    <Card key={d.id}
                                        uid={d.id}
                                        img={d.img}
                                        text={d.title}
                                        desc={d.discount}
                                        path='discounts'
                                        backgroundColor={d.color}
                                        chip={
                                            (() => {
                                                const id = d.categories[0];
                                                return id ? getDiscountCategoryLabel(id, discountCategories) : id;
                                            })()
                                        }
                                    />
                                )) :
                                <p className='discounts-list__empty'>Nessuna convenzione trovata per i criteri impostati</p>
                        }
                    </div>
            }

            <Modal ref={modalRef} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} title='Filtri'>
                <form className='filter-form' onSubmit={onFormSubmit}>
                    <div className='filter-form__category'>
                        <p className='filter-form__category-name subtitle-xs'>Tipologia di convenzione</p>
                        <div className='filter-form__radio'>
                            {
                                discountCategories.map((c: DiscountCategory) => (
                                    <label key={c.id} className='chip'>
                                        <input type='checkbox' name='event-category' checked={!!filterForm[c.id]} onChange={(e) => onInpuChange(e, c.id)} />
                                        {c.label}
                                    </label>
                                ))
                            }
                        </div>
                    </div>
                    <button type='submit' className='primary'>Mostra risultati</button>
                </form>
            </Modal>
        </div>
    )
}

export default DiscountsPage