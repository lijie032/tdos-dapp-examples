export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const voterInfoList = Store.from<Address, ArrayBuffer>('voterInfoList');

class VoteInfo{
    title: string
    voteA: string
    voteB: string
    infoA: string
    infoB: string
    amountA: u64
    amountB: u64

    constructor(
        title: string,
        voteA: string,
        voteB: string,
        infoA: string,
        infoB: string,
        amountA: u64,
        amountB: u64
    ) {
        this.title = title;
        this.voteA = voteA;
        this.voteB = voteB;
        this.infoA = infoA;
        this.infoB = infoB;
        this.amountA = amountA;
        this.amountB = amountB;
    }

    static fromEncoded(buf: ArrayBuffer): VoteInfo {
        const li = RLPList.fromEncoded(buf);
        const voteInfo = new VoteInfo('','','','', '', 0, 0);
        voteInfo.title = li.getItem(0).string();
        voteInfo.voteA = li.getItem(1).string();
        voteInfo.voteB = li.getItem(2).string();
        voteInfo.infoA = li.getItem(3).string();
        voteInfo.infoB = li.getItem(4).string();
        voteInfo.amountA = li.getItem(5).u64();
        voteInfo.amountB = li.getItem(6).u64();
        return voteInfo;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.title));
        els.push(RLP.encodeString(this.voteA));
        els.push(RLP.encodeString(this.voteB));
        els.push(RLP.encodeString(this.infoA));
        els.push(RLP.encodeString(this.infoB));
        els.push(RLP.encodeU64(this.amountA));
        els.push(RLP.encodeU64(this.amountB));
        return RLP.encodeElements(els);
    }
}

export function init(): void {
    let title = '先有鸡还是先有蛋？';
    let voteA = '我支持先有鸡';
    let voteB = '我支持先有蛋';
    let infoA = '2010年英国科学家福利本和奥德曼等研究人员发现，鸡蛋的构造取决于在母鸡卵巢中发现的一种蛋白，这种蛋白称为ovocledidin-17(简称OC-17)，没有OC-17蛋白，鸡蛋的外表部分就无法结晶，形成蛋壳。所以先有了鸡才能形成蛋。';
    let infoB = '2008年，加拿大古生物学家在沙土成堆的巢穴里发现了五枚卵蛋，这个巢穴有半米宽，重达50千克。通过对这一个巢穴和卵蛋的研究，加拿大科学家称，恐龙首先要建造类似鸟窝的巢穴，产下了类似鸟蛋的蛋，然后恐龙再进化成鸟类（鸡也属于鸟类的一种），这就是说，蛋先于鸡之前就存在了。鸡是由这些产下了类似鸡蛋的肉食恐龙进化而成。';
    let amountA = 0;
    let amountB = 0;
    let voteInfo= new VoteInfo(title, voteA, voteB, infoA, infoB, amountA, amountB);
    Globals.set<ArrayBuffer>('voteInfo', voteInfo.getEncoded())
    log('投票合约已部署');
}

export function vote(offset: u64): void {
    const msg = Context.msg();
    const tx = Context.transaction();
    if(!voterInfoList.has(msg.sender))
    {
        voterInfoList.set(msg.sender, tx.hash);
    }
    let voteInfo = VoteInfo.fromEncoded(Globals.get<ArrayBuffer>('voteInfo'));
    if(offset == 0)
    {
        voteInfo.amountA = voteInfo.amountA + 1;
    }
    else
    {
        voteInfo.amountB = voteInfo.amountB + 1;
    }
    Globals.set<ArrayBuffer>('voteInfo', voteInfo.getEncoded())
}

export function hasVote(addr: Address): boolean {
    return voterInfoList.has(addr);
}

export function getVote(): ArrayBuffer {
    return Globals.get<ArrayBuffer>('voteInfo');
}

export function getVoteInfo(addr: Address): ArrayBuffer {
    return voterInfoList.get(addr);
}
