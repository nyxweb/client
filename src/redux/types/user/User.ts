import _nyxResources from './_nyxResources';
import MEMB_STAT from './MEMB_STAT';

export default interface UserState {
  memb___id: string | null;
  memb_name: string | null;
  sno__numb: string | null;
  mail_addr: string | null;
  bloc_code: number | null;
  ctl1_code: number | null;
  IsVip: number | null;
  VipExpirationTime: number | null;
  reg_ip: string | null;
  jwt_token: string | null;
  admin_lvl: number | null;
  status: MEMB_STAT | null;
  resources: _nyxResources | null;
}
