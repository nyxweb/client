import MEMB_STAT from './MEMB_STAT';
import _nyxResources from './_nyxResources';
import warehouse from './warehouse';

export default interface AccountState {
  loading: boolean;

  info: {
    memb___id: string;
    memb_name: string;
    sno__numb: string;
    mail_addr: string;
    bloc_code: number;
    ctl1_code: number;
    IsVip: number;
    VipExpirationTime: number;
    reg_ip: string;
    admin_lvl: number;
    status: MEMB_STAT;
    resources: _nyxResources;
    warehouse: warehouse;
  } | null;

  vip: {} | null;
  online: {} | null;
  logs: {} | null;
}
