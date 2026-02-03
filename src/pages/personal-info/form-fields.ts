import type { FormField } from '../../global/types'

export const FORM_FIELDS: FormField[] = [
    {
        id: 'firstName',
        label: 'Nome',
        input: 'text',
        desc: 'Dicci come ti chiami'
    },
    {
        id: 'lastName',
        label: 'Cognome',
        input: 'text',
        desc: 'Dicci il tuo cognome'
    },
    {
        id: 'email',
        label: 'Indirizzo email',
        input: 'text',
        desc: 'Usa un indirizzo email a cui puoi sempre accedere facilmente. Non spammiamo, giurin giurello!',
        isDisabled: true
    },
    {
        id: 'city',
        label: 'In quale città studi?',
        input: 'select',
        desc: 'Scegli tra le città in cui siamo già arrivati. Questo ci consentirà di mostrarti solo convenzioni ed eventi della tua città!'
    }
];