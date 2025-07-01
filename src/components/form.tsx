import { useState } from 'react';
import electricity from '../components/electricity.json';
import { Fields } from './field'; 
import './form.css'



function MyForm() {
    const [addressError, setAddressError] = useState<string[]>([])
    const [submitSuccessful, setSubmitSuccessful] = useState<boolean>(false)
    let errorArr:string[] = []

    const json = JSON.stringify(electricity);
    const fullJson = JSON.parse(json);

    function handleSubmission(submit:any){
        setSubmitSuccessful(false);
        submit.preventDefault();

        const form = submit.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());

        for (let index = 0; index < fullJson.fields.length; index++) {
            const formJsonName = fullJson.fields[index].name ?? fullJson.fields[index].fieldName;
            validateUserInput(formJsonName, formJson[formJsonName]);
            console.log(formJson[formJsonName])
        }

        if(errorArr.length == 0){
            setSubmitSuccessful(true);
        }
        else{}
        setAddressError(errorArr);


        
    }

    function validateUserInput(fieldName:string, userInput:any){
        switch(fieldName){
            case "address_street_name":
                const addressRegEx = /[a-zA-ZæøåÆØÅ]+( )\d/;
                const checkAddress = addressRegEx.test(userInput);
                if(!checkAddress){
                    errorArr.push('Adresse må bestå av kun bokstaver og minst et tall');
                }
                else{}
                break;
            case "name":
                const nameRegEx = /^[a-zA-ZæøåÆØÅ ]+$/;
                const checkName = nameRegEx.test(userInput);
                if(!checkName){
                    errorArr.push('Navn kan kun inneholde bokstaver');
                }
                else{}
                break;
            case "dato":
                const todayDate = new Date().toJSON().slice(0,10);
                if(userInput < todayDate)
                    errorArr.push("Du kan ikke starte avtalen før idag")
                break;

            case "property_type":
                break;
            case "email":
                //email is already natively supported
                break;

            default:
                errorArr.push(fieldName + " er ikke et godtatt JSON felt");
                break;
        }
    }

    
    return(
    <div>
        <form onSubmit={handleSubmission} className='form'>
            <h1 className='title'>{fullJson.title}</h1>
            <div>
                {fullJson.fields.map((field:any) => 
                    <Fields key={field.name ?? field.fieldName}
                            label={field.label} 
                            type={field.type} 
                            name={field.name ?? field.fieldName} 
                            options={field.options} 
                            required={field.required} />
                )}
            </div>
            <br/>
            <button className='btn' type='submit'>{fullJson.buttonText}</button>
        </form>
        <div>{addressError.map(errors => 
            <div className='error'>
                {errors}<br/>
                </div>
            )}
        </div>
        <div>{submitSuccessful && <div className='submitted'>Submitted!</div>}</div>
    </div>
)
}

export default MyForm;