import React from 'react';
import { Router, Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import history from './history';
import TwitterFollowers from './containers/TwitterFollowers';
import TwitterHome from './containers/TwitterHome';
import LoginRegister from './containers/LoginRegister';
import PrimarySearchAppBar from './containers/Appbar';



const Main = withRouter(({ location }) => {
    return (
        <div>
            {
                location.pathname != '/login' && <PrimarySearchAppBar />
            }
            <Router history={history}>
                <Switch>
                    <Route exact path='/' component={TwitterHome} />
                    <Route path='/twitter' component={TwitterHome} />
                    <Route path='/TwitterFollowers' component={TwitterFollowers} />
                    <Route path='/login' component={LoginRegister} />
                </Switch>
            </Router>
        </div>
    )
})

const Root = () => (
    <BrowserRouter>
        <Main />
    </BrowserRouter>
)


export default Root;
