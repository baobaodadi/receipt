/**
 * Created by dady on 2017/12/15.
 */

import React, {Component} from 'react';
import {Link, withRouter} from "react-router-dom";
import * as actionTypes from "../../../config/actionTypes";
import {connect} from "react-redux";
import {deviceTypeList,deviceTypeAllName, findname} from "../../../utils/findname"
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
const TreeNode = TreeSelect.TreeNode;
const FormItem = Form.Item;


const defaultState = {
  visible: false,
  visibleNote: false,
  loading: false,
  appId: undefined,
  addOrEdit: 1,
  expandkeys: [],
  deviceType: 'NOTEBOOK',
  suiteId: [],
  categoryId: [],

  //MODAL STATE
  suiteIdInner: [],
  categoryIdInner: undefined,
  assetStockInner: 0,
  assetKeepStockInner: 0,
  brandInner: undefined,
  brandStatusInner: true,
  osInner: undefined,
  osStatusInner: 1,
  sizeInner: undefined,
  sizeStatusInner: 1,
  memoryInner: undefined,
  memoryStatusInner: 1,
  diskInner: undefined,
  diskStatusInner: 1,
  cpuInner: undefined,
  cpuStatusInner: 1,
  cardInner: undefined,
  cardStatusInner: 1,
  adapterInner: undefined,
  adapterStatusInner: 1,
  resolutionInner: undefined,
  resolutionStatusInner: 1,
  tempUseInner: 0,
  assetPictureInner: undefined,
  assetStatusInner: 1,
  recommendInner: 0

};

class Back extends Component {

  columnsLog() {
    let array = [
      {
        title: '操作人',
        dataIndex: 'uid',
        key: 'uid',
        width: 100,
        align: 'center',
      }, {
        title: '操作动作',
        dataIndex: 'operation',
        key: 'operation',
        width: 100,
        align: 'center',
      }, {
        title: '时间',
        dataIndex: 'time',
        key: 'time',
        width: 100,
        align: 'center',
        render: row => {
          return (
            <span>
              {moment(row).format('YYYY-MM-DD,a h:mm:ss')}
            </span>
          )
        }
      }
    ]
    return array
  }

  columns() {
    let array = [
      {
        title: '类型',
        dataIndex: 'deviceType',
        key: 'deviceType',
        width: 80,
        align: 'center',
        render: (text) => {
          return text ? deviceTypeAllName[text]:null
        },
      },
      {
        title: '图片',
        dataIndex: 'assetPicture',
        key: 'assetPicture',
        width: 100,
        render: (text) => (
          text?<img src={text} alt="" style={{display: 'block',height: '74px',width: '100%',maxWidth: '100px'}}/>:'无'
        ),
        align: 'center',
      },
      {
        title: '品类',
        dataIndex: 'categoryName',
        key: 'categoryName',
        width: 100,
        align: 'center',
      },
      {
        title: 'ID',
        dataIndex: 'categoryId',
        key: 'categoryId',
        width: 70,
        align: 'center',
      },
      {
        title: '库存',
        dataIndex: 'assetStock',
        key: 'assetStock',
        width: 70,

        align: 'center',
      },
      {
        title: '保留库存',
        dataIndex: 'assetKeepStock',
        key: 'assetKeepStock',
        width: 100,
        render: (text, record) => (
          record.assetStock < text ? '补货中' : text
        ),
        align: 'center',
      },
      {
        title: '岗位',
        dataIndex: 'suiteId',
        key: 'suiteId',
        width: 240,
        render: (text) => {
          return text ? (findname(this.props.position, text)).toString() : ''
        },
        align: 'center',
      },
      {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
        width: 100,
        align: 'center',
      },
      {
        title: '系统',
        dataIndex: 'os',
        key: 'os',
        width: 100,
        align: 'center',
      },
      {
        title: '尺寸',
        dataIndex: 'size',
        key: 'size',
        width: 100,
        align: 'center',
      },
      {
        title: '内存',
        dataIndex: 'memory',
        key: 'memory',
        width: 100,
        align: 'center',
      },
      {
        title: '硬盘',
        dataIndex: 'disk',
        key: 'disk',
        width: 100,
        align: 'center',
      },
      {
        title: 'CPU',
        dataIndex: 'cpu',
        key: 'cpu',
        width: 100,
        align: 'center',
      },
      {
        title: '显卡',
        dataIndex: 'card',
        key: 'card',
        width: 100,
        align: 'center',
      }, {
        title: '分辨率',
        dataIndex: 'resolution',
        key: 'resolution',
        width: 100,
        align: 'center',
      }, {
        title: '接口',
        dataIndex: 'adapter',
        key: 'adapter',
        width: 100,
        align: 'center',
      },
      {
        title: '临时用机',
        dataIndex: 'tempUse',
        key: 'tempUse',
        width: 100,
        render: (text) => (
          text ? <span style={{'color': 'red'}}>是</span> : '否'
        ),
        align: 'center',
      },
      {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 320,
        render: (text, record, key) => (
          <span>
                      <a
                        onClick={() => {
                          this.setState({
                            visible: true,
                            assetPictureInner: record.assetPicture,
                            assetId: record.assetId,
                            addOrEdit: 0,
                          });
                          this.props.form.setFieldsValue({
                            suiteIdInner: record.suiteId?record.suiteId.split(','):[],
                            categoryIdInner: record.categoryId,
                            // assetStockInner: record.assetStock,
                            assetKeepStockInner: record.assetKeepStock,
                            brandInner: record.brand,
                            brandStatusInner: !!record.brandStatus,
                            osInner: record.os,
                            osStatusInner: record.osStatus,
                            sizeInner: record.size,
                            sizeStatusInner: record.sizeStatus,
                            memoryInner: record.memory,
                            memoryStatusInner: record.memoryStatus,
                            diskInner: record.disk,
                            diskStatusInner: record.diskStatus,
                            cpuInner: record.cpu,
                            cpuStatusInner: record.cpuStatus,
                            cardInner: record.card,
                            cardStatusInner: record.cardStatus,
                            adapterInner: record.adapter,
                            adapterStatusInner: record.adapterStatus,
                            resolutionInner: record.resolution,
                            resolutionStatusInner: record.resolutionStatus,
                            tempUseInner: +record.tempUse,
                            // assetStatusInner: record.assetStatus,
                          });
                        }}
                      >编辑</a>
                      <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.props.fetchSort({assetId: record.assetId, move: -1})
                          this.delayfresh();
                        }}
                      >上移</a>
                        <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.props.fetchSort({assetId: record.assetId, move: 1})
                          this.delayfresh();
                        }}
                      >下移</a>
                    <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.props.fetchDel({assetId: record.assetId})
                          this.delayfresh();
                        }}
                      >删除</a>
                      <Divider type="vertical"/>
                      <a
                        onClick={() => {
                          this.setState({
                            visibleNote: true,
                            log: record.logBeanList
                          })
                        }}
                      >日志</a>
             <Divider type="vertical"/>
                        <Switch
                          size='default'
                          checkedChildren="启"
                          unCheckedChildren="禁"
                          checked={!!record.assetStatus}
                          onChange={(checked) => {
                            this.props.fetchEdit({assetId: record.assetId, assetStatus: checked?1:0})
                            this.delayfresh();
                          }}
                        />
            {/*<a*/}
            {/*onClick={() => {*/}
            {/*this.props.fetchEdit({assetId: record.assetId, assetStatus: 1})*/}
            {/*this.delayfresh();*/}
            {/*}}*/}
            {/*>启用</a>*/}
            {/*<Divider type="vertical"/>*/}
            {/*<a*/}
            {/*onClick={() => {*/}
            {/*this.props.fetchEdit({assetId: record.assetId, assetStatus: 0})*/}
            {/*this.delayfresh();*/}
            {/*}}*/}
            {/*>禁用</a>*/}
            {/*<Divider type="vertical"/>*/}
                    </span>
        ),
      }
    ];
    return array
  }

  constructor(props) {
    super(props);
    this.state = {...defaultState};
    this.handleTab = this.handleTab.bind(this);
    this.delayfresh = this.delayfresh.bind(this);
    this.normFile = this.normFile.bind(this);
    this.handleOkNote = this.handleOkNote.bind(this);
    this.handleCancelNote = this.handleCancelNote.bind(this);
    this.handleUploadChange = this.handleUploadChange.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.tableList = this.tableList.bind(this);
    this.handleTableChange = this.handleTableChange.bind(this);
    this.handleNew = this.handleNew.bind(this);
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCatagoryInner = this.handleCatagoryInner.bind(this);
    this.handleCatagory = this.handleCatagory.bind(this);
    this.handlePosition = this.handlePosition.bind(this);
    this.handleInnerPosition = this.handleInnerPosition.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list !== this.props.list)
      this.setState({
        list: nextProps.list
      });
    if (nextProps.add !== this.props.add) {
      if (nextProps.add.status === 500104) {
        message.error(nextProps.add.msg)
      }

    }
  }

  handleSubmit(e) {
    // e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (this.state.addOrEdit) {
          if(values.categoryIdInner) {
              this.props.fetchAdd({
                  deviceType: this.state.deviceType,
                  assetId: this.state.assetId,
                  suiteId: values.suiteIdInner ? values.suiteIdInner.toString() : null,
                  categoryId: values.categoryIdInner,
                  assetStock: values.assetStockInner,
                  assetKeepStock: values.assetKeepStockInner,
                  brand: values.brandInner,
                  brandStatus: +values.brandStatusInner,
                  os: values.osInner,
                  osStatus: +values.osStatusInner,
                  size: values.sizeInner,
                  sizeStatus: +values.sizeStatusInner,
                  memory: values.memoryInner,
                  memoryStatus: +values.memoryStatusInner,
                  disk: values.diskInner,
                  diskStatus: +values.diskStatusInner,
                  cpu: values.cpuInner,
                  cpuStatus: +values.cpuStatusInner,
                  card: values.cardInner,
                  cardStatus: +values.cardStatusInner,
                  adapter: values.adapterInner,
                  adapterStatus: +values.adapterStatusInner,
                  resolution: values.resolutionInner,
                  resolutionStatus: +values.resolutionStatusInner,
                  tempUse: +values.tempUseInner,
                  assetPicture: this.state.assetPictureInner,
                  // assetStatus: +values.assetStatusInner,
                  // recommend: values.recommendInner,
              })
          }
        } else {
          this.props.fetchEdit({
            deviceType: this.state.deviceType,
            assetId: this.state.assetId,
            suiteId: values.suiteIdInner?values.suiteIdInner.toString():null,
            // categoryId: values.categoryIdInner,
            assetStock: values.assetStockInner,
            assetKeepStock: values.assetKeepStockInner,
            brand: values.brandInner,
            brandStatus: +values.brandStatusInner,
            os: values.osInner,
            osStatus: +values.osStatusInner,
            size: values.sizeInner,
            sizeStatus: +values.sizeStatusInner,
            memory: values.memoryInner,
            memoryStatus: +values.memoryStatusInner,
            disk: values.diskInner,
            diskStatus: +values.diskStatusInner,
            cpu: values.cpuInner,
            cpuStatus: +values.cpuStatusInner,
            card: values.cardInner,
            cardStatus: +values.cardStatusInner,
            adapter: values.adapterInner,
            adapterStatus: +values.adapterStatusInner,
            resolution: values.resolutionInner,
            resolutionStatus: +values.resolutionStatusInner,
            tempUse: +values.tempUseInner,
            assetPicture: this.state.assetPictureInner,
            // assetStatus: +values.assetStatusInner,
            // recommend: values.recommendInner,
          })
        }
      }
    });


  }

  handlePreview(value) {
    this.props.history.replace(`/preview?deviceType=${this.state.deviceType}`)
  }


  handleCatagory(value) {
    this.setState({categoryId: value});
  }

  handleCatagoryInner(value) {
    // console.log(value);
    // this.props.form.setFieldsValue({
    //     id: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    //     less: `${value === 'male' ? '1' : '2'}`,
    // });
  }

  handleTab(value) {
    this.setState({
      deviceType: value,
      categoryId: [],
      suiteId: []
    });
    this.props.fetchBack({deviceType: value});
    this.props.fetchList({
      deviceType: value,
      // suiteId: this.state.suiteId.toString(),
      // categoryId: this.state.categoryId.toString(),
    });
  }

  handleCancel(value) {
    this.setState({
      visible: false,
      assetPictureInner: undefined
    })
  }

  handleCancelNote(value) {
    this.setState({visibleNote: false})
  }

  delayfresh() {
    setTimeout(() => {
      this.handleSearch();
    }, 300)
  }

  onChangeSwitch(value) {
    this.props.fetchEdit({assetId: record.assetId, assetStatus: 1})
    this.delayfresh();
  }

  handleOk(value) {
    this.setState({
      visible: false,
      addOrEdit: 0,
      assetPictureInner: undefined,
    });
    this.handleSubmit();
    this.delayfresh();
  }

  handleOkNote(value) {
    this.setState({
      visibleNote: false,
    });
  }

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  handleNew(value) {
    // console.log(value);
  }

  handleSearch() {
    // console.log(this.state.categoryId);
    this.props.fetchList({
      deviceType: this.state.deviceType,
      suiteId: this.state.suiteId.toString(),
      categoryId: this.state.categoryId.toString(),
    });
  }

  handleTableChange(value) {

  }


  handlePosition(value, label, extra) {
    this.setState({suiteId: value});
  }

  handleInnerPosition(value) {
    this.setState({innerPosition: value});
  }


  handleUploadChange(info) {
    if (info.file.status === 'uploading') {
      this.setState({loading: true});
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.setState({
        assetPictureInner: info.fileList[info.fileList.length - 1].response.data[0].url,
        loading: false,
      })
      // getBase64(info.file.originFileObj, imageUrl => {
      //   {
      //     console.log(imageUrl)
      //     this.setState({
      //       assetPictureInner: imageUrl,
      //       loading: false,
      //     })
      //   }
      // });
    }
  }

  normFile(e) {
    // console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }

  tableList(list) {
    return (
      <div className="tablelist">
        {
          list ?
            <Table
              rowKey='assetId'
              className="tableInner"
              align="center"
              dataSource={list}
              columns={this.columns()}
              bordered
              // scroll={{y: 640}}
              scroll={{x: 2080}}
              // expandedRowKeys={this.state.expandkeys}
              // expandedRowRender={this.expandedRowRender}
              onChange={this.handleTableChange}
              locale={{emptyText: '暂无数据'}}
              pagination={{
                pageSize:15
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
    )
  }

  searchBar(back, position) {
    return (
      <div className="back">
        <div className="find">
          <div className="bank">
            <Select
              mode="multiple"
              style={{width: 300}}
              placeholder="请选择品类"
              defaultValue={this.state.categoryId}
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
          </div>
          <div className="bank">
            <TreeSelect
              showSearch
              style={{width: 300}}
              value={this.state.suiteId}
              dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
              placeholder="请选择岗位"
              allowClear
              multiple
              treeDefaultExpandAll
              treeData={position}
              onChange={this.handlePosition}
            />
          </div>
          <div className="bank">
            <Button type="primary" onClick={this.handleSearch}>查询</Button>
          </div>
          <div className="bank">
            <Button type="primary" onClick={() => {
              this.setState({
                visible: true,
                addOrEdit: 1,
                assetPictureInner: undefined
              });
              this.props.form.setFieldsValue({
                suiteIdInner: undefined,
                categoryIdInner: undefined,
                // assetStockInner: 0,
                assetKeepStockInner: 0,
                brandInner: undefined,
                brandStatusInner: true,
                osInner: undefined,
                osStatusInner: 1,
                sizeInner: undefined,
                sizeStatusInner: 1,
                memoryInner: undefined,
                memoryStatusInner: 1,
                diskInner: undefined,
                diskStatusInner: 1,
                cpuInner: undefined,
                cpuStatusInner: 1,
                cardInner: undefined,
                cardStatusInner: 1,
                adapterInner: undefined,
                adapterStatusInner: 1,
                resolutionInner: undefined,
                resolutionStatusInner: 1,
                tempUseInner: 0,
                // assetPictureInner: undefined,
                // assetStatusInner: 1,
              });
            }}>新增</Button>
          </div>
          <div className="bank">
            <Button type="primary" onClick={this.handlePreview}>预览</Button>
          </div>

        </div>
      </div>
    )
  }


  componentDidMount() {
    this.props.fetchBack({deviceType: this.state.deviceType});
    this.props.fetchList({
      deviceType: this.state.deviceType,
      suiteId: this.state.suiteId.toString(),
      categoryId: this.state.categoryId.toString(),
    });
    this.props.fetchPosition();
  }

  render() {
    const {back, position} = this.props;
    const {list, log, add} = this.state;
    const {getFieldDecorator} = this.props.form;

    // const imageUrl = this.state.assetPictureInner;

    return (
      <div className="back">
        <Modal
          centered
          width="600px"
          title="日志"
          visible={this.state.visibleNote}
          onOk={this.handleOkNote}
          onCancel={this.handleCancelNote}
        >
          {
            log ?
              <Table
                columns={this.columnsLog()}
                dataSource={log}
                pagination={false}
                scroll={{y: 400}}
              /> :
              <Table
                columns={this.columnsLog()}
                dataSource={log}
                pagination={false}
                scroll={{y: 400}}
                locale={{emptyText: '暂无数据'}}
              />

          }
        </Modal>
        <Modal
          className='back-modal'
          centered
          width="675px"
          title={this.state.addOrEdit?"新增":"编辑"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          cancelText='取消'
          okText='确认'
        >
          <div>{this.state.categoryIdInner}</div>
          <Form onSubmit={this.handleSubmit}>

            <FormItem
              className='common'
              label="设备类型"
              //labelCol={{span: 10}}
              //wrapperCol={{span: 14}}
            >
              <span>{deviceTypeAllName[this.state.deviceType]}</span>
            </FormItem>

            <FormItem
              className='common'
              label="选择品类"
              //labelCol={{span: 10}}
              //wrapperCol={{span: 14}}
            >
              {getFieldDecorator('categoryIdInner', {
                // rules: [{required: true, message: '请选择品类'}],
              })(
                <Select
                  style={{width: 220}}
                  placeholder="请选择品类"
                  onChange={this.handleCatagoryInner}
                  disabled={!this.state.addOrEdit}
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

            <FormItem
              className='common'
              label="保留库存"
              //labelCol={{span: 10}}
              //wrapperCol={{span: 14}}
            >
              {getFieldDecorator('assetKeepStockInner', {
                //rules: [{required: true, message: ''}],
              })(
                <InputNumber  style={{width: 70}} min={0}/>
              )}
            </FormItem>

            <FormItem
              className='common suiteIdInner'
              label="选择岗位"
              //labelCol={{span: 10}}
              //wrapperCol={{span: 14}}
            >
              {getFieldDecorator('suiteIdInner', {
                // rules: [{required: true}],
              })(
                <TreeSelect
                  getPopupContainer={() => document.querySelector('.suiteIdInner')}
                  showSearch
                  style={{width: 220}}
                  // value={this.state.innerPosition}
                  dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                  placeholder="请选择岗位"
                  allowClear
                  multiple
                  treeDefaultExpandAll
                  onChange={this.handleInnerPosition}
                  treeData={position}
                />
              )}
            </FormItem>

            <ul className="innerlist">
              <li>
                <FormItem
                  label="品牌"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('brandInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('brandStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="系统"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('osInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('osStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="尺寸"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('sizeInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('sizeStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>

              <li>
                <FormItem
                  label="内存"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('memoryInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('memoryStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="硬盘"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('diskInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('diskStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>

              <li>
                <FormItem
                  label="CPU"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('cpuInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('cpuStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="显卡"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('cardInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('cardStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="分辨率"
                  className='resolution'
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('resolutionInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('resolutionStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>
              <li>
                <FormItem
                  label="接口"
                  //labelCol={{span: 6}}
                  //wrapperCol={{span: 18}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('adapterInner', {
                    //rules: [{required: true, message: ''}],
                  })(
                    <Input/>
                  )}
                </FormItem>

                <FormItem
                  //labelCol={{span: 5}}
                  //wrapperCol={{span: 5}}
                  style={{'display': 'inline-block'}}
                >
                  {getFieldDecorator('adapterStatusInner', {
                    valuePropName: 'checked'
                  })(
                    <Switch checkedChildren="启" unCheckedChildren="禁"/>,
                  )}
                </FormItem>
              </li>
              <li>
                  <FormItem
                      label="临时用机"
                      //labelCol={{span: 10}}
                      //wrapperCol={{span: 14}}
                      style={{'display': 'inline-block'}}
                  >
                      {getFieldDecorator('tempUseInner', {
                          valuePropName: 'checked',
                          // rules: [{required: true, message: ''}]
                      })(
                          <Switch checkedChildren="是" unCheckedChildren="否"/>,
                      )}
                  </FormItem>
                  <span style={{lineHeight: '39px',marginLeft: '10px',color: 'red'}}>注：一个设备类型下只能有一个临时用机</span>
              </li>
            </ul>

            <FormItem
              label="上传图片"
              className='common'
              // extra="限制500K"
              //labelCol={{span: 10}}
              //wrapperCol={{span: 14}}
            >
              {getFieldDecorator('assetPictureInner', {
                // valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
              })(
                <Upload
                  name="file"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  action={(window.location.hostname === "oa.sogou-inc.com")?"/asset/api/upload/imgUseDwarf/":'/oss/upload/imgUseDwarf/'}
                  onChange={this.handleUploadChange}
                >
                  {this.state.assetPictureInner ?
                    <img src={this.state.assetPictureInner} alt="avatar"/> :
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                      <div className="ant-upload-text">Upload</div>
                    </div>
                  }
                </Upload>
              )}
            </FormItem>

          </Form>
        </Modal>
        <Tabs defaultActiveKey="NOTEBOOK" onChange={this.handleTab}>
          <TabPane tab="笔记本" key="NOTEBOOK">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="显示器" key="MONITOR">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="台式机" key="HOST">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
          <TabPane tab="一体机" key="UIONMAC">
            {this.searchBar(back, position)}
            {this.tableList(list)}
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return ({
    back: state.back.data,
    list: state.list.data,
    position: state.position.data,
    add: state.add.data,
  })
};


const mapDispatchToProps = dispatch => ({
  fetchBack: (payload) => dispatch({
    type: actionTypes.FETCH_BACK,
    payload
  }),
  fetchList: (payload) => dispatch({
    type: actionTypes.FETCH_LIST,
    payload
  }),
  fetchAdd: (payload) => dispatch({
    type: actionTypes.FETCH_ADD,
    payload
  }),
  fetchEdit: (payload) => dispatch({
    type: actionTypes.FETCH_EDIT,
    payload
  }),
  fetchSort: (payload) => dispatch({
    type: actionTypes.FETCH_SORT,
    payload
  }),
  fetchPosition: (payload) => dispatch({
    type: actionTypes.FETCH_POSITION,
    payload
  }),
  fetchLog: (payload) => dispatch({
    type: actionTypes.FETCH_LOG,
    payload
  }),
  fetchDel: (payload) => dispatch({
    type: actionTypes.FETCH_DEL,
    payload
  })
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Form.create()(Back)));





