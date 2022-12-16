import React  from "react";
import {Survey,Login} from '../Fronted/Components'
function Home(props){
    const {setIsLoggedIn} = props
    return(
        <div>
            <Survey setIsLoggedIn={setIsLoggedIn}  />
            {/* <Login /> */}

        </div>
    )
}
export default Home