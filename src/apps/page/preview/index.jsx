/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import './index.less';
import {
  Table,
  Input,
  Button,
  Icon,
  Modal,
  Radio,
  List,
  Spin,
  Card,
  DatePicker,
  Select,
  Tabs,
  Form,
  TreeSelect,
} from 'antd';
import 'moment/locale/zh-cn'
import {deviceTypeList} from "../../../utils/findname"
import rec from '../../../images/rec.png';
// import bu from '../../../images/bu.png';

const queryString = require('query-string');

const defaultState = {
  suiteId: undefined,
  deviceType: undefined
};

class Preview extends Component {

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handlePosition = this.handlePosition.bind(this);
    this.assetList = this.assetList.bind(this);
    this.handleDeviceType = this.handleDeviceType.bind(this);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.suit !== this.props.suit)
      this.setState({
        suit: nextProps.suit
      });
  }

  handleDeviceType(value) {
    this.setState({deviceType: value});
    if (this.state.suiteId) {
      this.props.fetchSuit({
        suiteId: this.state.suiteId,
        deviceType: value
      });
    }
  }

  handlePosition(value) {
    this.setState({suiteId: value});
    if (this.state.deviceType) {
      this.props.fetchSuit({
        suiteId: value,
        deviceType: this.state.deviceType
      });
    }
  }

  assetList(suit) {
    return (
      <div className="assetlist">
        {
          suit ?
            <List
              locale={{emptyText: '暂无数据'}}
              grid={{column: 3}}
              dataSource={suit}
              renderItem={(item, i) => (
                <List.Item>
                  <Card style={{width: '273px', boxShadow: '0px 3px 4px #e5e5e5'}}>
                    <div className="asset-top">
                      <img src={item.assetPicture} alt="" className="asset-image"/>
                      {

                        item.recommend ? <img src={rec} alt="" className="asset-rec"/> : null

                      }
                      {/*{*/}
                        {/*(item.assetKeepStock > item.assetStock) ?*/}
                          {/*<img src={bu} alt="" className="asset-bu"/> : null*/}

                      {/*}*/}
                    </div>
                    <div className="asset-title">{item.categoryName}</div>
                    <ul className="detail">
                      {item.brandStatus ? <li>品牌：{item.brand}</li> : null}
                      {item.cpuStatus ? <li>CPU：{item.cpu}</li> : null}
                      {item.memoryStatus ? <li>内存：{item.memory}</li> : null}
                      {item.diskStatus ? <li>硬盘：{item.disk}</li> : null}
                      {item.cardStatus ? <li>显卡：{item.card}</li> : null}
                      {item.osStatus ? <li>系统：{item.os}</li> : null}
                      {item.resolutionStatus ? <li>分辨率：{item.resolution}</li> : null}
                      {item.adapterStatus ? <li>接口：{item.adapter}</li> : null}
                      {item.sizeStatus ? <li>尺寸：{item.size}</li> : null}
                    </ul>
                  </Card>
                </List.Item>
              )}
            /> : null
        }
      </div>
    )
  }


  componentDidMount() {
    const parsed = queryString.parse(location.search);
    // window.location.replace('/preview');
    this.setState({deviceType: parsed.deviceType});
    this.props.fetchPosition()
  }

  render() {
    const {position} = this.props;
    return (

      <div className="preview">
        <div className="find">
          <div className="bank">
            设备类型：
            <Select
              style={{width: 150}}
              placeholder="请选择设备类型"
              onChange={this.handleDeviceType}
              value={this.state.deviceType}
            >
              {
                deviceTypeList && deviceTypeList.map((item, i) =>
                  <Select.Option value={item.key}>
                    {item.value}
                  </Select.Option>
                )
              }
            </Select>
          </div>
          <div className="bank">
            岗位序列：
            <TreeSelect
              // showSearch
              style={{width: 220}}
              value={this.state.suiteId}
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              placeholder="请选择岗位"
              // allowClear
              // multiple
              treeDefaultExpandAll
              treeData={position}
              onChange={this.handlePosition}
            />
          </div>
          {this.state.suit ?
            this.assetList(this.state.suit):
            <div className='kong'>暂无数据</div>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    position: state.position.data,
    suit: state.suit.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchSuit: (payload) => dispatch({
    type: actionTypes.FETCH_SUIT,
    payload
  }),
  fetchPosition: (payload) => dispatch({
    type: actionTypes.FETCH_POSITION,
    payload
  })

});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Preview));





