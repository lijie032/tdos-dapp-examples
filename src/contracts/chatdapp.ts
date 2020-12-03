export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const userIds = Store.from<Address, string>('userIds');
const ZERO_ADDRESS = new Address((new Uint8Array(20)).buffer);

class ChatContext{
    user: Address
    nickname: string
    context: string
    time: string
    hash: ArrayBuffer

    constructor(
        user: Address,
        nickname: string,
        context: string,
        time: string,
        hash: ArrayBuffer
    ) {
        this.user = user;
        this.nickname = nickname;
        this.context = context;
        this.time = time;
        this.hash = hash;
    }

    static fromEncoded(buf: ArrayBuffer): ChatContext {
        const li = RLPList.fromEncoded(buf);
        const chatContext = new ChatContext(ZERO_ADDRESS, '', '', '', new ArrayBuffer(0));
        chatContext.user = new Address(li.getItem(0).bytes());
        chatContext.nickname = li.getItem(1).string();
        chatContext.context = li.getItem(2).string();
        chatContext.time = li.getItem(3).string();
        chatContext.hash = li.getItem(4).bytes();
        return chatContext;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encode<Address>(this.user));
        els.push(RLP.encodeString(this.nickname));
        els.push(RLP.encodeString(this.context));
        els.push(RLP.encodeString(this.time));
        els.push(RLP.encodeBytes(this.hash));
        return RLP.encodeElements(els);
    }
}

function encodeChatContexts(ChatContexts: Array<ChatContext>): ArrayBuffer {
    const ret = new Array<ArrayBuffer>();
    for (let i = 0; i < ChatContexts.length; i++) {
        ret.push(ChatContexts[i].getEncoded());
    }
    return RLP.encodeElements(ret);
}


function decodeChatContexts(buf: ArrayBuffer): Array<ChatContext> {
    const ret = new Array<ChatContext>();
    const li = RLPList.fromEncoded(buf);
    for (let i = 0; i < i32(li.length()); i++) {
        ret.push(ChatContext.fromEncoded(li.getRaw(i)));
    }
    return ret;
}

export function init(): void {
    Globals.set<u64>('lastUserId', 0);
    let chatContextsArray = new Array<ChatContext>();
    let chatContexts = encodeChatContexts(chatContextsArray);
    Globals.set<ArrayBuffer>('contexts', chatContexts);
    log('聊天合约已部署');
}

export function hasUser(addr: Address): boolean {
    return userIds.has(addr);
}

export function registration(nickname: string): void {
    const msg = Context.msg();
    assert(!userIds.has(msg.sender), "user has registration");
    let lastUserId = Globals.get<u64>('lastUserId');
    userIds.set(msg.sender, nickname);
    Globals.set<u64>('lastUserId', lastUserId + 1);
}

export function getNickname(addr: Address): string {
    assert(userIds.has(addr), "user has not registration");
    return userIds.get(addr);
}

export function saveChat(context: string, time: string): void {
    const msg = Context.msg();
    assert(userIds.has(msg.sender), "user has not registration");
    let nickname = userIds.get(msg.sender);
    let chatContextsArray = decodeChatContexts(Globals.get<ArrayBuffer>('contexts'));
    const tx = Context.transaction()
    let chatContext = new ChatContext(msg.sender, nickname, context, time, tx.hash);
    chatContextsArray.push(chatContext)
    Globals.set<ArrayBuffer>('contexts', encodeChatContexts(chatContextsArray));
}

export function getChat(): ArrayBuffer {
    return Globals.get<ArrayBuffer>('contexts');
}

export function getUserId(): u64 {
    return Globals.get<u64>('lastUserId');
}
