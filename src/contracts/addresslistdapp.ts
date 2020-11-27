export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

const addressList = Store.from<Address, ArrayBuffer>('addressList');

class Book{
    username: string
    phone: string
    memo: string
    height: u64

    constructor(
        username: string,
        phone: string,
        memo: string,
        height: u64
    ) {
        this.username = username;
        this.phone = phone;
        this.memo = memo;
        this.height = height;
    }

    static fromEncoded(buf: ArrayBuffer): Book {
        const li = RLPList.fromEncoded(buf);
        const book = new Book('', '', '', 0);
        book.username = li.getItem(0).string();
        book.phone = li.getItem(1).string();
        book.memo = li.getItem(2).string();
        book.height = li.getItem(3).u64();
        return book;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeString(this.username));
        els.push(RLP.encodeString(this.phone));
        els.push(RLP.encodeString(this.memo));
        els.push(RLP.encodeU64(this.height));
        return RLP.encodeElements(els);
    }
}

function encodeBooks(Books: Array<Book>): ArrayBuffer {
    const ret = new Array<ArrayBuffer>();
    for (let i = 0; i < Books.length; i++) {
        ret.push(Books[i].getEncoded());
    }
    return RLP.encodeElements(ret);
}


function decodeBooks(buf: ArrayBuffer): Array<Book> {
    const ret = new Array<Book>();
    const li = RLPList.fromEncoded(buf);
    for (let i = 0; i < i32(li.length()); i++) {
        ret.push(Book.fromEncoded(li.getRaw(i)));
    }
    return ret;
}

export function init(): void {
    log('通讯录合约已部署');
}

export function addBook(addr: Address, username: string, phone: string, memo: string): void {
    let BookArray : Array<Book>
    if(addressList.has(addr))
    {
        BookArray = decodeBooks(addressList.get(addr));
    }
    else
    {
        BookArray = new Array<Book>();
    }
    const h = Context.header();
    let book = new Book(username, phone, memo, h.height);
    BookArray.push(book);
    let saveBookArrayBuffer = encodeBooks(BookArray);
    addressList.set(addr, saveBookArrayBuffer);
}

export function getBooks(addr: Address): ArrayBuffer {
    if(addressList.has(addr))
    {
        return addressList.get(addr);
    }
    return new ArrayBuffer(0);
}
