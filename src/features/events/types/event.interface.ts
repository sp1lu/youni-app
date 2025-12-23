export interface AppEvent {
    id: string,
    title: string,
    desc: string,
    img: string,
    date: Date,
    time: string,
    address: string,
    content: any,
    video: string,
    isFeatured: boolean,
    maxSeats: number,
    price: number,
    city: string,
    categories: string[]
}