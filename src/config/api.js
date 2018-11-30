import * as constants from './constants';

let Api;
if (window.location.hostname === '10.129.205.205') {
  Api = {
    [constants.ENTITY_BACK]: '/category/getCategory',
    [constants.ENTITY_LIST]: '/asset/getAssetList',
    [constants.ENTITY_ADD]: '/asset/add',
    [constants.ENTITY_DEL]: '/asset/delete',
    [constants.ENTITY_EDIT]: '/asset/mod',
    [constants.ENTITY_SORT]: '/asset/reorderAssetList',
    [constants.ENTITY_LOG]: '/asset/assetOperateLog',
    [constants.ENTITY_PRE]: '/asset/assetPreview',
    [constants.ENTITY_POSITION]: '/suite/getSuite',

    // 岗位页接口
    [constants.ENTITY_SUIT]: '/pub/getAssetBySuiteId',
    [constants.ENTITY_ALL]: '/suite/getAssetListBySuiteId',
    [constants.ENTITY_NEW]: ' /suite/addAssetBySuiteIdAndCategoryId',
    [constants.ENTITY_DELETE]: '/suite/deleteAssetBySuiteIdAndCategoryId',
    [constants.ENTITY_MODIFY]: '/suite/modAssetBySuiteIdAndCategoryId',
    [constants.ENTITY_RECOMMEND]: '/asset/recommendAsset',
  };
}
else {
  if (window.location.hostname === 'oa.sogou-inc.com') {
    Api = {
      [constants.ENTITY_BACK]: '/asset/api/category/getCategory',
      [constants.ENTITY_LIST]: '/asset/api/asset/getAssetList',
      [constants.ENTITY_ADD]: '/asset/api/asset/add',
      [constants.ENTITY_DEL]: '/asset/api/asset/delete',
      [constants.ENTITY_EDIT]: '/asset/api/asset/mod',
      [constants.ENTITY_SORT]: '/asset/api/asset/reorderAssetList',
      [constants.ENTITY_LOG]: '/asset/api/asset/assetOperateLog',
      [constants.ENTITY_PRE]: '/asset/api/asset/assetPreview',
      [constants.ENTITY_POSITION]: '/asset/api/suite/getSuite',
      [constants.ENTITY_USER]: '/asset/api/common/getUserInfo',
      [constants.ENTITY_LOGOUT]: '/asset/api/logout',

      // 岗位页接口
      [constants.ENTITY_SUIT]: '/asset/api/pub/getAssetBySuiteId',
      [constants.ENTITY_ALL]: '/asset/api/suite/getAssetListBySuiteId',
      [constants.ENTITY_NEW]: ' /asset/api/suite/addAssetBySuiteIdAndCategoryId',
      [constants.ENTITY_DELETE]: '/asset/api/suite/deleteAssetBySuiteIdAndCategoryId',
      [constants.ENTITY_MODIFY]: '/asset/api/suite/modAssetBySuiteIdAndCategoryId',
      [constants.ENTITY_RECOMMEND]: '/asset/api/asset/recommendAsset',
    };
  }else {
    Api = {
      [constants.ENTITY_BACK]: '/assetManager/category/getCategory',
      [constants.ENTITY_LIST]: '/assetManager/asset/getAssetList',
      [constants.ENTITY_ADD]: '/assetManager/asset/add',
      [constants.ENTITY_DEL]: '/assetManager/asset/delete',
      [constants.ENTITY_EDIT]: '/assetManager/asset/mod',
      [constants.ENTITY_SORT]: '/assetManager/asset/reorderAssetList',
      [constants.ENTITY_LOG]: '/assetManager/asset/assetOperateLog',
      [constants.ENTITY_PRE]: '/assetManager/asset/assetPreview',
      [constants.ENTITY_POSITION]: '/assetManager/suite/getSuite',
      [constants.ENTITY_USER]: '/assetManager/common/getUserInfo',
      [constants.ENTITY_LOGOUT]: '/assetManager/logout',

      // 岗位页接口
      [constants.ENTITY_SUIT]: '/assetManager/pub/getAssetBySuiteId',
      [constants.ENTITY_ALL]: '/assetManager/suite/getAssetListBySuiteId',
      [constants.ENTITY_NEW]: ' /assetManager/suite/addAssetBySuiteIdAndCategoryId',
      [constants.ENTITY_DELETE]: '/assetManager/suite/deleteAssetBySuiteIdAndCategoryId',
      [constants.ENTITY_MODIFY]: '/assetManager/suite/modAssetBySuiteIdAndCategoryId',
      [constants.ENTITY_RECOMMEND]: '/assetManager/asset/recommendAsset',
    };
  }
}

export default Api;

