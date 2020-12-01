export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const changeList = Store.from<ArrayBuffer, ArrayBuffer>('changeList');

class Change{
    from: string
    to: string
    amount: u64
    rate: string
    height: u64

    constructor(
        from: string,
        to: string,
        amount: u64,
        rate: string,
        height: u64
    ) {
        this.from = from;
        this.to = to;
        this.amount = amount;
        this.rate = rate;
        this.height = height;
    }

    static fromEncoded(buf: ArrayBuffer): Change {
        const li = RLPList.fromEncoded(buf);
        const change = new Change('', '', 0, '', 0);
        change.from = li.getItem(0).string();
        change.to = li.getItem(1).string();
        change.amount = li.getItem(2).u64();
        change.rate = li.getItem(3).string();
        change.height = li.getItem(4).u64();
        return change;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.from));
        els.push(RLP.encodeString(this.to));
        els.push(RLP.encodeU64(this.amount));
        els.push(RLP.encodeString(this.rate));
        els.push(RLP.encodeU64(this.height));
        return RLP.encodeElements(els);
    }
}

export function init(): void {
    Globals.set<string>("ETB", '2.0')
    Globals.set<string>("BTE", '0.5')
    log('交易合约已部署');
}

export function getETB(): string {
    return  Globals.get<string>("ETB")
}

export function getBTE(): string {
    return  Globals.get<string>("BTE")
}

export function saveChange(from: string, to: string, amount: u64, rate: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    let change = new Change(from, to, amount, rate, h.height)
    changeList.set(tx.hash, change.getEncoded())
}

export function getChange(tx: ArrayBuffer): ArrayBuffer {
    return changeList.get(tx)
}
