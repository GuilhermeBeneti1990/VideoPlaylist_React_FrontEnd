import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import Home from '../components/home/Home'
import VideoCrud from '../components/video/VideoCrud';

export default props =>
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/videos' component={VideoCrud} />
        <Redirect from='*' to='/' />
    </Switch>