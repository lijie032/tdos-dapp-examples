import { ENV, rpc, getLimitContract, httpRPC } from './constants'
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

// 获取时间
export async function getTime () {
  try {
    let result = await rpc.viewContract(await getLimitContract(), 'getTime', [])
    return result
  }catch (e) {
    return "";
  }
}

// 是否存在
export async function hasSerial (serial) {
    try {
      let result = await rpc.viewContract(await getLimitContract(), 'hasSerial', [serial])
      return result
    }catch (e) {
      return "";
    }
  }