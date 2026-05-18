/** Types */
import { wpPageConverter, type WpPage } from '../types'

/** Methods */
export async function getAllWpPages(url: string): Promise<WpPage[]> {    
    return fetch(`${url}/wp-json/wp/v2/pages?_embed&per_page=100`)
        .then((res: Response) => {
            if (!res.ok) throw new Error(`Errore nel recupero delle pagine.`);
            try {
                return res.json();
            } catch (err: unknown) {
                throw new Error(err instanceof Error ? err.message : `Errore nel recupero delle pagine.`);
            }
        })
        .then((data: any) => {
            if (!Array.isArray(data)) throw new Error(`Errore nel recupero dei post.`);
            console.log(data);                        
            return data.map((d: any) => wpPageConverter(d));
        })
        .catch((err: unknown) => {
            throw new Error(err instanceof Error ? err.message : `Errore sconosciuto nel recupero dei post.`);
        })
}