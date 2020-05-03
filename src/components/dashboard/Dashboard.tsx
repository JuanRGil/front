import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Dashboard = (props : any) => {

    const [user, setUser] = useState({} as any);
    useEffect(() => {
        const userUrl = "http://localhost:8080/api/auth/user";
        axios.get(userUrl).then((response : any) => {
            setUser(response.data);
        })
    }, []);

    return(
        <React.Fragment>
            <div>Hello {user.name} {user.surname}</div>
        </React.Fragment>
    );
}
export default Dashboard;