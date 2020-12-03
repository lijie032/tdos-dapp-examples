import { rlp, bin2hex, hex2bin, publicKey2Address, privateKey2PublicKey, TransactionBuilder, constants, TX_STATUS } from '@salaku/js-sdk'
import { rpc, PRIVATE_KEY, CROSS_PRIAVTE_KEY, vm, ADDRESS, CONTRACT_ADDRESS, persistVM, ENV, getContract } from '@/api/constants'
import { sm3 } from '@salaku/sm-crypto'
import axios from 'axios'

async function syncNonce(
  bd
) {
  const addr = publicKey2Address(privateKey2PublicKey(bd.sk))
  const n = await rpc.getNonce(addr)
  let nn = n + 1
  bd.nonce = nn
  return bd
}

export function formatDate(d, fmt) {
  const o = {
    'M+': d.getMonth() + 1, //月份
    'd+': d.getDate(), //日
    'h+': d.getHours(), //小时
    'm+': d.getMinutes(), //分
    's+': d.getSeconds(), //秒
    'q+': Math.floor((d.getMonth() + 3) / 3), //季度
    S: d.getMilliseconds() //毫秒
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (let k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
  return fmt
}


export function emptyDonor() {
  return {
    name: '',
    content: '',
    quantity: null,
    info: '',
    address: '',
    get: '',
    donor: '',
    height: null,
    hash: '',
    timestamp: null,
    confirmed: false,
    confirmHash: ''
  }
}



// 捐赠人发送合约捐赠事务
export async function saveDonor(payload) {
  const c = await getContract()
  if (ENV === 'prod') {
    let builder = new TransactionBuilder(
      constants.POA_VERSION,
      PRIVATE_KEY
    )
    builder = await syncNonce(builder)
    const tx = builder.buildContractCall(c, 'saveDonor', payload, 0)
    await rpc.sendAndObserve(tx, TX_STATUS.INCLUDED)
    const h = tx.getHash()
    localStorage.setItem('txHash', h)
    return h
  }
  const txHash = (await vm.call(ADDRESS, CONTRACT_ADDRESS, 'saveDonor', payload)).transactionHash
  localStorage.setItem('txHash', txHash)
  persistVM()
  return txHash
}

// 红十字会发送确认事务
export async function saveConfirm(description) {
  const c = await getContract()
  if (ENV === 'prod') {
    let bd = new TransactionBuilder(
      constants.POA_VERSION,
      CROSS_PRIAVTE_KEY
    )
    bd = await syncNonce(bd)
    const tx = bd.buildContractCall(c, 'saveConfirm', {
      hash: localStorage.getItem('txHash'),
      description: description
    })
    await rpc.sendAndObserve(tx, TX_STATUS.INCLUDED)
    return tx.getHash()
  }

  const h = (await vm.call(privateKey2PublicKey(CROSS_PRIAVTE_KEY), CONTRACT_ADDRESS, 'saveConfirm', {
    hash: localStorage.getItem('txHash'),
    description: description
  })).transactionHash
  persistVM()
  return h
}

export async function getConfirm() {
  const d = await getDonor()
  if (!d || !d.confirmed) return null

  const r = ENV === 'prod' ?
    await rpc.viewContract(await getContract(), 'getConfirmEncoded', d.confirmHash)
    : await vm.view(CONTRACT_ADDRESS, 'getConfirmEncoded', d.confirmHash)
  return decodeConfirm(hex2bin(r))
}

export async function getDonor() {
  const h = localStorage.getItem('txHash')
  if (!h) return null
  const r  = ENV === 'prod' ?
    await rpc.viewContract(await getContract(), 'getDonorEncoded', h) :
    await vm.view(CONTRACT_ADDRESS, 'getDonorEncoded', h)

  return decodeDonor(hex2bin(r))
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

function decodeConfirm(buf) {
  const r = {}
  const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
  r.description = rd.string()
  r.timestamp = rd.number()
  r.height = rd.number()
  r.hash = bin2hex(rd.bytes())
  return r
}

export function reset() {
  localStorage.removeItem('vm')
  localStorage.removeItem('txHash')
}

export async function getHashByHeight(height) {
  if (ENV === 'prod') {
    const r = await axios.get(`/rpc/block/${height}`)
    return r.data.data.hash
  }
  return Promise.resolve(sm3(rlp.encode(height)))
}
