import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';

//react-formの機能によって入力した文字が自動的にstoreに保存される。

class StreamCreate extends React.Component {

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }

    render(){
       return (
           <div>
               <h3>Create a Stream</h3>
               <StreamForm onSubmit={this.onSubmit}/>
           </div>
       )
    }
};



export default connect(null,{createStream})(StreamCreate);