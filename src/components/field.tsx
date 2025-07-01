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
            return <label>{field.label}: 
                        <select name={field.name} required={field.required} >
                            {field.options && field.options.map((option:optionVariables) => <option key={option.value} value={option.value}>{option.value}</option>)}
                        </select>
                    </label>
        }
        else{
            return <div><label>{field.label}: <input type={field.type} name={field.name} required={field.required} /></label></div>
        }
    }
    else{
        return <div>Error in JSON object</div>
    }
    }