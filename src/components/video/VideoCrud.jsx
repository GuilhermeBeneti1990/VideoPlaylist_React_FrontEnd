import React, { Component } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'

import Main from '../template/Main'
import VideoForm from './VideoForm'
import VideoList from './VideoList'

import './VideoCrud.css'

const headerProps = {
    icon: 'play-circle',
    title: 'Videos',
    subtitle: 'Playlist'
}

// Local: http://localhost:3001/videos
const baseUrl = 'https://videoplaylist-b.herokuapp.com/'

const initialState = {
    list: [],
    listURL: [],
    currentVideo: '',
    index: 1
}

export default class VideoCrud extends Component {

    componentWillMount() {
        axios(baseUrl).then(resp => {
            const listVideoURL = resp.data.map(v => v.videoURL)
            this.setState({ listURL: listVideoURL})
        })
    }
    
    state = { ...initialState }

    renderVideo(video) {
        const first = false
        const index = this.state.index
        return (
            <div>
                <ReactPlayer className='player react-player' url={video} playing controls onEnded={() => this.showVideo(video, first, index)} />
                <div className="control">
                <button className="fa fa-step-backward btn btn-primary" onClick={() => this.showPreviousVideo(video, first, index)}></button>
                <button className="fa fa-step-forward btn btn-primary" onClick={() => this.showVideo(video, first, index)}></button>
                </div>
            </div>
        )
    }

    showPreviousVideo(video, first, index) {
        const listUrl = this.state.listURL
        const length = listUrl.length
        if(first === false) {
            for(let i = index; i < length; i--) {
                if (video === listUrl[i]) {
                    i--
                    index--
                }
                if(i === length) {
                    this.setState({ currentVideo: listUrl[length], index: i })
                    this.renderVideo(this.state.currentVideo)
                    return false
                } else {
                    this.setState({ currentVideo: listUrl[i], index: index })
                    this.renderVideo(this.state.currentVideo)
                    return false
                }
            }
        } else {
            this.setState({ currentVideo: video, index: index})
            this.renderVideo(this.state.currentVideo)
        }
    }

    showVideo(video, first, index) {
        const listUrl = this.state.listURL
        const length = listUrl.length
        if(first === false) {
            for(let i = index; i < length; i++) {
                if (video === listUrl[i]) {
                    i++
                    index++
                }
                if(i === length) {
                    this.setState({ currentVideo: listUrl[0], index: 1 })
                    this.renderVideo(this.state.currentVideo)
                    return false
                } else {
                    this.setState({ currentVideo: listUrl[i], index: index })
                    this.renderVideo(this.state.currentVideo)
                    return false
                }
            }
        } else {
            this.setState({ currentVideo: video, index: index})
            this.renderVideo(this.state.currentVideo)
        }
    }

    render() {
        const first = true
        const index = 1
        return (
            <Main {...headerProps}>
                <VideoForm />
                <div className='player player-wrapper'>
                    {this.renderVideo(this.state.currentVideo)}
                </div>
                <div className='playlistButton'>
                    <button className='btn btn-primary' onClick={() => this.showVideo(this.state.listURL[0], first, index)}>Play All</button>
                </div>
                <VideoList />
            </Main>
        )
    }
}