import React, { useState ,useEffect, Fragment} from "react";
import axios  from "axios";
import Forbidden from "./Forbidden";
import { toast } from "react-toastify";
import { useHistory ,useParams } from "react-router-dom";

 const  EmailVerify =()=>{
    const history = useHistory();
    const [validUrl,setValidUrl] = useState(false);
    const param =useParams();
    useEffect(() => {
		const verifyEmailUrl = async () => {
			try {
				const url = `http://localhost:4000/api/v1/${param.id}/verify/${param.token}`;
        console.log("url:",url);
				const { data } = await axios.get(url);
				console.log(data);
				setValidUrl(true);
			} catch (error) {
				console.log(error);
				setValidUrl(false);
			}
		};
		verifyEmailUrl();
	}, [param]);

    useEffect(()=>{
        if(validUrl){
          toast.success("Successfully Registered 😃")
          history.push("/user/login");
        }
    },
    [validUrl])

    return (
        <Forbidden></Forbidden>
    )
}

export default EmailVerify;
