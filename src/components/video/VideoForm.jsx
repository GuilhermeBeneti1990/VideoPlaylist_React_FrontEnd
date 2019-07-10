import React, { Component } from 'react'
import axios from 'axios'

const initialState = {
    video: { artist: '', title: '', videoURL: ''}
}

const baseUrl = 'http://localhost:3001/videos'

export default class VideoForm extends Component {

    state = { ...initialState }

    clear() {
        this.setState({ video: initialState.video })
    }

    save() {
        const video = this.state.video
        if (!video.artist || !video.title || !video.videoURL) {
            alert('Please, fill the form correctly')
            return
        }
        axios.post(baseUrl, video)
            .then(resp =>{
                this.setState({ video: initialState.video })
            })
        window.location.reload()
    }

    updateField(event) {
        const video = { ...this.state.video }
        video[event.target.name] = event.target.value
        this.setState({ video })
    }

    render() {
        return (
            <div className="form">
                <div className="row">
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Artist</label>
                            <input type="text" className="form-control" name="artist" value={this.state.video.artist} onChange={ e => this.updateField(e) } placeholder="Artist..."/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control" name="title" value={this.state.video.title} onChange={ e => this.updateField(e) } placeholder="Title..."/>
                        </div>
                    </div>
                    <div className="col-12 col-md-4">
                        <div className="form-group">
                            <label>Video URL</label>
                            <input type="text" className="form-control" name="videoURL" value={this.state.video.videoURL} onChange={ e => this.updateField(e) } placeholder="Video URL..."/>
                        </div>
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-12 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={ e => this.save(e) }>
                            Add to Playlist
                        </button>
                        <button className="btn btn-secondary ml-2" onClick={ e => this.clear(e) }>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )
    }
    
}