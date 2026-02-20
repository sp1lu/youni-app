/** Types */
import { postConverter, type Post } from '../types'

/** Methods */
export async function getAllPosts(url: string): Promise<Post[]> {
    return fetch(`${url}/wp-json/wp/v2/posts?_embed`)
        .then((res: Response) => {
            if (!res.ok) throw new Error(`Errore nel recupero dei post.`);
            try {
                return res.json();
            } catch (err: unknown) {
                throw new Error(err instanceof Error ? err.message : `Errore nel recupero dei post.`);
            }
        })
        .then((data: any) => {
            if (!Array.isArray(data)) throw new Error(`Errore nel recupero dei post.`);
            return data.map((d: any) => postConverter(d));
        })
        .catch((err: unknown) => {
            throw new Error(err instanceof Error ? err.message : `Errore sconosciuto nel recupero dei post.`);            
        })
}