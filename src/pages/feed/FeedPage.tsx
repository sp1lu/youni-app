/** Dependencies */
import { useEffect, useState } from 'react'

/** Services */
import { getAllEvents, type AppEvent } from '../../features/events'
import { getAllDiscounts, type Discount } from '../../features/discounts'
import { getAllPosts, type Post } from '../../features/posts'
import { getAllCities, type City } from '../../features/users'
import { formatDate } from '../../global/services'

/** Contexts */
import { useAuth } from '../../features/auth'
import { Card, Slider } from '../../global/components'

/** Style */
import './FeedPage.scss'

/** Component */
function FeedPage() {
    /** Context */
    const { user } = useAuth();

    /** State */
    const [cities, setCities] = useState<City[]>([]);
    const [events, setEvents] = useState<AppEvent[]>([]);
    const [discounts, setDiscounts] = useState<Discount[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);

    /** Effects */
    useEffect(() => {
        getAllCities()
            .then((cities: City[]) => setCities(cities))
            .catch((err: unknown) => err)
    }, [])

    useEffect(() => {
        getAllEvents()
            .then((events: AppEvent[]) => {
                console.log(events);                
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

    /** Node */
    return (
        <div className='page feed-page'>
            <p className='title-s'>Ciao 👋{user ? `, ${user.firstName}` : ''}!</p>

            <div>
                <p>Eventi</p>
                {/* <div className='list'> */}
                <Slider>
                    {
                        events.map((e: AppEvent) => (
                            <Card key={e.id} uid={e.id} img={e.img} text={e.title} desc={formatDate(e.date)} path='discounts' chip={e.categories[0] ?? undefined} />
                        ))
                    }
                </Slider>
                {/* </div> */}
            </div>

            <div>
                <p>Convenzioni</p>
                <div className='list'>
                    {
                        discounts.map((d: Discount) => (
                            <Card key={d.id} uid={d.id} img={d.img} text={d.title} desc={d.discount} backgroundColor={d.color} objectFit='contain' path='discounts' chip={d.categories[0] ?? undefined} />
                        ))
                    }
                </div>
            </div>

            <div>
                <p>News</p>
                <div className='list'>
                    {
                        posts.map((p: Post) => (
                            <Card key={p.id} uid={p.id} img={p.img} text={p.title} desc='' url={p.url} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default FeedPage