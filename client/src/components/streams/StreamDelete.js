import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Modal from '../Model';
import history from '../../history';
import {fetchStream,deleteStream} from '../../actions';

class StreamDelete extends React.Component {
    componentDidMount(){
        console.log(this.props.match.params.id)
        this.props.fetchStream(this.props.match.params.id);
    }

    renderContent(){
        if(!this.props.stream){
            return 'Are you sure you want to delete this stream?';
        }
        return `Are you sure you wanto to delete the stream with title:${this.props.stream.title}`
    }

    renderActions(){
        const id = this.props.match.params.id;
        console.log(id)
        return (
            //React.Fragmentはプラウザに出力されないノード。divなどを使うと要素が崩れることがある。
            //<></>へ代替可能
            <React.Fragment>
                <button onClick={()=>this.props.deleteStream(id)} className="ui button negative">Delete</button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        )
    }

    render(){
       
        return (
            <Modal　
            title="Delete Stream"
            content={this.renderContent()}
            actions={this.renderActions()}
            onDismiss={()=> history.push('/')}
            />
    
        )
    }
};

const mapStateToProps = (state, ownProps) =>{
    return {stream:state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps,{fetchStream,deleteStream})(StreamDelete);