import React from 'react';
import {Router,Route,Switch} from 'react-router-dom';
import StreamCreate from './streams/StreamCreate';
import StreamEdit from './streams/StreamEdit';
import StreamDelete from './streams/StreamDelete';
import StreamList from './streams/StreamList';
import StreamShow from './streams/StreamShow';
import Header from './Header';
import history from '../history';




const App = () => {
    return (
        <div className="ui container">
            <Router history={history}>
            <div>
            <Header/>
            {/* Swichタグで囲わないとcreateページにshowページが表示されてしまう */}
            <Switch>
            <Route path="/" exact component={StreamList}/>
            <Route path="/streams/new" exact component={StreamCreate}/>

            {/* 
            遷移先でprops.match.params.idでidの値を取得できる
            :idはプロパティ名
            プロパティ名は自由に変更可能 
            */}
            <Route path="/streams/edit/:id" exact component={StreamEdit}/>
            <Route path="/streams/delete/:id" exact component={StreamDelete}/>
            <Route path="/streams/:id" exact component={StreamShow}/>
            </Switch>
            </div>
            </Router>
        </div>
    )
};

export default App;