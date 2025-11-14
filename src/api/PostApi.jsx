import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
});

// get method (get and read)
export const getPost = ()=>{
    return api.get("/posts");
};

// Delete method (delete/remove)
export const deletePost = (id)=>{
    return api.delete(`/posts/${id}`);
    // console.log("Api Service ", id);    
};

// post method (Created)
export const postData = (post)=>{
    return api.post("/posts", post);
}

// put method / patech (updated)

export const updateData = (id, post) =>{
    return api.put(`/posts/${id}`, post)
}
