export interface City {
    id: string,
    label: string,
    url: string,
    categoryId: number,
    pageIds: number[],
    links?: Map<string, string>
}