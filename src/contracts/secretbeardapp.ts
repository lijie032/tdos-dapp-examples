export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const bearList = Store.from<Address, ArrayBuffer>('bearList');

class Bear{
    username: string
    birth: string
    aggressivity: u64
    bloodvolume: u64
    stature: u64
    tonnage: u64
    defense: u64
    level: u64
    hash: ArrayBuffer

    constructor(
        username: string,
        birth: string,
        aggressivity: u64,
        bloodvolume: u64,
        stature: u64,
        tonnage: u64,
        defense: u64,
        level: u64,
        hash: ArrayBuffer
    ) {
        this.username = username;
        this.birth = birth;
        this.aggressivity = aggressivity;
        this.bloodvolume = bloodvolume;
        this.stature = stature;
        this.tonnage = tonnage;
        this.defense = defense;
        this.level = level;
        this.hash = hash;
    }

    static fromEncoded(buf: ArrayBuffer): Bear {
        const li = RLPList.fromEncoded(buf);
        const bear = new Bear('','',0,0,0,0,0, 0, new ArrayBuffer(0));
        bear.username = li.getItem(0).string();
        bear.birth = li.getItem(1).string();
        bear.aggressivity = li.getItem(2).u64();
        bear.bloodvolume = li.getItem(3).u64();
        bear.stature = li.getItem(4).u64();
        bear.tonnage = li.getItem(5).u64();
        bear.defense = li.getItem(6).u64();
        bear.level = li.getItem(7).u64();
        bear.hash = li.getItem(8).bytes();
        return bear;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.username));
        els.push(RLP.encodeString(this.birth));
        els.push(RLP.encodeU64(this.aggressivity));
        els.push(RLP.encodeU64(this.bloodvolume));
        els.push(RLP.encodeU64(this.stature));
        els.push(RLP.encodeU64(this.tonnage));
        els.push(RLP.encodeU64(this.defense));
        els.push(RLP.encodeU64(this.level));
        els.push(RLP.encodeBytes(this.hash));
        return RLP.encodeElements(els);
    }
}

export function init(): void {
    log('加密熊合约已部署');
}

export function buy(username: string, birth: string, aggressivity: u64, bloodvolume: u64, stature: u64, tonnage: u64, defense: u64): void {
    const msg = Context.msg();
    const h = Context.header();
    const tx = Context.transaction();
    assert(!bearList.has(msg.sender), "user has buy");
    let bear = new Bear(username, birth, aggressivity, bloodvolume, stature, tonnage, defense, 1, tx.hash);
    bearList.set(msg.sender, bear.getEncoded());
}

export function buyLevel(): void {
    const msg = Context.msg();
    assert(bearList.has(msg.sender), "user has not buy");
    const h = Context.header();
    const tx = Context.transaction();
    let bear = Bear.fromEncoded(bearList.get(msg.sender));
    bear.aggressivity = bear.aggressivity + 10;
    bear.bloodvolume = bear.bloodvolume + 50000;
    bear.stature = bear.stature + 2;
    bear.tonnage = bear.tonnage + 2;
    bear.defense = bear.defense + 2000;
    bear.level = bear.level + 1;
    bear.hash = tx.hash;
    bearList.set(msg.sender, bear.getEncoded());
}

export function hasBear(addr: Address): boolean {
    return bearList.has(addr);
}

export function getBear(addr: Address): ArrayBuffer {
    return bearList.get(addr);
}
