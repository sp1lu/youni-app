/** Types */
import type { WpPage } from './wp-page.interface'

/** Methods */
export function wpPageConverter(data: any): WpPage {
    if (!('id' in data)) throw new Error(`Campo 'id' mancante nella pagina`);

    return {
        id: data['id'],
        img: searchThumbnailImg(data),
        title: ('title' in data && 'rendered' in data['title']) ? data['title']['rendered'] : '',
        url: ('link' in data) ? data['link'] : ''
    }
}

function searchThumbnailImg(page: any): string {
    if (!('_embedded' in page) || !('wp:featuredmedia' in page['_embedded']) || !Array.isArray(page['_embedded']['wp:featuredmedia']) || page['_embedded']['wp:featuredmedia'].length === 0) return '';
    const firstElement: Record<any, any> = page['_embedded']['wp:featuredmedia'][0];
    if (!('source_url' in firstElement) || typeof firstElement['source_url'] !== 'string') return '';
    return firstElement['source_url'];
}