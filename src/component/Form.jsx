import { useEffect, useState } from "react"
import { postData, updateData } from "../api/PostApi";

export const Form = ({data, setData, updatedDataApi, setUpdateDataApi}) => {
    const [addData, setAddData] = useState({
        title:"",
        body:"",
    });

     // ***********************
    // const obj1 ={} 
    // Object.keys(obj1) // ans will be [] erray .length will be 0 ;

    // const obj ={
    //     title:"",
    //     body:"",
    // }
    // Object.keys( obj) // ans will be nomeric 2

    let isEmpty = Object.keys(updatedDataApi).length === 0;
    // console.log("TruFal Aanand ", isEmpty);
    // console.log("Data Aanand ", Object.keys(updatedDataApi).length);


  useEffect(()=>{
        updatedDataApi && setAddData({
            title: updatedDataApi.title || "",
            body: updatedDataApi.body || "",
        }) 
    }, [updatedDataApi]);




    const handleInputChange = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setAddData((prev) => {
            // console.log(prev);            
            return {
                // ...prev, name: value // add new data in obj. key is name and value is value data.
                ...prev, [name]: value,
            }
        });        
    };

    const addPostData = async () =>{
        try {
            const res = await postData(addData);
        // console.log("My Res: ", res);
        if(res.status === 201){
            setData([... data, res.data]);
            setAddData({title:"", body:""});//empety input field
        };
        } catch (error) {
            console.log(error);            
        }        
    }


// for updated function
    const updatePostData = async ()=>{
        try {
            const res = await updateData(updatedDataApi.id, addData);
            if(res.status === 200){
                setData((prev)=>{
                    // console.log(prev);                    
                return prev.map((curElem)=>{
                    return curElem.id === res.data.id ? res.data : curElem;
                });
            });
            setAddData({title:"", body:""});//empety input field
            setUpdateDataApi({}); // for chagne edt btn text
            };
          
        } catch (error) {
            console.log(error);            
        } 
    }

    // form submission
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        // console.log(action);
        if(action==="Add"){
            addPostData();
        }else if(action === "Edit"){
            updatePostData();            
        }
        
    };

  
   
    



    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="formGroup">
                    <label htmlFor="title"></label>
                    <input type="text" id="title" name="title" placeholder="Add title" autoComplete='off' value={addData.title} onChange={handleInputChange} />
                </div>
                <div className="formGroup">
                    <label htmlFor="body"></label>
                    <input type="text" id="body" name="body" placeholder="add body" autoComplete='off' value={addData.body} onChange={handleInputChange} />
                </div>
                <div>
                    <button type="submit" value={isEmpty ? "Add" : "Edit"}>{isEmpty ? "Add" : "Edit"}</button>
                </div>
            </form>
        </>
    )
}