type fieldVariables = {
    label: string,
    type: string,
    name?: string,
    fieldName?: string,
    options?: optionVariables[],
    required?:boolean,
}

type optionVariables = {
    value: string
}


export function Fields(field:fieldVariables){
        if(field.type == 'select'){
            return <label>{field.label}: 
                        <select name={field.name || field.fieldName} required={field.required} >
                            {field.options && field.options.map((option:optionVariables) => <option key={option.value} value={option.value}>{option.value}</option>)}
                        </select>
                    </label>
        }
        else{
            return <div><label>{field.label}: <input type={field.type} name={field.name ?? field.fieldName} required={field.required} /></label></div>
        }
    }