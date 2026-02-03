/** Dependencies */
import { useState } from 'react'

/** Types */
interface InputAccordionProps {
    id: string,
    label: string,
    input: 'text' | 'select',
    value: string,
    onSave: (id: string, value: string) => void,
    desc?: string,
    options?: { id: string, label: string }[],
    isDisabled?: boolean
}

/** Style */
import './InputAccordion.scss'

/** Component */
function InputAccordion(props: InputAccordionProps) {
    const { id, label, value: initialValue, input, options, onSave, desc, isDisabled } = props;

    /** State */
    const [value, setValue] = useState(initialValue);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /** Methods */
    const onSaveClick = (id: string, value: string): void => {
        onSave(id, value);
        setIsOpen(false);
    }

    /** Node */
    return (
        <div className='input-accordion'>
            <div className='input-accordion__first-line'>
                <label className='input-accordion__label'>{label}</label>
                <details className='input-accordion__details' name='personal-info' open={isOpen} aria-disabled={isDisabled} onToggle={(e) => setIsOpen(e.currentTarget.open)}>
                    <summary className='input-accordion__summary'>{isOpen ? 'Annulla' : 'Modifica'}</summary>
                    <div className='input-accordion__content'>
                        {
                            desc && <p className='input-accordion__desc'>{desc}</p>
                        }
                        <div className='input-accordion__form'>
                            {
                                input === 'select' ?
                                    <select className='input-accordion__input' value={value} onChange={(e) => setValue(e.target.value)}>
                                        {
                                            options ?
                                                options.map((o) => (
                                                    <option value={o.id} key={o.id}>{o.label}</option>
                                                )) :
                                                ''
                                        }
                                    </select> :
                                    <input type='text' className='input-accordion__input' value={value} onChange={(e) => setValue(e.target.value)} />
                            }
                            <button type='button' className='alt input-accordion__btn' onClick={() => onSaveClick(id, value)}>Salva</button>
                        </div>
                    </div>
                </details>
            </div>
            {
                !isOpen && <p className='input-accordion__value'>{options ? options.find(o => o.id === value)?.label : value}</p>

            }
        </div>
    )
}

export default InputAccordion