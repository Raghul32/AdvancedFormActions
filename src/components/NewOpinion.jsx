import { useActionState,use } from "react";
import { Submit } from "./Submit";
import { OpinionsContext} from "../store/opinions-context";


export function NewOpinion() {

  async function shareOpinion(prevFormState,formData){

    const userName = formData.get('userName');
    const title = formData.get('title');
    const body = formData.get('body');

    let errors =[];

    if(!userName){
      errors.push("Username is should not be empty")
    }
    console.log(errors);

    await addOpinion({title, body, userName});

    if(errors.length > 0){
      return{
        errors,
        enteredValues : {
          userName,
          title,
          body
        }
      }
    }

    console.log("enteredValues: " , userName,title,body);

    return {errors : null,
      enteredValues : {
        userName,
        title,
        body
      }
    }

    
  }

  const [enteredData, formAction] = useActionState(shareOpinion, {
    errors : null
  })

  const {addOpinion} = use(OpinionsContext);


  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={enteredData.enteredValues?.userName}/>
          </p>
          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5}></textarea>
        </p>
        {enteredData.errors && <ul className="errors">{enteredData.errors.map((error)=>(
          <li key={error}>{error}</li>
        ))}</ul>}

        <Submit />

      </form>
    </div>
  );
}
