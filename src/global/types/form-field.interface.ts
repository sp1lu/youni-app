export interface FormField {
    id: string,
    label: string,
    input: 'text' | 'select',
    desc?: string,
    isDisabled?: boolean
}