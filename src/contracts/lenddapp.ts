export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const lendInfoList = Store.from<ArrayBuffer, ArrayBuffer>('lendInfoList');

class LendInfo{
    amount: u64
    time: string
    profit: u64
    interest: u64
    rate: u64
    height: u64

    constructor(
        amount: u64,
        time: string,
        profit: u64,
        interest: u64,
        rate: u64,
        height: u64
    ) {
        this.amount = amount;
        this.time = time;
        this.profit = profit;
        this.interest = interest;
        this.rate = rate;
        this.height = height;
    }

    static fromEncoded(buf: ArrayBuffer): LendInfo {
        const li = RLPList.fromEncoded(buf);
        const lendInfo = new LendInfo(0,'',0, 0, 0, 0);
        lendInfo.amount = li.getItem(0).u64();
        lendInfo.time = li.getItem(1).string();
        lendInfo.profit = li.getItem(2).u64();
        lendInfo.interest = li.getItem(3).u64();
        lendInfo.rate = li.getItem(4).u64();
        lendInfo.height = li.getItem(5).u64();
        return lendInfo;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeU64(this.amount));
        els.push(RLP.encodeString(this.time));
        els.push(RLP.encodeU64(this.profit));
        els.push(RLP.encodeU64(this.interest));
        els.push(RLP.encodeU64(this.rate));
        els.push(RLP.encodeU64(this.height));
        return RLP.encodeElements(els);
    }
}

export function init(): void {
    Globals.set<u64>('totalMoney', 500000);
    log('闪电贷合约已部署');
}

export function lend(amount: u64, time: string, rate: u64, profit: u64): ArrayBuffer {
    const tx = Context.transaction();
    const h = Context.header();
    let totalMoney = Globals.get<u64>('totalMoney');
    let interest = amount * rate / 100;
    if(profit < interest)
    {
        return new ArrayBuffer(0);
    }
    let lendInfo = new LendInfo(amount, time, profit, interest, rate, h.height);
    lendInfoList.set(tx.hash, lendInfo.getEncoded())
    Globals.set<u64>('totalMoney', totalMoney + interest);
    return lendInfo.getEncoded();
}

export function getLendInfo(hash: ArrayBuffer): ArrayBuffer {
    return lendInfoList.get(hash);
}

export function getTotalMoney(): u64 {
    return Globals.get<u64>('totalMoney');
}
