/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import 'moment/locale/zh-cn'
import {
  Table,
  Input,
  Button,
  Select,
} from 'antd';


const defaultState = {
  invoiceNo: undefined,
  payNo: undefined,
  accountingStatus: undefined,
  companyId: undefined,
  status: undefined,
  pagination: {
    current: 1
  }
};

class All extends Component {

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
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleCompanyChange = this.handleCompanyChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list)
      this.setState({
        list: nextProps.list
      });
  }


  handleTableChange(pagination) {
    const pager = {...this.state.pagination};
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    },()=>{
      this.handleSearch();
    });

  }


  handleSearch() {
    this.props.fetchList({
      listType: 2,
      pageNo: this.state.pagination.current,
      invoiceNo: this.state.invoiceNo,
      payNo: this.state.payNo,
      companyId: this.state.companyId,
      status: this.state.status,
    });
  }

  handleCompanyChange(key) {
    this.setState({companyId: key})
  }

  handleStatusChange(key) {
    this.setState({status: key})
  }


  componentDidMount() {
    this.handleSearch();
    this.props.fetchCompany();
    this.props.fetchStatus({type: 2});
  }

  render() {
    const {list} = this.state;
    const {status,company}=this.props;

    return (
      <div className="list">
        <div className="find">
          <div className="bank">
            <Input
              style={{width: 100}}
              value={this.state.invoiceNo}
              placeholder="发票号码"
              onChange={
                e => {
                  this.setState({invoiceNo: e.target.value})
                }
              }
              // enterButton
            />
          </div>
          <div className="bank">
            <Input
              style={{width: 180}}
              placeholder="付款单号"
              onChange={
                e => {
                  this.setState({payNo: e.target.value})
                }
              }
              // enterButton
            />
          </div>
          <div className="bank">
            <Select
              style={{width: 150}}
              placeholder="请选择发票状态"
              value={this.state.status}
              onChange={this.handleStatusChange}
              allowClear={true}
            >
              {
                status && status.map((item, i) =>
                  <Select.Option key={i} value={item.key}>
                    {item.value}
                  </Select.Option>
                )
              }
            </Select>
          </div>
          <div className="bank">
            <Select
              style={{width: 220}}
              placeholder="请选择付款公司"
              value={this.state.companyId}
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
          </div>
          <div className="bank">
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
          </div>
        </div>
        <div className="tablelist">
          {
            list && list.invoiceList ?
              <Table

                rowKey="id"
                className="tableInner"
                align="center"
                dataSource={list.invoiceList}
                columns={this.columns()}
                bordered
                // scroll={{y: 640}}
                // scroll={{x: 2080}}
                // expandedRowKeys={this.state.expandkeys}
                // expandedRowRender={this.expandedRowRender}
                onChange={this.handleTableChange}
                locale={{emptyText: '暂无数据'}}
                pagination={{
                  pageSize: list.size,
                  current: list.current,
                  total: list.total
                }}
              /> :
              <Table
                align="center"
                dataSource={list}
                columns={this.columns()}
                bordered
                scroll={{y: 640}}
                locale={{emptyText: '暂无数据'}}
              />
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    list: state.list.data,
    company: state.company.data,
    status: state.status.data,
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
  }),
  fetchStatus: (payload) => dispatch({
    type: actionTypes.FETCH_STATUS,
    payload
  })
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(All));





