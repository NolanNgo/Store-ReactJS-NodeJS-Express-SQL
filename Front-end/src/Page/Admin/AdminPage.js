import SlideMenu from "./SlideMenu";
import "./AdminPage.css";
import ContrainerAdmin from "./ContainerAdmin";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function AdminPage()
{
    let navigate = useNavigate();
    useEffect(() => {
        if( localStorage.getItem("jwtoken") === null)
        {
            navigate('/signin');
        }
        else{
            const user = JSON.parse(localStorage.getItem("user"));
            if(user.role === 1)
            {
                navigate('/');
            }
        }
        return () => {};
      }, [navigate]);
    return(
        <div>
            <SlideMenu/>
            <ContrainerAdmin/>
        </div>
    )
}
export default AdminPage;