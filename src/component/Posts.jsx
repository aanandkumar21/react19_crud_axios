import { useEffect, useState } from "react";
import { deletePost, getPost } from "../api/PostApi";
import { Form } from "./Form";

export const Posts = () => {
    const [data, setData] = useState([]);
    const [updatedDataApi, setUpdateDataApi] = useState({});

    // console.log(getPost());

    const getPostData = async () => {
        const res = await getPost();
        console.log(res.data);
        setData(res.data)
    }

    useEffect(() => {
        getPostData();
    }, []);


    const handleDeleteItem = async (id) => {
        try {
            const res = await deletePost(id);
            // console.log(res);
            if (res.status === 200) {
                const newData = data.filter((curElem) => {
                    return curElem.id !== id;
                });
                setData(newData);
            } else {
                console.log("Failed to delete the Post", res.status);
            }
        } catch (error) {
            console.log(error);
        }

        // console.log(e.target);   
        // let targetElem = e.target; 
        // let deltItem = targetElem.parentNode; 
        // deltItem.remove(); 
        // console.log(deltItem);                 
    }

    // const handleUpdatedData = (curData)=>{
    //     // console.log(curData);
    //     setUpdateDataApi(curData);        
    // }
    const handleUpdatedData = (curData)=> setUpdateDataApi(curData); 
    // console.log("Aanand Data", updatedDataApi);
      

    return (
        <>
            <section className="formSec">
                <Form data={data} setData={setData} updatedDataApi={updatedDataApi} setUpdateDataApi={setUpdateDataApi} />
            </section>
            <section className="sectionBody">
            <h1>CRUD Opearation in React...</h1>
            <ol>
                {data.map((curElem) => {
                    const { body, id, title, userId } = curElem;
                    return (
                        <li key={curElem.id}>
                        <hr/>
                            <span>Id: {id}</span>
                            <h2>Title: {title}</h2>
                            <p>Body: {body}</p>
                            <button className="btnEdit" onClick={() => handleUpdatedData(curElem)}>Edit</button>
                            <button className="btnDel" onClick={() => handleDeleteItem(id)} >Delete</button>
                        </li>
                    )
                })}
            </ol>
        </section>
        </>
    )
}