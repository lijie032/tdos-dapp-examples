export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const tokenList = Store.from<ArrayBuffer, ArrayBuffer>('tokenList');

class Token{
    name: string
    owner: string
    totalSupply: u64
    seo: boolean
    info: string
    height: u64

    constructor(
        name: string,
        owner: string,
        totalSupply: u64,
        seo: boolean,
        info: string,
        height: u64
    ) {
        this.name = name;
        this.owner = owner;
        this.totalSupply = totalSupply;
        this.seo = seo;
        this.info = info;
        this.height = height;
    }

    static fromEncoded(buf: ArrayBuffer): Token {
        const li = RLPList.fromEncoded(buf);
        const token = new Token('', '', 0, false, '', 0);
        token.name = li.getItem(0).string();
        token.owner = li.getItem(1).string();
        token.totalSupply = li.getItem(2).u64();
        token.seo = li.getItem(3).u8() != 0;
        token.info = li.getItem(4).string();
        token.height = li.getItem(5).u64();
        return token;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.name));
        els.push(RLP.encodeString(this.owner));
        els.push(RLP.encodeU64(this.totalSupply));
        els.push(RLP.encodeU64(this.seo ? 1 : 0));
        els.push(RLP.encodeString(this.info));
        els.push(RLP.encodeU64(this.height));
        return RLP.encodeElements(els);
    }
}

export function init(): void {
    log('发行代币合约已部署');
}

export function saveToken(name: string, owner: string, totalSupply: u64, seo: boolean, info: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Token(name, owner, totalSupply, seo, info, h.height)
    tokenList.set(tx.hash, u.getEncoded())
}

export function getToken(hash: ArrayBuffer): ArrayBuffer {
    if(tokenList.has(hash))
    {
        return tokenList.get(hash);
    }
    return new ArrayBuffer(0);
}
