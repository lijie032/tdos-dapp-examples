/**
 * dapp example in assembly script
 */
export {__malloc, __change_t, __peek} from '../../node_modules/@salaku/js-sdk/lib/prelude'
import {  Context, Store, log} from '../../node_modules/@salaku/js-sdk/lib'
import { Donor, Logistics, Fund, Music, Medical, Insure, Book, Product, Weld, Finance } from './dappstypes'

class DonorDB {
    static DONOR_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('donor')

    getDonor(hash: ArrayBuffer): Donor {
        return Donor.fromEncoded(DonorDB.DONOR_DB.get(hash))
    }

    setDonor(hash: ArrayBuffer, u: Donor): void {
        DonorDB.DONOR_DB.set(hash, u.getEncoded())
    }
}

class LogisticsDB {
    static Logistics_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('logistics')

    getLogistics(hash: ArrayBuffer): Logistics {
        return Logistics.fromEncoded(LogisticsDB.Logistics_DB.get(hash))
    }

    setLogistics(hash: ArrayBuffer, u: Logistics): void {
        LogisticsDB.Logistics_DB.set(hash, u.getEncoded())
    }
}

class FundDB {
    static Fund_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('fund')

    getFund(hash: ArrayBuffer): Fund {
        return Fund.fromEncoded(FundDB.Fund_DB.get(hash))
    }

    setFund(hash: ArrayBuffer, u: Fund): void {
        FundDB.Fund_DB.set(hash, u.getEncoded())
    }
}

class MusicDB {
    static Music_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('music')

    getMusic(hash: ArrayBuffer): Music {
        return Music.fromEncoded(MusicDB.Music_DB.get(hash))
    }

    setMusic(hash: ArrayBuffer, u: Music): void {
        MusicDB.Music_DB.set(hash, u.getEncoded())
    }
}

class MedicalDB {
    static Medical_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('medical')

    getMedical(hash: ArrayBuffer): Medical {
        return Medical.fromEncoded(MedicalDB.Medical_DB.get(hash))
    }

    setMedical(hash: ArrayBuffer, u: Medical): void {
        MedicalDB.Medical_DB.set(hash, u.getEncoded())
    }
}

class InsureDB {
    static Insure_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('insure')

    getInsure(hash: ArrayBuffer): Insure {
        return Insure.fromEncoded(InsureDB.Insure_DB.get(hash))
    }

    setInsure(hash: ArrayBuffer, u: Insure): void {
        InsureDB.Insure_DB.set(hash, u.getEncoded())
    }
}

class BookDB {
    static Book_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('book')

    getBook(hash: ArrayBuffer): Book {
        return Book.fromEncoded(BookDB.Book_DB.get(hash))
    }

    setBook(hash: ArrayBuffer, u: Book): void {
        BookDB.Book_DB.set(hash, u.getEncoded())
    }
}

class ProductDB {
    static Product_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('product')

    getProduct(hash: ArrayBuffer): Product {
        return Product.fromEncoded(ProductDB.Product_DB.get(hash))
    }

    setProduct(hash: ArrayBuffer, u: Product): void {
        ProductDB.Product_DB.set(hash, u.getEncoded())
    }
}

class WeldDB {
    static Weld_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('weld')

    getWeld(hash: ArrayBuffer): Weld {
        return Weld.fromEncoded(WeldDB.Weld_DB.get(hash))
    }

    setWeld(hash: ArrayBuffer, u: Weld): void {
        WeldDB.Weld_DB.set(hash, u.getEncoded())
    }
}

class FinanceDB {
    static Finance_DB: Store<ArrayBuffer, ArrayBuffer> = Store.from<ArrayBuffer,ArrayBuffer>('finance')

    getFinance(hash: ArrayBuffer): Finance {
        return Finance.fromEncoded(FinanceDB.Finance_DB.get(hash))
    }

    setFinance(hash: ArrayBuffer, u: Finance): void {
        FinanceDB.Finance_DB.set(hash, u.getEncoded())
    }
}

const donorDB = new DonorDB()
const logisticsDB = new LogisticsDB()
const fundDB = new FundDB()
const musicDB = new MusicDB()
const medicalDB = new MedicalDB()
const insureDB = new InsureDB()
const bookDB = new BookDB()
const productDB = new ProductDB()
const weldDB = new WeldDB()
const financeDB = new FinanceDB()

export function init(): void {
    log('金融合约已部署');
    log('物流合约已部署');
    log('公益合约已部署');
    log('资产合约已部署');
    log('音乐版权合约已部署');
    log('医疗合约已部署');
    log('保险合约已部署');
    log('著作版权合约已部署');
    log('产品溯源合约已部署');
    log('焊接合约已部署');
}

// 公益保存
export function saveDonor(name: string, content: string, beneficiaryAddress: string, beneficiary: string, donation: string, state: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Donor(name, content, beneficiaryAddress, beneficiary, donation, state, h.height)
    donorDB.setDonor(tx.hash, u)
}

// 公益获取
export function getDonor(hash: ArrayBuffer): ArrayBuffer {
    if(!DonorDB.DONOR_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return DonorDB.DONOR_DB.get(hash)
}

// 物流保存
export function saveLogistics(sender: string,address: string,senderPhone: string,goods: string,receiver: string,cid: string,receiverPhone: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Logistics(sender, address, senderPhone, goods, receiver, cid, receiverPhone, h.height)
    logisticsDB.setLogistics(tx.hash, u)
}

// 物流获取
export function getLogistics(hash: ArrayBuffer): ArrayBuffer {
    if(!LogisticsDB.Logistics_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return LogisticsDB.Logistics_DB.get(hash)
}

// 资产保存
export function saveFund(name: string, content: string, granter: string, condition: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Fund(name, content, granter, condition, false, h.height)
    fundDB.setFund(tx.hash, u)
}

// 资产确认
export function confirmFund(hash: ArrayBuffer): void {
    const u = fundDB.getFund(hash)
    u.grant = true
    fundDB.setFund(hash, u)
}

// 资产获取
export function getFund(hash: ArrayBuffer): ArrayBuffer {
    if(!FundDB.Fund_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return FundDB.Fund_DB.get(hash)
}

// 音乐保存
export function saveMusic(name: string, long: string, singer: string, copyright: string, info: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Music(name, long, singer, copyright, info, h.height)
    musicDB.setMusic(tx.hash, u)
}

// 音乐获取
export function getMusic(hash: ArrayBuffer): ArrayBuffer {
    if(!MusicDB.Music_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return MusicDB.Music_DB.get(hash)
}

// 医疗保存
export function saveMedical(name: string, time: string, hospital: string, info: string, doctor: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Medical(name, time, hospital, info, doctor, h.height)
    medicalDB.setMedical(tx.hash, u)
}

// 医疗获取
export function getMedical(hash: ArrayBuffer): ArrayBuffer {
    if(!MedicalDB.Medical_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return MedicalDB.Medical_DB.get(hash)
}

// 保险保存
export function saveInsure(name: string, info: string, time: string, delay: boolean, num: string, claim: boolean): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Insure(name, info, time, delay, num, claim, h.height)
    insureDB.setInsure(tx.hash, u)
}

// 保险获取
export function getInsure(hash: ArrayBuffer): ArrayBuffer {
    if(!InsureDB.Insure_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return InsureDB.Insure_DB.get(hash)
}

// 著作版权保存
export function saveBook(name: string, title: string, cid: string, info: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Book(name, title, cid, info, h.height)
    bookDB.setBook(tx.hash, u)
}

// 著作版权获取
export function getBook(hash: ArrayBuffer): ArrayBuffer {
    if(!BookDB.Book_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return BookDB.Book_DB.get(hash)
}

// 产品溯源保存
export function saveProduct(place: string, brand: string, kind: string, price: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Product(place, brand, kind, price, h.height)
    productDB.setProduct(tx.hash, u)
}

// 产品溯源获取
export function getProduct(hash: ArrayBuffer): ArrayBuffer {
    if(!ProductDB.Product_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return ProductDB.Product_DB.get(hash)
}

// 焊接保存
export function saveWeld(wpqr: ArrayBuffer, wpqrfix: string, report: ArrayBuffer, reportfix: string, reported: ArrayBuffer, reportedfix: string, wps: ArrayBuffer, wpsfix: string, test: ArrayBuffer, testfix: string, labreport: ArrayBuffer, labreportfix: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Weld(wpqr, wpqrfix, report, reportfix, reported, reportedfix, wps, wpsfix, test, testfix, labreport, labreportfix, h.height)
    weldDB.setWeld(tx.hash, u)
}

// 焊接获取
export function getWeld(hash: ArrayBuffer): ArrayBuffer {
    if(!WeldDB.Weld_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return WeldDB.Weld_DB.get(hash)
}

// 金融保存
export function saveFinance(title: string, name: string, cid: string, sum: string, contract: string): void {
    const tx = Context.transaction()
    const h = Context.header()
    const u = new Finance(title, name, cid, sum, contract, false, h.height)
    financeDB.setFinance(tx.hash, u)
}

// 金融确认
export function confirmFinance(hash: ArrayBuffer): void {
    const u = financeDB.getFinance(hash)
    u.confirm = true
    financeDB.setFinance(hash, u)
}

// 金融获取
export function getFinance(hash: ArrayBuffer): ArrayBuffer {
    if(!FinanceDB.Finance_DB.has(hash))
    {
        return new ArrayBuffer(0)
    }
    return FinanceDB.Finance_DB.get(hash)
}
