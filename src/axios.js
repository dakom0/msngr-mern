import axios from 'axios'

const instance = axios.create({
     baseURL: "https://msngr-fb.herokuapp.com"
})

export default instance; 
