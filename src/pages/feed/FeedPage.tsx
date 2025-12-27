/** Dependencies */
import { useEffect, useState } from 'react'
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

/** Componenents */
import { Card, Drawer, Navbar, Slider } from '../../global/components'

/** Style */
import './FeedPage.scss'

/** Component */
function FeedPage() {
    /** Context */
    const { user, logout } = useAuth();

    /** State */
    const [cities, setCities] = useState<City[]>([]);
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [eventCategories, setEventCategories] = useState<EventCategory[]>([]);
    const [discountCategories, setDiscountCategories] = useState<DiscountCategory[]>([]);

    /** Effects */
    useEffect(() => {
        getAllCities()
            .then((cities: City[]) => setCities(cities))
            .catch((err: unknown) => err)
    }, [])

    useEffect(() => {
        getAllEvents()
            .then((events: AppEvent[]) => {
                setEvents(events)
            })
            .catch((err: unknown) => err)
    }, []);

    useEffect(() => {
        getAllDiscounts()
            .then((discounts: Discount[]) => setDiscounts(discounts))
            .catch((err: unknown) => err)
    }, []);

    useEffect(() => {
        if (!user || cities.length === 0) return;
        const city: City | undefined = cities.find((c) => c.id === user.city);
        if (!city) return;

        getAllPosts(city.url)
            .then((posts: Post[]) => setPosts(posts))
            .catch((err: unknown) => err)
    }, [cities, user]);

    useEffect(() => {
        getAllEventCategories()
            .then((categories: EventCategory[]) => setEventCategories(categories))
            .catch((err: unknown) => err)
    }, [])

    useEffect(() => {
        getAllDiscountCategories()
            .then((categories: DiscountCategory[]) => setDiscountCategories(categories))
            .catch((err: unknown) => err)
    }, [])

    /** Node */
    return (
        <div className='page feed-page'>
            <Drawer toggleIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/drag_handle_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} closeIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/close_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`}>
                <Navbar isLogged={user ? true : false} userRole={user ? user.role : 'USER'} logOutIcon={`${import.meta.env.VITE_PUBLIC_URL}/icons/logout_24dp_000000_FILL0_wght400_GRAD0_opsz24.svg`} onLogout={logout} />
            </Drawer>

            <p className='title-s feed__title'>Ciao 👋{user ? `, ${user.firstName}` : ''}!</p>

            <div className='feed__section'>
                <NavLink to='/events' className='subtitle-xs feed__section-title'>Eventi<span className='title-icon'></span></NavLink>
                <Slider>
                    {
                        events.map((e: AppEvent) => (
                            <Card key={e.id}
                                uid={e.id}
                                img={e.img}
                                text={e.title}
                                desc={formatDate(e.date)}
                                path='discounts'
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

            <div className='feed__section'>
                <NavLink to='/' className='subtitle-xs feed__section-title'>Convenzioni<span className='title-icon'></span></NavLink>
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

            <div className='feed__section'>
                <NavLink to='/' className='subtitle-xs feed__section-title'>News<span className='title-icon'></span></NavLink>
                <Slider>
                    {
                        posts.map((p: Post) => (
                            <Card key={p.id} uid={p.id} img={p.img} text={p.title} desc='' url={p.url} />
                        ))
                    }
                </Slider>
            </div>
        </div>
    )
}

export default FeedPage