/** Types */
import type { Post } from './post.interface'

/** Methods */
export function postConverter(data: any): Post {
    if (!('id' in data)) throw new Error(`Campo 'id' mancante nel post`);

    return {
        id: `post-${data['id']}`,
        img: '',
        title: ('title' in data && 'rendered' in data['title']) ? data['title']['rendered'] : '',
        url: ('link' in data) ? data['link'] : ''
    }
}