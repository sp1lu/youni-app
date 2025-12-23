export function formatDate(date: Date) {
    const giorno = String(date.getDate()).padStart(2, '0');
    const mese = String(date.getMonth() + 1).padStart(2, '0');
    const anno = date.getFullYear();

    return `${giorno}/${mese}/${anno}`;
}