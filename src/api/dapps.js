// 部署公益合约
import {ENV, rpc, getABI, getContract} from './constants'
import {
  bin2hex,
  constants,
  Contract,
  hex2bin, privateKey2PublicKey,
  publicKey2Address,
  rlp,
  TransactionBuilder,
  TX_STATUS
} from '@salaku/js-sdk'

const privatekey = '00000000000000000000000000000000'

// 获取nonce
async function syncNonce (
  bd
) {
  const addr = publicKey2Address(bd.sk)
  const n = await rpc.getNonce(addr)
  let nn = n + 1
  bd.nonce = nn
  return bd
}

// 解析公益
function decodeDonor (buf) {
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
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveDonor', payload, 0)
    return tx
  }
}

// 公益获取
export async function getDonor (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getDonor', hash, 0)
    return decodeDonor(hex2bin(tx))
  }
}

// 解析物流
function decodeLogistics (buf) {
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
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveLogistics', payload, 0)
    return tx
  }
}

// 物流获取
export async function getLogistics (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getLogistics', hash, 0)
    return decodeLogistics(hex2bin(tx))
  }
}

// 解析资产
function decodeFund (buf) {
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
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveFund', payload, 0)
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
    return tx
  }
}

// 资产获取
export async function getFund (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getFund', hash, 0)
    return decodeFund(hex2bin(tx))
  }
}

// 解析音乐
function decodeMusic (buf) {
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
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveMusic', payload, 0)
    return tx
  }
}

// 音乐获取
export async function getMusic (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getMusic', hash, 0)
    return decodeMusic(hex2bin(tx))
  }
}

// 解析医疗
function decodeMedical (buf) {
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
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveMedical', payload, 0)
    return tx
  }
}

// 医疗获取
export async function getMedical (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getMedical', hash, 0)
    return decodeMedical(hex2bin(tx))
  }
}

// 解析保险
function decodeInsure (buf) {
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.info = rd.string()
  u.time = rd.string()
  u.delay = rd.string()
  u.num = rd.string()
  u.claim = rd.string()
  return u
}

// 保险保存
export async function saveInsure (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveInsure', payload, 0)
    return tx
  }
}

// 保险获取
export async function getInsure (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getInsure', hash, 0)
    return decodeInsure(hex2bin(tx))
  }
}

// 解析著作版权
function decodeBook (buf) {
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
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveBook', payload, 0)
    return tx
  }
}

// 著作版权获取
export async function getBook (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getBook', hash, 0)
    return decodeBook(hex2bin(tx))
  }
}

// 解析产品溯源
function decodeProduct (buf) {
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
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveProduct', payload, 0)
    return tx
  }
}

// 产品溯源获取
export async function getProduct (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getProduct', hash, 0)
    return decodeProduct(hex2bin(tx))
  }
}

// 解析焊接
function decodeWeld (buf) {
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.wpqr = rd.string()
  u.wpqrfix = rd.string()
  u.report = rd.string()
  u.reportfix = rd.string()
  u.reported = rd.string()
  u.reportedfix = rd.string()
  u.wps = rd.string()
  u.wpsfix = rd.string()
  u.test = rd.string()
  u.testfix = rd.string()
  u.labreport = rd.string()
  u.labreportfix = rd.string()
  return u
}

// 焊接保存
export async function saveWeld (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveWeld', payload, 0)
    return tx
  }
}

// 焊接获取
export async function getWeld (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getWeld', hash, 0)
    return decodeWeld(hex2bin(tx))
  }
}

// 解析金融
function decodeFinance (buf) {
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.title = rd.string()
  u.name = rd.string()
  u.cid = rd.string()
  u.sum = rd.string()
  u.contract = rd.string()
  return u
}

// 金融保存
export async function saveFinance (payload, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveFinance', payload, 0)
    return tx
  }
}

// 金融确认
export async function confirmFinance (hash, publickey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      publickey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'confirmFinance', hash, 0)
    return tx
  }
}

// 金融获取
export async function getFinance (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    const tx = builder.buildContractCall(c, 'getFinance', hash, 0)
    return decodeFinance(hex2bin(tx))
  }
}
