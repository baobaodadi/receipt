/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import moment from 'moment'
import 'moment/locale/zh-cn'
import './index.less';
import {
  Table,
  Input,
  Button,
  Icon,
  Upload,
  Switch,
  Modal,
  Select,
  Tabs,
  Form,
  message,
  TreeSelect,
  Divider,
  InputNumber
} from 'antd';

const TabPane = Tabs.TabPane;

const defaultState = {
  listType: 1,
  company: undefined,
};

class Receipt extends Component {

  columns() {
    let array = [
      {
        title: '开票日期',
        dataIndex: 'invoiceDate',
        key: 'invoiceDate',
        width: 100,
        align: 'center',
      },
      {
        title: '付款公司',
        dataIndex: 'copanyName',
        key: 'copanyName',
        width: 100,
        align: 'center',
      },
      {
        title: '付款单号',
        dataIndex: 'paymentNo',
        key: 'paymentNo',
        width: 100,
        align: 'center',
      },
      {
        title: '发票号码',
        dataIndex: 'invoiceNo',
        key: 'invoiceNo',
        width: 100,
        align: 'center',
      },
      {
        title: '发票税额',
        dataIndex: 'taxAmount',
        key: 'taxAmount',
        width: 100,
        align: 'center',
      },
      {
        title: '发票金额',
        dataIndex: 'invoiceAmount',
        key: 'invoiceAmount',
        width: 100,
        align: 'center',
      },
      {
        title: '价税合计',
        dataIndex: 'totalAmount',
        key: 'totalAmount',
        width: 100,
        align: 'center',
      },
      {
        title: '当前环节',
        dataIndex: 'invoiceNode',
        key: 'invoiceNode',
        width: 100,
        align: 'center',
      },
      {
        title: '认证状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        align: 'center',
      },
      {
        title: '申请人',
        dataIndex: 'applUser',
        key: 'applUser',
        width: 100,
        align: 'center',
      },
      {
        title: '申请时间',
        dataIndex: 'applTime',
        key: 'applTime',
        width: 100,
        align: 'center',
      },
      {
        title: '记账状态',
        dataIndex: 'accountingStatus',
        key: 'accountingStatus',
        width: 100,
        align: 'center',
      },
      {
        title: '财务审核人',
        dataIndex: 'reviewUser',
        key: 'reviewUser',
        width: 100,
        align: 'center',
      },
      {
        title: '记账人',
        dataIndex: 'accountingUser',
        key: 'accountingUser',
        width: 100,
        align: 'center',
      }
    ];
    return array
  }

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleTab = this.handleTab.bind(this);
    this.tableList = this.tableList.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list)
      this.setState({
        list: nextProps.list
      });
  }

  handleTab(value) {
    this.setState({
      listType: value,
    });
    this.props.fetchList({
      listType: value,
      pageNo:1
    });
  }

  handleTableChange(pagination) {
    const pager = {...this.state.pagination};
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.props.fetchList({
      listType: this.state.listType,
      pageNo: pager.current,
    });
  }


  handleSearch() {
    this.props.fetchList({
      listType: this.state.listType,
      pageNo:this.state.pagination.current
    });
  }

  handleCompanyChange(key) {
    this.setState({company:key})
  }

  tableList(data) {
    return (
      <div className="tablelist">
        {
          data && data.invoiceList ?
            <Table
              rowKey='id'
              className="tableInner"
              align="center"
              dataSource={data.invoiceList}
              columns={this.columns()}
              bordered
              // scroll={{y: 640}}
              // scroll={{x: 2080}}
              // expandedRowKeys={this.state.expandkeys}
              // expandedRowRender={this.expandedRowRender}
              onChange={this.handleTableChange}
              locale={{emptyText: '暂无数据'}}
              pagination={{
                pageSize: data.size,
                current: data.current,
                total: data.total
              }}
            /> :
            <Table
              align="center"
              dataSource={data}
              columns={this.columns()}
              bordered
              scroll={{y: 640}}
              locale={{emptyText: '暂无数据'}}
            />
        }
      </div>
    )
  }

  searchBar(listType,company) {

    return (
      <div className="list">
        <div className="find">{
          company ?
            <div className="bank">
              <Select
                style={{width: 220}}
                placeholder="请选择业务"
                value={this.state.company}
                onChange={this.handleCompanyChange}
                allowClear={true}
              >
                {
                  company && company.map((item, i) =>
                    <Select.Option key={i} value={item.key}>
                      {item.value}
                    </Select.Option>
                  )
                }
              </Select>
            </div>:null
        }
          <div className="bank">

          </div>
          <div className="bank">
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.props.fetchList({
      listType: 1,
      pageNo:1
    });
    this.props.fetchCompany();
  }

  render() {
    const {list} = this.state;
    const {company} = this.props;

    return (
      <div className="list">

        <Tabs defaultActiveKey="NOTEBOOK" onChange={this.handleTab}>
          <TabPane tab="我的发票" key="1">
            {this.searchBar(1,company)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="全部发票" key="2">
            {this.searchBar(2,company)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="税务接受" key="3">
            {this.searchBar(3,company)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="发票认证" key="4">
            {this.searchBar(4,company)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="发票记账" key="5">
            {this.searchBar(5,company)}
            {this.tableList(list)}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    list: state.list.data,
    company: state.company.data,
  })
};

const mapDispatchToProps = dispatch => ({
  fetchList: (payload) => dispatch({
    type: actionTypes.FETCH_LIST,
    payload
  }),
  fetchCompany: (payload) => dispatch({
    type: actionTypes.FETCH_COMPANY,
    payload
  })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Receipt));





