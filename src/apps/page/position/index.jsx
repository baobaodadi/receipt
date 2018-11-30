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
  Menu,
  Radio,
  List,
  Spin,
  Card,
  DatePicker,
  Select,
  Tabs,
  Modal,
  Form,
  Divider,
  Tree,
  TreeSelect,
  message,
  Collapse
} from 'antd';
import 'moment/locale/zh-cn'
import {deviceTypeList, deviceTypeAllName} from "../../../utils/findname";


const defaultState = {
  suiteId: undefined,
  deviceType: undefined,
  visible: false,
  oldCategoryId: undefined,
  newCategoryId: undefined,
};

const TreeNode = Tree.TreeNode;
const Panel = Collapse.Panel;
const FormItem = Form.Item;


class Position extends Component {

  columns() {
    let array = [
      {
        title: '品名',
        dataIndex: 'categoryName',
        key: 'categoryName',
        width: 300,
        align: 'center',
      },
      {
        title: '操作',
        key: 'action',
        // fixed: 'right',
        render: (text, record, key) => (
          <span>
                      <a
                        onClick={() => {
                          this.props.fetchBack({deviceType: text.deviceType});
                          this.setState({
                            deviceType: record.deviceType,
                            visible: true,
                            addOrEdit: 0,
                            oldCategoryId: record.categoryId,
                            newCategoryId: record.categoryId,
                          });
                          this.props.form.setFieldsValue({
                            category: record.categoryId,
                          });

                        }}
                      >修改</a>
                        <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.props.fetchDelete(
                            {
                              categoryId: record.categoryId,
                              suiteId: this.state.suiteId,
                            });
                          setTimeout(() => {
                            this.props.fetchAll({
                              suiteId: this.state.suiteId,
                            });
                          }, 200)

                        }}
                      >删除</a>
                       <Divider type="vertical"/>
            {
              !record.recommend ?
                < a
                  onClick={() => {
                    this.props.fetchRecommend({
                      assetId: record.assetId,
                      suiteId: this.state.suiteId,
                      deviceType: record.deviceType,
                      recommend: 1,
                    });
                    setTimeout(() => {
                      this.props.fetchAll({
                        suiteId: this.state.suiteId,
                      });
                    }, 200)

                  }}
                >推荐</a> :
                <a className="rec"
                  onClick={() => {
                    this.props.fetchRecommend({
                      assetId: record.assetId,
                      suiteId: this.state.suiteId,
                      deviceType: record.deviceType,
                      recommend: 0,
                    });
                    setTimeout(() => {
                      this.props.fetchAll({
                        suiteId: this.state.suiteId,
                      });
                    }, 200)

                  }}
                >取消推荐</a>
            }

           </span>
        ),
      }
    ]
    return array
  }


  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.selectTreeNode = this.selectTreeNode.bind(this);
    this.collapseChange = this.collapseChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleDeviceType = this.handleDeviceType.bind(this);
    this.handleCatagory = this.handleCatagory.bind(this);
  }

  componentWillReceiveProps(nextProps) {

  }

  handleDeviceType(value) {
    this.setState({deviceType: value})
    this.props.fetchBack({deviceType: value});
  }

  handleCatagory(value) {
    this.setState({newCategoryId: value})
  }

  handleCancel(value) {
    this.setState({visible: false})
  }

  handleOk(value) {
    if (this.state.newCategoryId) {
      if (this.state.addOrEdit) {
        this.props.fetchNew({
          deviceType: this.state.deviceType,
          suiteId: this.state.suiteId,
          categoryId: this.state.newCategoryId
        })
      } else {
        this.props.fetchModify({
          deviceType: this.state.deviceType,
          suiteId: this.state.suiteId,
          oldCategoryId: this.state.oldCategoryId,
          newCategoryId: this.state.newCategoryId,
        })
      }
      setTimeout(() => {
        this.props.fetchAll({
          suiteId: this.state.suiteId,
        });
      }, 200)

      this.setState({
        visible: false,
      });
    } else {
      message.error('还未选择设备类型或品类')
    }

  }

  selectTreeNode(selectedKeys) {
    // console.log(selectedKeys)
    if (selectedKeys.length) {
      this.setState({suiteId: selectedKeys.toString()});
      this.props.fetchAll({
        suiteId: selectedKeys.toString(),
      });
    }

  }

  tableList(all, key) {
    return (
      all ?
        <div>
          <div className="title">
            {deviceTypeAllName[key]}
          </div>
          <Table
            className="tableInner"
            align="center"
            dataSource={all}
            columns={this.columns()}
            pagination={false}
            locale={{emptyText: '暂无数据'}}
          />
        </div> :
        <Table
          align="center"
          dataSource={null}
          columns={this.columns()}
          locale={{emptyText: '暂无数据'}}
        />

    )
  }

  collapseChange(value) {
    this.props.fetchBack({deviceType: value.toString()});
  }


  componentDidMount() {
    this.props.fetchPosition();
  }

  render() {
    const {position, all, back} = this.props;
    const {getFieldDecorator} = this.props.form;

    const loop = data => data.map((item) => {
      if (item.children && item.children.length) {
        return <TreeNode key={item.key} title={item.title}>{loop(item.children)}</TreeNode>;
      }
      return <TreeNode key={item.key} title={item.title}/>;
    });

    return (

      <div className="position">
        <Modal
          className='position-modal'
          centered
          width="600px"
          title={this.state.addOrEdit?"新增":"编辑"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form onSubmit={this.handleSubmit}>
            {
              this.state.addOrEdit ?
                <FormItem
                  label="选择设备类型"
                  labelCol={{span: 10}}
                  wrapperCol={{span: 14}}
                >

                  {getFieldDecorator('deviceType', {
                    rules: [{required: true, message: '请选择设备类型'}],
                  })(
                    <Select
                      style={{width: 150}}
                      placeholder="请选择设备类型"
                      onChange={this.handleDeviceType}
                      disabled={!this.state.addOrEdit}
                    >
                      {
                        deviceTypeList && deviceTypeList.map((item, i) =>
                          <Select.Option value={item.key}>
                            {item.value}
                          </Select.Option>
                        )
                      }
                    </Select>
                  )}

                </FormItem> :
                null

            }

            <FormItem
              label="请选择品类"
              labelCol={{span: 10}}
              wrapperCol={{span: 14}}
            >
              {getFieldDecorator('category', {
                rules: [{required: true, message: '请选择品类'}],
              })(
                <Select
                  style={{width: 200}}
                  placeholder="请选择品类"
                  onChange={this.handleCatagory}
                >
                  {
                    back && back.map((item, i) =>
                      <Select.Option key={i} value={item.typeId}>
                        {item.typeName}
                      </Select.Option>
                    )
                  }

                </Select>
              )}
            </FormItem>
          </Form>
        </Modal>
        <div className="find">
          <div className="left">
            <div className="title1">岗位序列</div>
            <Tree
              onSelect={this.selectTreeNode}
            >
              {loop(position)}
            </Tree>
          </div>
          <div className="inner">
            <div className="bank">
              <Button type="primary" onClick={() => {
                if (!this.state.suiteId) {
                  message.error('请先选择岗位序列');
                  return
                }
                this.props.form.setFieldsValue({
                  deviceType: undefined,
                  category: undefined,

                });
                this.setState({
                  visible: true,
                  addOrEdit: 1,
                  newCategoryId: undefined,
                    deviceType: undefined,
                });

              }}>新增</Button>
            </div>

            <div className="title2">资产列表</div>

            <div className="bordered">

              {all ?
                Object.keys(all).map((item) => {
                  return (
                    all[item] ?
                      this.tableList(all[item], item)
                      : null
                  )
                }) : <div className='kong'>暂无数据</div>
              }
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    position: state.position.data,
    all: state.all.data,
    back: state.back.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchPosition: (payload) => dispatch({
    type: actionTypes.FETCH_POSITION,
    payload
  }),
  fetchBack: (payload) => dispatch({
    type: actionTypes.FETCH_BACK,
    payload
  }),
  fetchAll: (payload) => dispatch({
    type: actionTypes.FETCH_ALL,
    payload
  }),
  fetchNew: (payload) => dispatch({
    type: actionTypes.FETCH_NEW,
    payload
  }),
  fetchDelete: (payload) => dispatch({
    type: actionTypes.FETCH_DELETE,
    payload
  }),
  fetchModify: (payload) => dispatch({
    type: actionTypes.FETCH_MODIFY,
    payload
  }),
  fetchRecommend: (payload) => dispatch({
    type: actionTypes.FETCH_RECOMMEND,
    payload
  })
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Position)));





