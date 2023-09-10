import * as React from 'react';
import AuthContext from '../context/authcontext';

export const ConnectPage = () => {
    const { user } = React.useContext(AuthContext);
    console.log(user);
    
    return <div>connection page</div>
}

export default ConnectPage;


