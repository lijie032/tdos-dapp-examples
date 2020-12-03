// 部署公益合约
import {ENV, rpc, getABI, getContract, httpRPC,getBookContract, getContract_secretbeardapp, getAlbumContract, getVoteContract, getContract_crowdsaledapp, getContract_chatdapp } from './constants'
import {
  bin2hex,
  constants,
  Contract,
  hex2bin,
  publicKey2Address,
  rlp,
  TransactionBuilder,
  TX_STATUS
} from '@salaku/js-sdk'

const privatekey = ''

// 获取nonce
async function syncNonce (
  publickey
) {
  const addr = publicKey2Address(publickey)
  const n = await rpc.getNonce(addr)
  let nn = n + 1
  return nn
}

// 获取事务
export function getTransaction (hash) {
  return httpRPC.getTransaction(hash)
}

// 解析公益
function decodeDonor (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.content = rd.string()
  u.beneficiaryAddress = rd.string()
  u.beneficiary = rd.string()
  u.donation = rd.string()
  u.state = rd.string()
  return u
}

// 公益保存
export async function saveDonor (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveDonor', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 公益获取
export async function getDonor (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getDonor', hash)
    return decodeDonor(result)
  }catch (e) {
    return "";
  }
}

// 解析物流
function decodeLogistics (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.sender = rd.string()
  u.address = rd.string()
  u.senderPhone = rd.string()
  u.goods = rd.string()
  u.receiver = rd.string()
  u.cid = rd.string()
  u.receiverPhone = rd.string()
  return u
}

// 物流保存
export async function saveLogistics (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveLogistics', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 物流获取
export async function getLogistics (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getLogistics', hex2bin(hash))
    return decodeLogistics(result)
  }catch (e) {
    return "";
  }
}

// 解析资产
function decodeFund (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.content = rd.string()
  u.granter = rd.string()
  u.condition = rd.string()
  return u
}

// 资产保存
export async function saveFund (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveFund', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 资产确认
export async function confirmFund (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'confirmFund', hash, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 资产获取
export async function getFund (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getFund', hex2bin(hash))
    return decodeFund(result)
  }catch (e) {
    return "";
  }
}

// 解析音乐
function decodeMusic (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.long = rd.string()
  u.singer = rd.string()
  u.copyright = rd.string()
  u.info = rd.string()
  return u
}

// 音乐保存
export async function saveMusic (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveMusic', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 音乐获取
export async function getMusic (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getMusic', hex2bin(hash))
    return decodeMusic(result)
  }catch (e) {
    return "";
  }
}

// 解析医疗
function decodeMedical (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.time = rd.string()
  u.hospital = rd.string()
  u.info = rd.string()
  u.doctor = rd.string()
  return u
}

// 医疗保存
export async function saveMedical (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveMedical', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 医疗获取
export async function getMedical (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getMedical', hex2bin(hash))
    return decodeMedical(result)
  }catch (e) {
    return "";
  }
}

// 解析保险
function decodeInsure (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.info = rd.string()
  u.time = rd.string()
  u.delay = rd.bool()
  u.num = rd.string()
  u.claim = rd.bool()
  return u
}

// 保险保存
export async function saveInsure (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveInsure', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 保险获取
export async function getInsure (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getInsure', hex2bin(hash))
    return decodeInsure(result)
  }catch (e) {
    return "";
  }
}

// 解析著作版权
function decodeBook (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.title = rd.string()
  u.cid = rd.string()
  u.info = rd.string()
  return u
}

// 著作版权保存
export async function saveBook (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveBook', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 著作版权获取
export async function getBook (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getBook', hex2bin(hash))
    return decodeBook(result)
  }catch (e) {
    return "";
  }
}

// 解析产品溯源
function decodeProduct (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.place = rd.string()
  u.brand = rd.string()
  u.kind = rd.string()
  u.price = rd.string()
  return u
}

// 产品溯源保存
export async function saveProduct (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveProduct', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 产品溯源获取
export async function getProduct (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getProduct', hex2bin(hash))
    return decodeProduct(result)
  } catch (e) {
    return ''
  }
}

// 解析焊接
function decodeWeld (buf) {
  if (buf == ""){
    return "";
  }
  buf = hex2bin(buf)
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.wpqr = rd.string()
  u.welder = rd.string()
  u.device = rd.string()
  return u
}

// 焊接保存
export async function saveWeld (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveWeld', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 焊接获取
export async function getWeld (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getWeld', hex2bin(hash))
    return decodeWeld(result)
  } catch (e) {
    return ''
  }
}

// 解析金融
function decodeFinance (buf) {
  if (buf != '') {
    buf = hex2bin(buf)
    const u = {}
    const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
    u.title = rd.string()
    u.name = rd.string()
    u.cid = rd.string()
    u.sum = rd.string()
    u.contract = rd.string()
    u.confirm = rd.bool()
    return u
  }
  return ''
}

// 金融保存
export async function saveFinance (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'saveFinance', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 金融确认
export async function confirmFinance (hash, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'confirmFinance', hash, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 金融获取
export async function getFinance (hash) {
  try {
    let result = await rpc.viewContract(await getContract(), 'getFinance', hex2bin(hash))
    return decodeFinance(result)
  }catch (e) {
    return "";
  }
}
// 解析加密熊
function decodeBear (buf) {
  if (buf != '') {
    buf = hex2bin(buf)
    const u = {}
    const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
    u.username = rd.string()
    u.birth = rd.string()
    u.aggressivity = rd.number()
    u.bloodvolume = rd.number()
    u.stature = rd.number()
    u.tonnage = rd.number()
    u.defense = rd.number()
    u.level = rd.number()
    u.hash = bin2hex(rd.bytes())
    return u
  }
  return ''
}

// 加密熊购买
export async function buyBear (payload, publickey) {
  const c = await getContract_secretbeardapp()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'buy', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 加密熊升级
export async function buyLevel (publickey) {
  const c = await getContract_secretbeardapp()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'buyLevel', [], 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 是否加密熊
export async function hasBear (pk) {
  try {
    let add = publicKey2Address(pk)
    return await rpc.viewContract(await getContract_secretbeardapp(), 'hasBear', [add])
  } catch (e) {
    return ''
  }
}

// 获取密熊
export async function getBear (pk) {
  try {
    let add = publicKey2Address(pk)
    let bear =  await rpc.viewContract(await getContract_secretbeardapp(), 'getBear', [add])
    return decodeBear(bear)
  } catch (e) {
    return ''
  }
}

// 保存通讯录
export async function addAddressBook(payload, publickey) {
  const c = await getBookContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'addBook', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 获取通讯录
export async function getAddressBooks(address) {
  try {
    let result = await rpc.viewContract(await getBookContract(), 'getBooks', [address])
    return decodeAddressBooks(result)
  }catch (e) {
    return "";
  }
}

class Book{
    username = ''
    phone = ''
    memo = ''
    hash = ''
    height = 0
    affair_hash = ''
    constructor(username, phone,memo,hash,height,affair_hash) {
      this.username = username;
      this.phone = phone;
      this.memo = memo;
      this.hash = hash;
      this.height = height;
      this.affair_hash = affair_hash;
    }
    toString() {
      return '(' + this.username + ', ' + this.phone + ')';
    }
}

function decodeAddressBooks(buf) {
  if (buf != '') {
    buf = hex2bin(buf)
    let  li = rlp.RLPList.fromEncoded(buf);
    console.log(li)
    const ret = [];
    for (let i = 0; i < li.length(); i++) {
      let ii = li.list(i);
      ret.push(fromEncoded(ii));
  }
    return ret
  }
  return ''
}

function fromEncoded(buf) {
  const li = new rlp.RLPListReader(buf);
  const book = new Book('', '', '', 0);
  book.username = li.string();
  book.phone = li.string();
  book.memo = li.string();
  book.hash = bin2hex(li.bytes());
  return book;
}

// 保存通讯录
export async function addPhoto(payload, publickey) {
  const c = await getAlbumContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'addPhoto', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 保存通讯录
export async function getPhotos(address) {
  try {
    let result = await rpc.viewContract(await getAlbumContract(), 'getPhotos', [address])
    return decodePhotos(result)
  }catch (e) {
    return "";
  }
}

function decodePhotos(buf) {
  if (buf != '') {
    buf = hex2bin(buf)
    let  li = rlp.RLPList.fromEncoded(buf);
    console.log(li)
    const ret = [];
    for (let i = 0; i < li.length(); i++) {
      let ii = li.list(i);
      ret.push(fromEncodedPhotos(ii));
  }
    return ret
  }
  return ''
}


function fromEncodedPhotos(buf) {
  const li = new rlp.RLPListReader(buf);
  const u = {}
  u.photo = li.string();
  u.fix =li.string();
  u.hash = bin2hex(li.bytes());
  return u;
}

export async function getVote() {
  try {
    let result = await rpc.viewContract(await getVoteContract(), 'getVote', [])
    return decodeVote(result)
  }catch (e) {
    return "";
  }
}

function decodeVote (buf) {
  if (buf != '') {
    buf = hex2bin(buf)
    const u = {}
    const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
    u.title = rd.string()
    u.voteA = rd.string()
    u.voteB = rd.string()
    u.infoA = rd.string()
    u.infoB = rd.string()
    u.amountA = rd.number()
    u.amountB = rd.number()
    return u
  }
  return ''
}

export async function vote(payload, publickey) {
  const c = await getVoteContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'vote', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}


export async function hasVote(address) {
  try {
    let result = await rpc.viewContract(await getVoteContract(), 'hasVote', [address])
    return result
  }catch (e) {
    return "";
  }
}

export async function getVoteInfo(address) {
  try {
    let result = await rpc.viewContract(await getVoteContract(), 'getVoteInfo', [address])
    return result
  }catch (e) {
    return "";
  }
}

export async function getVoterInfo(address) {
  try {
    let result = await rpc.viewContract(await getVoteContract(), 'getVoterInfo', [address])
    return result
  }catch (e) {
    return "";
  }
}

// 解析众筹
function decodeCrowdSale (buf) {
  if (buf != '') {
    const ret = []
    buf = hex2bin(buf)
    let li = rlp.RLPList.fromEncoded(buf)
    for (let i = 0; i < li.length(); i++) {
      let ii = li.list(i)
      ret.push(fromEncoded_CrowdSale(ii))
    }
    return ret
  }
  return ''
}

function fromEncoded_CrowdSale (buf) {
  const li = new rlp.RLPListReader(buf)
  const crowdSale = {}
  crowdSale.addr = li.string()
  crowdSale.fundingGoal = li.number()
  crowdSale.amountRaised = li.number()
  crowdSale.people = li.number()
  crowdSale.info = li.string()
  return crowdSale
}

// 获取所有众筹信息
export async function getCrowdSaleInfo () {
  try {
    let result = await rpc.viewContract(await getContract_crowdsaledapp(), 'getCrowdSaleInfo', [])
    return decodeCrowdSale(result)
  } catch (e) {
    return ''
  }
}

// 发起众筹
export async function transfer (payload, publickey) {
  const c = await getContract_crowdsaledapp()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'transfer', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}

// 解析众筹
function decodeCrowdSale_one (buf) {
  if (buf != '') {
    const u = {}
    buf = hex2bin(buf)
    // let ll = rlp.RLPList.fromEncoded(buf)
    // const li = new rlp.RLPListReader(ll)
    const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
    u.address = rd.string();
    u.fundingGoal = rd.number();
    u.amount = rd.number();
    u.info = rd.string();
    u.hash = bin2hex(rd.bytes());
    console.log(u)

    return u
  }
  return ''
}

// 获取单个众筹信息
export async function getCrowdSale (hash) {
  try {
    let crowdSale =  await rpc.viewContract(await getContract_crowdsaledapp(), 'getCrowdSale', hex2bin(hash))
    return decodeCrowdSale_one(crowdSale)
  } catch (e) {
    return ''
  }
}

// 查看是否拥有聊天账户
export async function hasUser (pk) {
  try {
    let add = publicKey2Address(pk)
    return await rpc.viewContract(await getContract_chatdapp(), 'hasUser', [add])
  } catch (e) {
    return ''
  }
}

// 获取聊天室用户数量
export async function getUserId () {
  try {
    return await rpc.viewContract(await getContract_chatdapp(), 'getUserId', [])
  } catch (e) {
    return ''
  }
}

// 添加聊天室用户
export async function registration (payload,publickey) {
  const c = await getContract_chatdapp()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'registration', payload, 0)
    tx.nonce = await syncNonce(publickey)
    tx.from = publickey
    return tx
  }
}


