import { useState } from 'react';
import electricity from '../components/electricity.json';

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

function MyForm() {
    const [addressError, setAddressError] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [emailError, setEmailError] = useState<string>('')

    const json = JSON.stringify(electricity);
    const fullJson = JSON.parse(json);

    function validateAnswer(submit:any){
        submit.preventDefault();

        const form = submit.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        for (let index = 0; index < 3; index++) {
            const formJsonName = fullJson.fields[index].name ?? fullJson.fields[index].fieldName
            validateUserInput(formJsonName, formJson[formJsonName])
        }


        
    }

    function validateUserInput(field:string, userInput:any){
        switch(field){
            case "property_type":
                break;
            case "address_street_name":
                const re = /[a-zA-ZæøåÆØÅ]+( )\d/
                const check = re.test(userInput);
                console.log(userInput);
                if(!check){
                    setAddressError('Does not contain an address with number or contain special characters')
                }
                else{setAddressError('')}
                break;
            case "name":
                const reName = /^[a-zA-Z ]+$/
                const checkName = reName.test(userInput)
                console.log(userInput);
                if(!checkName){
                    setNameError('Name must only contain characters')
                }
                else{setNameError('')}
                break;

            default:
                break;
        }
    }

    function generateFields(field:fieldVariables){
        if(field.type == 'select'){
            return <div>
                <label key={field.label}>{field.label}: 
                <select name={field.name || field.fieldName} required={field.required} key={field.name}>
                    {field.options && field.options.map((option:optionVariables) => <option key={option.value} value={option.value}>{option.value}</option>)}
                </select>
                </label>
            </div>
        }
        else{
            return <div><label key={field.label}>{field.label}: <input type={field.type} name={field.name ?? field.fieldName} required={field.required} /></label></div>
        }
    }
    return(
    <div>
        <form onSubmit={validateAnswer}>
        <div>{fullJson.title}</div>
        {fullJson.fields.map((field:fieldVariables) => 
        <div key={field.name || field.fieldName}>{generateFields(field)}</div>
    )}
        <button type='submit'> Send in</button>
        </form>
        {addressError && <div>{addressError}<br /></div>}
        {nameError && <div>{nameError}<br /></div>}
    </div>
)
}

export default MyForm;