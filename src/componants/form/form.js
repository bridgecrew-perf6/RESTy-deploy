import './form.css';

// const Form = (props) => {
    
//     return (
//         <div >
//             <form className='form' >
//                 <label>
//                     URL:
//                     <input id='inputform' type="text" placeholder='http://api.url.here/' name="URL" onChange={props.onSubmit}/>

//                 </label>
//                 <button id="btn" type="submit" value="go" onClick={props.onSubmit} >GO</button>
//             </form>
//             <div className='tt'>
//             <button id='btn' type="submit" value="get" onClick={props.changeMethode} >get</button>
//             <button id='btn' type="submit" value="post" onClick={props.changeMethode} >post</button>
//             <button id='btn' type="submit" value="put" onClick={props.changeMethode} >put</button>
//             <button id='btn' type="submit" value="delete" onClick={props.changeMethode}>delete</button>


//             <textarea id="textArea" name="w3review" rows="4" cols="50"></textarea>
//             </div>
//             <hr/>
//         </div>
//         )

// }
// export default Form;
import './form.css';
export default function Form(props) {
    
    return (
        <div  >
            <form className="form" >
                <input id="inputform" type="text" name="URL"  onChange={props.urlHandel} placeholder='http://api.url.here..............' />
                <button id="btn" type="submit" value="go" onClick={props.onSubmit} >GO</button>
                <div className="btn">
                    <button id="btn" type="submit" value="Get" onClick={props.changeMethod} >Get</button>
                    <button id="btn" type="submit" value="Post" onClick={props.changeMethod}>Post</button>
                    <button id="btn" type="submit" value="Put" onClick={props.changeMethod}>Put</button>
                    <button  id="btn" type="submit" value="Delete" onClick={props.changeMethod} >Delete</button>
                    <textarea id="textArea" name="w3review" rows="4" cols="50" onChange={props.handleBody} placeholder="Write  json {}" />
                </div>
            </form>
        </div>
    )
}