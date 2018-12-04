import * as constants from './constants';

export default {
  [constants.ENTITY_LIST]: '/invoice/loadInvoiceList',
  [constants.ENTITY_DETAIL]: '/invoice/loadInvoiceDetail',
  [constants.ENTITY_RECEIVE]: '/invoice/taxReceiveByManual',
  [constants.ENTITY_CONFIRM]: '/invoice/certification',
  [constants.ENTITY_RECORD]: '/invoice/bookKeep',
  [constants.ENTITY_COMPANY]: '/dropDown/companyDropDown',
  [constants.ENTITY_STATUS]: '/dropDown/invoiceStatusDropDown',
  [constants.ENTITY_ACCOUNT]: '/dropDown/accountingDropDown',
};

