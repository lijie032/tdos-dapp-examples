export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import { Context, Store, log, Address, Globals, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

export const ZERO_ARRAYBUFFER = new ArrayBuffer(0)
const photoList = Store.from<Address, ArrayBuffer>('photoList');

class Photo{
    photo: ArrayBuffer
    phonefix: string
    height: u64

    constructor(
        photo: ArrayBuffer,
        phonefix: string,
        height: u64
    ) {
        this.photo = photo;
        this.phonefix = phonefix;
        this.height = height;
    }

    static fromEncoded(buf: ArrayBuffer): Photo {
        const li = RLPList.fromEncoded(buf);
        const photo = new Photo(ZERO_ARRAYBUFFER, '', 0);
        photo.photo = li.getItem(0).bytes();
        photo.phonefix = li.getItem(1).string();
        photo.height = li.getItem(2).u64();
        return photo;
    }

    getEncoded(): ArrayBuffer {
        const els = new Array<ArrayBuffer>();
        els.push(RLP.encodeBytes(this.photo));
        els.push(RLP.encodeString(this.phonefix));
        els.push(RLP.encodeU64(this.height));
        return RLP.encodeElements(els);
    }
}

function encodePhotos(Photos: Array<Photo>): ArrayBuffer {
    const ret = new Array<ArrayBuffer>();
    for (let i = 0; i < Photos.length; i++) {
        ret.push(Photos[i].getEncoded());
    }
    return RLP.encodeElements(ret);
}


function decodePhotos(buf: ArrayBuffer): Array<Photo> {
    const ret = new Array<Photo>();
    const li = RLPList.fromEncoded(buf);
    for (let i = 0; i < i32(li.length()); i++) {
        ret.push(Photo.fromEncoded(li.getRaw(i)));
    }
    return ret;
}

export function init(): void {
    log('相册合约已部署');
}

export function addPhoto(photo: ArrayBuffer, photofix: string): void {
    const msg = Context.msg();
    let PhotoArray : Array<Photo>
    if(photoList.has(msg.sender))
    {
        PhotoArray = decodePhotos(photoList.get(msg.sender));
    }
    else
    {
        PhotoArray = new Array<Photo>();
    }
    const h = Context.header();
    let photoinfo = new Photo(photo, photofix, h.height);
    PhotoArray.push(photoinfo);
    let savePhotoArrayBuffer = encodePhotos(PhotoArray);
    photoList.set(msg.sender, savePhotoArrayBuffer);
}

export function getPhotos(): ArrayBuffer {
    const msg = Context.msg();
    if(photoList.has(msg.sender))
    {
        return photoList.get(msg.sender);
    }
    return new ArrayBuffer(0);
}
