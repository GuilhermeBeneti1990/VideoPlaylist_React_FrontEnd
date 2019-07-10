import React from 'react'

import './Home.css'
import logo from '../../assets/imgs/logo.png'

import Main from '../template/Main'

export default props =>
    <Main icon="home" title="Home" subtitle="Videos Playlist Test">
        <div className="home_title display-4">Thank you for the opportunity!</div>
        <hr />
        <p className="home_subtitle mb-4">Video Player - ReactJS</p>
        <div className="home_img">
            <img src={logo} alt="Logo"/>
        </div>
    </Main>