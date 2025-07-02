import './field.css'

type fieldVariables = {
    label: string,
    type: string,
    name: string,
    options?: optionVariables[],
    required?:boolean,
}

type optionVariables = {
    value: string
}


export function Fields(field:fieldVariables){
    if(field.label && field.type && field.name){
        if(field.type == 'select'){
            return  <div className='field'>
                        <label>{field.label}: &nbsp;</label>
                        <select name={field.name} required={field.required}>
                            {field.options && field.options.map((option:optionVariables) => 
                                <option key={option.value} value={option.value}>{option.value}</option>
                            )}
                        </select>
                    </div>
        }
        else{
            return <div className='field'>
                        <label>{field.label}: &nbsp; </label>
                        <input type={field.type} name={field.name} required={field.required} />
                    </div>
        }
    }
    else{
        return <div className='error'>Error in JSON object {field.label ?? field.name}</div>
    }
    }