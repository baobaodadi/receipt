import * as constants from './constants';

export default {
  [constants.ENTITY_LIST]: '/invoice/loadInvoiceList',
  [constants.ENTITY_DETAIL]: '/invoice/loadInvoiceDetail',
  [constants.ENTITY_RECEIVE]: '/invoice/taxReceiveByManual',
  [constants.ENTITY_CERTIFICATION]: '/invoice/certification',
  [constants.ENTITY_BOOKKEEP]: '/invoice/bookKeep',
  [constants.ENTITY_COMPANY]: '/dropDown/companyDropDown',
  [constants.ENTITY_STATUS]: '/dropDown/invoiceStatusDropDown',
  [constants.ENTITY_ACCOUNT]: '/dropDown/accountingDropDown',
};

