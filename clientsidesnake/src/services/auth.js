import axios from 'axios';

const resetTest=(client_secret,lang,source,data)=>{
    return axios.post('https://api.hackerearth.com/code/compile/',{
        client_secret: 'f5da19c73f63b1cf9544bfa434d7f997f180ebc5',
        async: 0,
        source: source,
        lang: "PYTHON",
        time_limit: 5,
        memory_limit: 262144
    }).then(res=>{
        console.log(res.data);
        return res.data;
    })
    .catch(console.log)
}

const login=(email, password)=>{
    return axios.post("http://localhost:8000/login",{
            email,
            password
    })
    .then(res=>{
        res.data.status && setToken(res.data.token);
        return res.data;
    })

}
const signup=({
    name ,
    email ,
    password 
})=>{
    return axios.post('http://localhost:8000/signup',{
        name ,
        email ,
        password 
    })
    .then(res=>{
        return res.data;
    })
  }

const setToken = (token) =>{
    localStorage.setItem("token",JSON.stringify(token));
}

const getToken = ()=>{
    return JSON.parse(localStorage.getItem("token"));
}


export {
    login,
    signup,
    setToken,
    getToken,
    resetTest
}