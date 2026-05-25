/** Types */
import type { Post } from './post.interface'

/** Methods */
export function postConverter(data: any): Post {
    if (!('id' in data)) throw new Error(`Campo 'id' mancante nel post`);

    return {
        id: `post-${data['id']}`,
        img: searchThumbnailImg(data),
        title: ('title' in data && 'rendered' in data['title']) ? decodeHtml(data['title']['rendered']) : '',
        url: ('link' in data) ? data['link'] : '',
        categoryIds: 'categories' in data && Array.isArray(data['categories']) && data['categories'].every((c) => typeof c === 'number') ? [...data['categories']] : []
    }
}

function searchThumbnailImg(post: any): string {
    if (!('_embedded' in post) || !('wp:featuredmedia' in post['_embedded']) || !Array.isArray(post['_embedded']['wp:featuredmedia']) || post['_embedded']['wp:featuredmedia'].length === 0) return '';
    const firstElement: Record<any, any> = post['_embedded']['wp:featuredmedia'][0];
    if (!('source_url' in firstElement) || typeof firstElement['source_url'] !== 'string') return '';
    return firstElement['source_url'];
}

function decodeHtml(str: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = str;
    return textarea.value;
}