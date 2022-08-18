import React from 'react'
import Login from './pages/Login/login'
import Home from './pages/Home/home'
import routes from './routes/index'
import {Link,useRoutes} from 'react-router-dom'

import DescriptionWrapper from './common/descriptionWrapper/descriptionWrapper'

const App = (props) => {
  let [id, pageSize] = [props.id, props.pageSize].map(String)
  const element = useRoutes(routes)
  return (
    <>
    <Link to='/login'></Link>
    <Link to='/home'></Link>
    {/* <Login/>
    <Home/> */}
    {element}
      
    </>
  );
};

export default App;

