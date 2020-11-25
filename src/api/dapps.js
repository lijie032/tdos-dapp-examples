// 部署公益合约
import {ENV, rpc, getABI, getContract} from './constants'
import {bin2hex, constants, Contract, hex2bin, rlp, TransactionBuilder, TX_STATUS} from '@salaku/js-sdk'

let payload = {
  name: string, content: string, beneficiaryAddress: string, beneficiary: string, donation: string, state: string
}

function decodeDonor(buf) {
  const u = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  u.name = rd.string()
  u.content = rd.string()
  u.quantity = rd.number()
  u.info = rd.string()
  u.address = bin2hex(rd.bytes())
  u.get = bin2hex(rd.bytes())
  u.donor = rd.string()
  u.height = rd.number()
  u.hash = bin2hex(rd.bytes())
  u.timestamp = rd.number()
  u.confirmed = rd.bool()
  u.confirmHash = bin2hex(rd.bytes())
  return u
}

//公益保存
export async function saveDonor (payload, privatekey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveDonor', payload, 0)
    return tx
  }
}

//公益获取
export async function getDonor (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'getDonor', hash, 0)
    return decodeDonor(hex2bin(tx))
  }
}

//物流保存
export async function saveLogistics (payload, privatekey) {
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

//物流获取
export async function getLogistics (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'getLogistics', hash, 0)
    return tx
  }
}

//资产保存
export async function saveFund (payload, privatekey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveFund', payload, 0)
    return tx
  }
}

//资产确认
export async function confirmFund (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'confirmFund', hash, 0)
    return tx
  }
}

//资产获取
export async function getFund (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'getFund', hash, 0)
    return tx
  }
}

//音乐保存
export async function saveMusic (payload, privatekey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveMusic', payload, 0)
    return tx
  }
}

//音乐获取
export async function getMusic (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'getMusic', hash, 0)
    return tx
  }
}

//医疗保存
export async function saveMedical (payload, privatekey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveMedical', payload, 0)
    return tx
  }
}

//医疗获取
export async function getMedical (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'getMedical', hash, 0)
    return tx
  }
}

//保险保存
export async function saveInsure (payload, privatekey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveInsure', payload, 0)
    return tx
  }
}

//保险获取
export async function getInsure (hash) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'getInsure', hash, 0)
    return tx
  }
}

//保险保存
export async function saveInsure (payload, privatekey) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      privatekey
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveInsure', payload, 0)
    return tx
  }
}
