export interface Post {
    id: string,
    title: string;
    date: Date;
    url: string;
    img: string;
    categoryIds: number[];
}