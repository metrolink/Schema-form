import { useState } from 'react';
import electricity from '../components/electricity.json';
import { Fields } from './field'; 
import './form.css'



function MyForm() {
    const [addressError, setAddressError] = useState<string[]>([])
    let errorArr:string[] = []

    const json = JSON.stringify(electricity);
    const fullJson = JSON.parse(json);

    function validateAnswer(submit:any){
        submit.preventDefault();

        const form = submit.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        for (let index = 0; index < fullJson.fields.length; index++) {
            const formJsonName = fullJson.fields[index].name ?? fullJson.fields[index].fieldName;
            validateUserInput(formJsonName, formJson[formJsonName]);
            console.log(formJson[formJsonName])
        }
        setAddressError(errorArr);


        
    }

    function validateUserInput(field:string, userInput:any){
        switch(field){
            case "address_street_name":
                const addressRegEx = /[a-zA-ZæøåÆØÅ]+( )\d/;
                const checkAddress = addressRegEx.test(userInput);
                if(!checkAddress){
                    errorArr.push('Address does not contain a number or uses special characters');
                }
                else{}
                break;
            case "name":
                const nameRegEx = /^[a-zA-ZæøåÆØÅ ]+$/;
                const checkName = nameRegEx.test(userInput);
                if(!checkName){
                    errorArr.push('Name must only contain characters');
                }
                else{}
                break;

            case "property_type":
                break;
            case "email":
                //email is already natively supported
                break;

            default:
                errorArr.push(field + " is not an accepted JSON field name");
                break;
        }
    }

    
    return(
    <div>
        <form onSubmit={validateAnswer}>
        <h1 className='title'>{fullJson.title}</h1>
        <div className='flex'>
        {fullJson.fields.map((field:any) => 
        <Fields key={field.name ?? field.fieldName} label={field.label} type={field.type} name={field.name ?? field.fieldName} options={field.options} required={field.required} />
    )}
        </div>
        <br/>
        <button className='btn' type='submit'>Finn strømavtale</button>
        </form>
        <div>{addressError.map(errors => <div className='error'>{errors}<br/></div>)}<br /></div>
    </div>
)
}

export default MyForm;