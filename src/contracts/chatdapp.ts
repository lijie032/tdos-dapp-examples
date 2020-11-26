export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const userIds = Store.from<Address, string>('userIds');
const ZERO_ADDRESS = new Address((new Uint8Array(20)).buffer);

class ChatContext{
    user: Address
    nickname: string
    context: string
    time: string

    constructor(
        user: Address,
        nickname: string,
        context: string,
        time: string
    ) {
        this.user = user;
        this.nickname = nickname;
        this.context = context;
        this.time = time;
    }

    static fromEncoded(buf: ArrayBuffer): ChatContext {
        const li = RLPList.fromEncoded(buf);
        const chatContext = new ChatContext(ZERO_ADDRESS, '', '', '');
        chatContext.user = new Address(li.getItem(0).bytes());
        chatContext.nickname = li.getItem(1).string();
        chatContext.context = li.getItem(2).string();
        chatContext.time = li.getItem(3).string();
        return chatContext;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encode<Address>(this.user));
        els.push(RLP.encodeString(this.nickname));
        els.push(RLP.encodeString(this.context));
        els.push(RLP.encodeString(this.time));
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
    return userIds.get(addr) != '';
}

export function registration(addr: Address, nickname: string): void {
    assert(userIds.get(addr) == '', "user has registration");
    let lastUserId = Globals.get<u64>('lastUserId');
    userIds.set(addr, nickname);
    Globals.set<u64>('lastUserId', lastUserId + 1);
}

export function getNickname(addr: Address): string {
    assert(userIds.get(addr) != '', "user has not registration");
    return userIds.get(addr);
}

export function saveChat(addr: Address, context: string, time: string): void {
    assert(userIds.get(addr) != '', "user has not registration");
    let nickname = userIds.get(addr);
    let chatContextsArray = decodeChatContexts(Globals.get<ArrayBuffer>('contexts'));
    let chatContext = new ChatContext(addr, nickname, context, time);
    chatContextsArray.push(chatContext)
    Globals.set<ArrayBuffer>('contexts', encodeChatContexts(chatContextsArray));
}

export function getChat(): ArrayBuffer {
    return Globals.get<ArrayBuffer>('contexts');
}
