import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import {fetchStream,editStream} from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component{

    componentDidMount(){
        //storeに選択されたIDの情報を保存している
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues =>{
        this.props.editStream(this.props.match.params.id,formValues);
    }
    render(){

        if (!this.props.stream){
            return <div>Loading...</div>
        }

        console.log(this.props);
        return (
        <div>
            <h3>Edit a Stream</h3>
            {/* initialValues={this.props.stream}これだけでも実装可能。しかし、使わない値まで取得してしまう。だから以下のようにtitleとdescriptionだけ取得するように実装している */}
            <StreamForm initialValues={_.pick(this.props.stream,'title','description')} onSubmit={this.onSubmit}/>
        </div>
        )
    }
};

//ownPropsは親コンポーネントから引き継がれたpropsが入っている
//stateはstoreのstateが入っている
const mapStateToProps = (state,ownProps) => {
    return {stream:state.streams[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchStream,editStream})(StreamEdit);