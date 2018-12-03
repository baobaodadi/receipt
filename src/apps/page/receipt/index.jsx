/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import My from './component/My';
import All from './component/All';
import Confirm from './component/Confirm';
import Accept from './component/Accept';
import Record from './component/Record';
import 'moment/locale/zh-cn'
import './index.less';
import {
  Tabs,
} from 'antd';

const TabPane = Tabs.TabPane;


const defaultState = {
  listType: 1,
};

class Receipt extends Component {

  constructor(props) {
    super(props);
    this.state = {...defaultState};
  }

  componentWillReceiveProps(nextProps) {

  }


  componentDidMount() {

  }


  render() {
    return (
      <div className="list">

        <Tabs defaultActiveKey="1" destroyInactiveTabPane={true}>
          <TabPane tab="我的发票" key="1">
            <My />
          </TabPane>
          <TabPane tab="全部发票" key="2">
            <All />
          </TabPane>
          <TabPane tab="税务接受" key="3">
            <Accept />
          </TabPane>
          <TabPane tab="发票认证" key="4">
            <Confirm />
          </TabPane>
          <TabPane tab="发票记账" key="5">
            <Record />
          </TabPane>
        </Tabs>
      </div>
    );
  }
}


export default Receipt;





