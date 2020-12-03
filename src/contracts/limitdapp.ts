export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const limitUserTime = Store.from<string, u64>('limitUserTime');

const serialArray = ['2i0H7H09M1PT010hk8Mpua6ef4r5dqBh','PM59e998OvLhBNL4XEFk2MxxDP5eODUi','X793O76alC0LIwqK9wLxVDxGk9b6MRd0','8u7991vv42qPf5SrjMn9JKV98nA690FW','90iN4l57840kHfW1e649mH522t7A12cE','JPQid2JBH1vjs3WhR7o8T18sIwDXCiRG','Qb3j1k1i3wu5wLR8y2dbpODglRumpkjD','FRFWWPa1FXgKuid4NG0CdGb40C744SsM','eG54nktOK41CTv3Lhhns1x97K8BkRWWH','S379RKKM8C1P6CGOF47NJsxi7s6q6Iv7','3GwcF90f4sQY737Pq46K8w47LQM520NY','NH0GV2TdRcxPs71VuT7MlUH646TmbF08','2M5SBwAS9etGk4cT56s42tWu1mAV3w8T','rURdfgFJIYGiu7tS4DkKYnh32jqjiL39','SQEenjeVGP2dv7QheK9FRp2P4Y1QRkl5','lPJ1rC140ItWriYnHFBij3wapp6UWjtV','OOMRKCtmKmtBwC2hQ83j6r4JB3Yk145f','xc6jTtaNLn80qcDjevtmBOjee9YI7ug2','nRHJ3PEHdEFEUEQWe0O27AKI33xDy57x','7Qagqj2N8DcEd8W9b52c3KsafDjYp3e8','8624V1u4X99TqA9oa5i6TmTwAVuCyEt0','50XA223T5f0I6D9p1AN1W5xF5XFD2aei','K3qKNoESv86Os6SBcD3ryirshKCdNTEI','3uSPA0nIIE44sMIQUs3E5x9G1A4K716L','Dni9rcIMuA2fMgTMCa6Y348BC3wFPvOo','Eh6ldlmW1E8m9BBlh995Tm7EuE0s6mIl','U5sDO2h381ObkQgC4o3h5YV3bokKpuTs','OK72sIh30qeicqrViwH6KN6TDPg1GBXs','EjqMBB5nXQg2rMNUBXOU38AMv5fqe5IP','w62S69x66Oi2vP74dMqdEHTfSipWaYMO','hwmdGm040W7d02Qtuc4pNDD5i70lN4hP','nTiFpdl4F0SwcxAcjX0T1H81VG6gNq71','g1NxB6tvRb39w3lG9UNY52oUS912I645','34x072Kw2h0BQNAwjg7mC6m76J7ixs7U','02Sob1mk196gIm989hNI67IMx9y627R5','75S1jLrFx6rYHnpK2Pp1C6410n6UVGQ9','i4aW01Fa6tX7yRxYvNcGO00m3xaicJjT','E7KjtWNs56420SnXKw6Rv7D9Yc8j1x38','xIT5wMUgL10GtJKbVJ4FG1kWsQ6M503d','W927Jp17C2o0oVe75IvI49Ymilb60c0x','dV826ia40m04RkbQ829856XGwmwyX89f','af9LVg79luJxf2aVIp20WVhM8Obvkj38','4XwjTku1H5r21aigAn6gjR1dv29S45R7','6ieg0uku4ibVc16q9575I5myCRiJ7eU4','jOKbt3dfo361V52R4g862C4c60xERGpr','yJ06gw1DXD6xndQqaH76X521b7dX34ih','07yV2HN23f2t1jSXn2gDhU7wGrsQEhQN','k5BEhc19muc1BY6a2B5TC1OqmseM5yow','jI2ux35TF8uJrShd9JP3F28guA3M060F','h99wSLo341920TTY80n7j0hSPKlbGb5R']

function encodeStrings(arr: string[]): ArrayBuffer {
    const ret = new Array<ArrayBuffer>();
    for (let i = 0; i < arr.length; i++) {
        ret.push(RLP.encodeString(arr[i]));
    }
    return RLP.encodeElements(ret);
}

function decodeStrings(buf: ArrayBuffer): string[] {
    const ret = new Array<string>();
    const li = RLPList.fromEncoded(buf);
    for (let i = 0; i < i32(li.length()); i++) {
        ret.push(li.getItem(i).string());
    }
    return ret;
}

export function init(endTime: string): void {
    let userid = 0;
    for (let i = 0; i < serialArray.length; i++) {
        userid = userid + 1;
        limitUserTime.set(serialArray[i], userid);
    }
    Globals.set<u64>('userId', userid)
    Globals.set<string>('endTime', endTime)
    log('权限合约已部署');
}

// 查询注册码是否存在
export function hasSerial(serial: string): boolean {
    return  limitUserTime.has(serial);
}

// 获取注册码时间
export function getTime(serial: string): string {
    return  Globals.get<string>('endTime');
}

// 新注册码加入
export function setSerial(serial: string): void {
    assert(!limitUserTime.has(serial), "serial has register");
    let userid = Globals.get<u64>('userId');
    Globals.set<u64>('userId', userid+1)
    limitUserTime.set(serial, userid+1);
}

// 修改注册码过期时间
export function updateTime(time: string): void {
    Globals.set<string>('endTime', time);
}

// 获取白名单
export function getSerials(): ArrayBuffer {
    return encodeStrings(serialArray);
}
