/** Types */
import type { WpPage } from './wp-page.interface'

/** Methods */
export function wpPageConverter(data: any): WpPage {
    if (!('id' in data)) throw new Error(`Campo 'id' mancante nella pagina`);

    return {
        id: data['id'],
        img: '',
        title: ('title' in data && 'rendered' in data['title']) ? data['title']['rendered'] : '',
        url: ('link' in data) ? data['link'] : ''
    }
}