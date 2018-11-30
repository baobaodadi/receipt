import React, {Component} from 'react';
import {Layout} from 'antd';
import logo from '../../../images/logo.png';
import {Link, withRouter} from 'react-router-dom';
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import cookie from "react-cookies";
import {ENTITY_LOGOUT} from "../../../config/constants";

const {Header} = Layout;

class Headers extends Component {

  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <Header id="header">
        <div id="logo">
          <Link to="/">
            <img src={logo}/>
          </Link>
          <h1>资产管理后台</h1>
          {
            this.props.user ?
              <span className="name">
                <img className="avt" src={`https://oa.sogou-inc.com/moa/sylla/mapi/img?id=${this.props.user.loginId}&s=1&w=100&h=100`} />
                {this.props.user.name}
                <a className='logout'
                   onClick={()=>{
                     if(window.location.hostname === "oa.sogou-inc.com") {
                        window.location.href = `https://oa.sogou-inc.com/asset/api/go-logout?targetUrl=${encodeURIComponent(window.location.href)}`;
                     }else{
                       this.props.fetchLogout();
                       location.reload()
                     }
                   }}
                >退出</a>
              </span>
              : null
          }
        </div>

      </Header>
    )
  }
}

const mapStateToProps = state => {
  return ({
    user: state.user.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchUser: (payload) => dispatch({
    type: actionTypes.FETCH_USER,
    payload
  }),
  fetchLogout: () => dispatch({
    type: actionTypes.FETCH_LOGOUT,
  })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Headers));