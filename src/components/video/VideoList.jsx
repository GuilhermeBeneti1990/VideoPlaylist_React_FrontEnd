import React, { Component } from 'react'
import axios from 'axios'
import ReactPlayer from 'react-player'
import Modal from 'react-modal'

const initialState = {
    list: [],
    modalIsOpen: false,
    video: ''
}

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  }

Modal.setAppElement(document.getElementById('root'))

// Local: http://localhost:3001/videos
const baseUrl = 'https://videoplaylist-b.herokuapp.com/'

export default class VideoList extends Component {

    constructor() {
        super();
     
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
      }
     
      openModal(video) {
        this.setState({modalIsOpen: true, video});
      }
     
      closeModal() {
        this.setState({modalIsOpen: false});
      }

    state = {...initialState}

    componentWillMount() {
        axios(baseUrl).then(resp => {
            this.setState({ list: resp.data })
            const listVideoURL = resp.data.map(v => v.videoURL)
            this.setState({ listURL: listVideoURL})
        })
    }

    getUpdatedList(video, add = true) {
        const list = this.state.list.filter(v => v.id !== video.id)
        if(add) list.unshift(video)
        return list
    }

    remove(user) {
        axios.delete(`${baseUrl}/${user.id}`).then(resp => {
            const list = this.getUpdatedList(user, false)
            this.setState({ list })
        })
        window.location.reload()
    }

    renderTable() {
        return(
            <table className="table table-striped table-hover mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th className='text-center'>Click to play</th>
                        <th className='text-center'>Artist</th>
                        <th className='text-center'>Title</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows() {
        return this.state.list.map(video => {
            return (
                <tr key={video.id}>
                    <td className='text-center'><button className='fa fa-play-circle' onClick={() => this.openModal(video.videoURL)}></button></td>
                    <td className='text-center'>{video.artist}</td>
                    <td className='text-center'>{video.title}</td>
                    <td className='text-center'>
                        <button className="btn btn-danger ml-2" onClick={ () => { if (window.confirm('Remove from playlist?')) this.remove(video) }}><i className="fa fa-trash"></i></button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <React.Fragment>
                {this.renderTable()}
                <div>
                    <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Video"
                    >
                    <ReactPlayer className='react-player' playing url={this.state.video} controls />
                    </Modal>
                </div>
            </React.Fragment>
        )
    }
}