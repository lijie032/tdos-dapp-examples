import { ENV, rpc, getContract_token, httpRPC } from './constants'
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

// 解析token
function decodeToken (buf) {
    if (buf == ""){
      return "";
    }
    buf = hex2bin(buf)
    const u = {}
    const rd = new rlp.RLPListReader(rlp.RLPList.fromEncoded(buf))
    u.name = rd.string()
    u.owner = rd.string()
    u.totalSupply = rd.string()
    u.seo = rd.string()
    u.info = rd.string()
    return u
  }
  
  // token保存
  export async function saveToken (payload, publickey) {
    const c = await getContract_token()
    if (ENV === 'prod') {
      let builder = new TransactionBuilder(
        constants.POA_VERSION,
        privatekey
      )
      const tx = builder.buildContractCall(c, 'saveToken', payload, 0)
      tx.nonce = await syncNonce(publickey)
      tx.from = publickey
      return tx
    }
  }
  
  // token获取
  export async function getToken (hash) {
    try {
      let result = await rpc.viewContract(await getContract_token(), 'getToken', hash)
      return decodeToken(result)
    }catch (e) {
      return "";
    }
  }