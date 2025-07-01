import { useState } from 'react';
import electricity from '../components/electricity.json';
import { Fields } from './field'; 



function MyForm() {
    const [addressError, setAddressError] = useState<string>('')
    const [nameError, setNameError] = useState<string>('')
    const [jsonError, setJsonError] = useState<string>('')
    //const [emailError, setEmailError] = useState<string>('')

    const json = JSON.stringify(electricity);
    const fullJson = JSON.parse(json);

    function validateAnswer(submit:any){
        submit.preventDefault();

        const form = submit.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        for (let index = 0; index < fullJson.fields.length; index++) {
            const formJsonName = fullJson.fields[index].name ?? fullJson.fields[index].fieldName
            validateUserInput(formJsonName, formJson[formJsonName])
            console.log(formJson[formJsonName])
        }


        
    }

    function validateUserInput(field:string, userInput:any){
        switch(field){
            case "address_street_name":
                const addressRegEx = /[a-zA-ZæøåÆØÅ]+( )\d/
                const checkAddress = addressRegEx.test(userInput);
                if(!checkAddress){
                    setAddressError('Does not contain an address with number or contain special characters')
                }
                else{setAddressError('')}
                break;
            case "name":
                const nameRegEx = /^[a-zA-ZæøåÆØÅ ]+$/
                const checkName = nameRegEx.test(userInput)
                if(!checkName){
                    setNameError('Name must only contain characters')
                }
                else{setNameError('')}
                break;

            case "property_type":
                break;
            case "email":
                break;

            default:
                setJsonError(field + " is not an accepted JSON field name")
                break;
        }
    }

    
    return(
    <div>
        <form onSubmit={validateAnswer}>
        <div>{fullJson.title}</div>
        {fullJson.fields.map((field:any) => 
        <Fields key={field.name ?? field.fieldName} label={field.label} type={field.type} name={field.name ?? field.fieldName} options={field.options} required={field.required} />
    )}
        <button type='submit'> Send in</button>
        </form>
        {jsonError}
        {addressError && <div>{addressError}<br /></div>}
        {nameError && <div>{nameError}<br /></div>}
    </div>
)
}

export default MyForm;