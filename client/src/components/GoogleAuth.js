import React from 'react';
import {connect} from 'react-redux';
import {signInAction,signOutAction} from '../actions';

class GoogleAuth extends React.Component{
   componentDidMount(){
       //windowはグローバルなオブジェクト
      window.gapi.load('client:auth2', () => {
          window.gapi.client.init({
              clientId:'1032384518732-br22vnajijc8887drb18jsf7uac6nruv.apps.googleusercontent.com',
              scope:'email'
          }).then(() =>{
              this.auth = window.gapi.auth2.getAuthInstance();
              this.onAuthChange(this.auth.isSignedIn.get());
              //表示の更新処理。起動時には呼ばれない。ログインボタンを押したら呼ばれる。

              //googleのthis.auth.isSignedInが更新したら引数の関数が呼び出される
              this.auth.isSignedIn.listen(this.onAuthChange);
              
          })
      });
   }

   //表示を更新させている
   onAuthChange = isSignedIn => {
       if (isSignedIn){
           //reducerを呼び出し、storeに値を渡してる.
           //引数はユーザーID
           this.props.signInAction(this.auth.currentUser.get().getId());
       }else{
           this.props.signOutAction();
       }
   }

  

   //サインインの処理
   onSignInClick = () =>{
    //googleにサインインしている。signInはGoogleの関数
       this.auth.signIn();
   }

   //サインアウトの処理
   onSignOutClick = () => {
       this.auth.signOut();
   }

   renderAuthButton() {
       if (this.props.isSignedInMap === null){
           return null;
       }else if(this.props.isSignedInMap){
           return (
            <button className="ui red google button" onClick={this.onSignOutClick}>
            <i className="google icon"/>
              Sign Out
        </button>
           )
       }else{
           return (
            <button className="ui red google button" onClick={this.onSignInClick}>
                <i className="google icon"/>>
                  Sign In with Google
            </button>
        )
       }
   }

   render(){
       return <div>{this.renderAuthButton()}</div>
   }
}

//storeが更新されると呼び出される。初回起動時も。その後renderが呼び出され表示が更新される。
const mapStateToProps = (state) =>{
    return {isSignedInMap: state.auth.isSignedIn};
}

export default connect(mapStateToProps,{signInAction,signOutAction})(GoogleAuth);