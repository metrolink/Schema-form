import electricity from '../components/electricity.json';

function MyForm() {

    const json = JSON.stringify(electricity);
    const fullJson = JSON.parse(json);

    function logAnswer(submit){
        const form = submit.get("property_type")
        console.log(form)
    }
    return(
    <div>
        <form action={logAnswer}>
        <h1>{fullJson.title}</h1>
        {fullJson.fields.map((field) => <div><label>{field.label}</label><input type={field.type} name={field.name} required={field.required}></input></div>)}
        <button type='submit'> a</button>
        </form>
    </div>
)
}

export default MyForm;