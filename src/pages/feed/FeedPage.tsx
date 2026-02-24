/** Dependencies */
import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router'

/** Types */
import type { DiscountCategory, EventCategory } from '../../global/types'

/** Services */
import { getAllEvents, type AppEvent } from '../../features/events'
import { getAllDiscounts, type Discount } from '../../features/discounts'
import { getAllPosts, type Post } from '../../features/posts'
import { getAllCities, type City } from '../../features/users'
import { formatDate, getAllDiscountCategories, getAllEventCategories, getDiscountCategoryLabel, getEventCategoryLabel } from '../../global/services'

/** Contexts */
import { useAuth } from '../../features/auth'

/** Types */
import type { DrawerHandle } from '../../global/components/drawer/Drawer'

/** Componenents */
import { PWABanner } from '../../features/pwa'
import { Card, Drawer, Header, Navbar, Slider } from '../../global/components'

/** Style */
import './FeedPage.scss'

/** Component */
function FeedPage() {
    /** Context */
    const { user, logout } = useAuth();

    /** Refs */
    const drawerRef = useRef<DrawerHandle | null>(null);

    /** State */
    const [cities, setCities] = useState<City[]>([]);
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
    const [discountCategories, setDiscountCategories] = useState<DiscountCategory[]>([]);

    /** Effects */
    useEffect(() => {
        if (!user) return;
        getAllCities()
            .then((cities: City[]) => setCities(cities))
            .catch((err: unknown) => console.log(err))
    }, [user])

    useEffect(() => {
        if (!user) return;
        getAllEvents()
            .then((events: AppEvent[]) => setEvents(events.filter((e) => e.city === user.city)))
            .catch((err: unknown) => console.log(err))
    }, [user]);

    useEffect(() => {
        if (!user) return;
        getAllDiscounts()
            .then((discounts: Discount[]) => setDiscounts(discounts.filter((d) => d.city === user.city)))
            .catch((err: unknown) => console.log(err))
    }, [user]);

    useEffect(() => {
        if (!user || cities.length === 0) return;
        const city: City | undefined = cities.find((c) => c.id === user.city);
        if (!city) return;

        getAllPosts(city.url)
            .then((posts: Post[]) => setPosts(posts))
            .catch((err: unknown) => console.log(err))
    }, [cities, user]);

    useEffect(() => {
        if (!user) return;
        getAllEventCategories()
            .then((categories: EventCategory[]) => setEventCategories(categories))
            .catch((err: unknown) => console.log(err))
    }, [user])

    useEffect(() => {
        if (!user) return;
        getAllDiscountCategories()
            .then((categories: DiscountCategory[]) => setDiscountCategories(categories))
            .catch((err: unknown) => console.log(err))
    }, [user])

    /** Methods */
    const onDrawerToggleClick = (): void => {
        drawerRef.current?.open();
    }

    /** Node */
    return (
        <div className='page feed-page'>
            <Header text={`Ciao 👋${user ? `, ${user.firstName}` : ''}!`} style={{ fontSize: '1.5rem', fontWeight: 800, textAlign: 'left' }}>
                <Header.Right>
                    <button type='button' className='drawer-toggle tertiary' onClick={onDrawerToggleClick}>
                        <span className='drawer-toggle__icon'></span>
                    </button>
                </Header.Right>
            </Header>
            <PWABanner />
            <Drawer ref={drawerRef} toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} externalUrlsMap={cities.find((c) => c.id === user?.city)?.links} onLogout={logout} />
            </Drawer>
            {
                events.length > 0 &&
                <div className='feed-section'>
                    <NavLink to='/events' className='subtitle-xs section-title'>Eventi<span className='title-icon'></span></NavLink>
                    <Slider>
                        {
                            events.map((e: AppEvent) => (
                                <Card key={e.id}
                                    uid={e.id}
                                    img={e.img}
                                    text={e.title}
                                    desc={formatDate(e.date)}
                                    path='events'
                                    chip={
                                        (() => {
                                            const id = e.categories[0];
                                            return id ? getEventCategoryLabel(id, eventCategories) : id;
                                        })()
                                    }
                                />
                            ))
                        }
                    </Slider>
                </div>
            }

            {
                discounts.length > 0 &&
                <div className='feed-section'>
                    <NavLink to='/discounts' className='subtitle-xs section-title'>Convenzioni<span className='title-icon'></span></NavLink>
                    <Slider>
                        {
                            discounts.map((d: Discount) => (
                                <Card key={d.id}
                                    uid={d.id}
                                    img={d.img}
                                    text={d.title}
                                    desc={d.discount}
                                    backgroundColor={d.color}
                                    objectFit='contain'
                                    path='discounts'
                                    chip={
                                        (() => {
                                            const id = d.categories[0];
                                            return id ? getDiscountCategoryLabel(id, discountCategories) : id;
                                        })()
                                    }
                                />
                            ))
                        }
                    </Slider>
                </div>
            }

            {
                posts.length > 0 &&
                <div className='feed-section'>
                    <a href='https://youni.life/category/blog' target='_blank' className='subtitle-xs section-title'>News<span className='title-icon'></span></a>
                    <Slider>
                        {
                            posts.map((p: Post) => (
                                <Card key={p.id} uid={p.id} img={p.img} text={p.title} desc='' url={p.url} />
                            ))
                        }
                    </Slider>
                </div>
            }
        </div>
    )
}

export default FeedPage