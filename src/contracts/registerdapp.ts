export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const registerList = Store.from<string, ArrayBuffer>('registerList');
const registerInfoList = Store.from<ArrayBuffer, ArrayBuffer>('registerInfoList');

class Register{
    username: string
    sex: string
    phone: string
    designation: string
    hash: ArrayBuffer

    constructor(
        username: string,
        sex: string,
        phone: string,
        designation: string,
        hash: ArrayBuffer
    ) {
        this.username = username;
        this.sex = sex;
        this.phone = phone;
        this.designation = designation;
        this.hash = hash;
    }

    static fromEncoded(buf: ArrayBuffer): Register {
        const li = RLPList.fromEncoded(buf);
        const chatContext = new Register('', '', '', '', new ArrayBuffer(0));
        chatContext.username = li.getItem(0).string();
        chatContext.sex = li.getItem(1).string();
        chatContext.phone = li.getItem(2).string();
        chatContext.designation = li.getItem(3).string();
        chatContext.hash = li.getItem(4).bytes();
        return chatContext;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.username));
        els.push(RLP.encodeString(this.sex));
        els.push(RLP.encodeString(this.phone));
        els.push(RLP.encodeString(this.designation));
        els.push(RLP.encodeBytes(this.hash));
        return RLP.encodeElements(els);
    }
}

function encodeRegisters(Registers: Array<Register>): ArrayBuffer {
    const ret = new Array<ArrayBuffer>();
    for (let i = 0; i < Registers.length; i++) {
        ret.push(Registers[i].getEncoded());
    }
    return RLP.encodeElements(ret);
}


function decodeRegisters(buf: ArrayBuffer): Array<Register> {
    const ret = new Array<Register>();
    const li = RLPList.fromEncoded(buf);
    for (let i = 0; i < i32(li.length()); i++) {
        ret.push(Register.fromEncoded(li.getRaw(i)));
    }
    return ret;
}

export function init(): void {
    Globals.set<u64>('registerId', 0);
    let registersArray = new Array<Register>();
    let registers = encodeRegisters(registersArray);
    Globals.set<ArrayBuffer>('registers', registers);
    log('登记合约已部署');
}

export function hasPhone(phone: string): boolean {
    return registerList.has(phone);
}

export function getRegisterId(): u64 {
    return Globals.get<u64>('registerId');
}

export function getRegisters(): ArrayBuffer {
    return Globals.get<ArrayBuffer>('registers');
}

export function getRegister(hash: ArrayBuffer): ArrayBuffer {
    if(registerInfoList.has(hash))
    {
        return registerInfoList.get(hash);
    }
    return new ArrayBuffer(0);
}

export function saveRegister(username: string, sex: string, phone: string, designation: string): void {
    const tx = Context.transaction();
    assert(!registerList.has(phone), "user has registration");
    let registerId = Globals.get<u64>('registerId');
    let register = new Register(username, sex, phone, designation, tx.hash);
    let cregistersArray = decodeRegisters(Globals.get<ArrayBuffer>('registers'));
    cregistersArray.push(register);
    registerList.set(phone, register.getEncoded());
    registerInfoList.set(tx.hash, register.getEncoded());
    Globals.set<u64>('registerId', registerId + 1);
    Globals.set<ArrayBuffer>('contexts', encodeRegisters(cregistersArray));
}
