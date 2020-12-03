export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const crowdSaleList = Store.from<ArrayBuffer, ArrayBuffer>('crowdSaleList');

class CrowdSale{
    addr: string
    fundingGoal: u64
    amount: u64
    info: string
    hash: ArrayBuffer

    constructor(
        addr: string,
        fundingGoal: u64,
        amount: u64,
        info: string,
        hash: ArrayBuffer
    ) {
        this.addr = addr;
        this.fundingGoal = fundingGoal;
        this.amount = amount;
        this.info = info;
        this.hash = hash;
    }

    static fromEncoded(buf: ArrayBuffer): CrowdSale {
        const li = RLPList.fromEncoded(buf);
        const crowdSale = new CrowdSale('',0,0,'', new ArrayBuffer(0));
        crowdSale.addr = li.getItem(0).string();
        crowdSale.fundingGoal = li.getItem(1).u64();
        crowdSale.amount = li.getItem(2).u64();
        crowdSale.info = li.getItem(3).string();
        crowdSale.hash = li.getItem(3).bytes();
        return crowdSale;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.addr));
        els.push(RLP.encodeU64(this.fundingGoal));
        els.push(RLP.encodeU64(this.amount));
        els.push(RLP.encodeString(this.info));
        els.push(RLP.encodeBytes(this.hash));
        return RLP.encodeElements(els);
    }
}

class CrowdSaleInfo{
    addr: string
    fundingGoal: u64
    amountRaised: u64
    people: u64
    info: string

    constructor(
        addr: string,
        fundingGoal: u64,
        amountRaised: u64,
        people: u64,
        info: string
    ) {
        this.addr = addr;
        this.fundingGoal = fundingGoal;
        this.amountRaised = amountRaised;
        this.people = people;
        this.info = info;
    }

    static fromEncoded(buf: ArrayBuffer): CrowdSaleInfo {
        const li = RLPList.fromEncoded(buf);
        const crowdSaleInfo = new CrowdSaleInfo('',0,0,0, '');
        crowdSaleInfo.addr = li.getItem(0).string();
        crowdSaleInfo.fundingGoal = li.getItem(1).u64();
        crowdSaleInfo.amountRaised = li.getItem(2).u64();
        crowdSaleInfo.people = li.getItem(3).u64();
        crowdSaleInfo.info = li.getItem(4).string();
        return crowdSaleInfo;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.addr));
        els.push(RLP.encodeU64(this.fundingGoal));
        els.push(RLP.encodeU64(this.amountRaised));
        els.push(RLP.encodeU64(this.people));
        els.push(RLP.encodeString(this.info));
        return RLP.encodeElements(els);
    }
}

function encodeCrowdSaleInfos(CrowdSaleInfos: Array<CrowdSaleInfo>): ArrayBuffer {
    const ret = new Array<ArrayBuffer>();
    for (let i = 0; i < CrowdSaleInfos.length; i++) {
        ret.push(CrowdSaleInfos[i].getEncoded());
    }
    return RLP.encodeElements(ret);
}


function decodeCrowdSaleInfos(buf: ArrayBuffer): Array<CrowdSaleInfo> {
    const ret = new Array<CrowdSaleInfo>();
    const li = RLPList.fromEncoded(buf);
    for (let i = 0; i < i32(li.length()); i++) {
        ret.push(CrowdSaleInfo.fromEncoded(li.getRaw(i)));
    }
    return ret;
}

export function init(): void {
    let crowdSaleInfos= new Array<CrowdSaleInfo>();
    let crowdSaleInfoOne = new CrowdSaleInfo('', 30000, 0, 0, '我们正在经历非常的2020年。年初起的新冠疫情让人们被迫与现实隔离，网络社会的影响从未有一刻比如今更加鲜明。石墨烯材料应用、量子计算概念兴起、5G时代降临……诸此种种，都预示着未来已来。想象力推动人类前进，面对迷茫与未知，唯有艺术可以抚平。');
    let crowdSaleInfoTwo = new CrowdSaleInfo('', 50000, 0, 0, '《宇宙矿工计划》是一款区块链题材的建造类游戏，玩家是宇宙旷野的矿工，在这里动用任何资源、构建任何事务都需要通过上链操作，形成一个完整的区块链社会...');
    crowdSaleInfos.push(crowdSaleInfoOne);
    crowdSaleInfos.push(crowdSaleInfoTwo);
    Globals.set<ArrayBuffer>('crowdSaleInfoList', encodeCrowdSaleInfos(crowdSaleInfos));
    log('众筹合约已部署');
}

export function transfer(offset: u64, amount: u64): void {
    const tx = Context.transaction();
    let crowdSaleInfos = decodeCrowdSaleInfos(Globals.get<ArrayBuffer>('crowdSaleInfoList'));
    crowdSaleInfos[i32(offset)].amountRaised = crowdSaleInfos[i32(offset)].amountRaised + amount;
    crowdSaleInfos[i32(offset)].people = crowdSaleInfos[i32(offset)].people + 1;
    let crowdSale = new CrowdSale(crowdSaleInfos[i32(offset)].addr, crowdSaleInfos[i32(offset)].fundingGoal, amount, crowdSaleInfos[i32(offset)].info, tx.hash);
    crowdSaleList.set(tx.hash, crowdSale.getEncoded())
    Globals.set('crowdSaleInfoList', encodeCrowdSaleInfos(crowdSaleInfos));
}

export function getCrowdSaleInfo(): ArrayBuffer {
    return Globals.get<ArrayBuffer>('crowdSaleInfoList');
}

export function getCrowdSale(hash: ArrayBuffer): ArrayBuffer {
    if(crowdSaleList.has(hash))
    {
        return crowdSaleList.get(hash);
    }
    return new ArrayBuffer(0);
}
