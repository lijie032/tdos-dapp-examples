import { ABI, VirtualMachine, RPC, publicKey2Address, privateKey2PublicKey, Contract, hex2bin, bin2hex} from '@salaku/js-sdk'
import abi from '@/contracts/dapps.abi.json'
import bookAbi from '@/contracts/addresslistdapp.abi.json'
import abi_secretbeardapp from '@/contracts/secretbeardapp.abi.json'
import axios from 'axios'
import photoAbi from '@/contracts/photodapp.abi.json'
import voteAbi from '@/contracts/votedapp.abi.json'
import limitAbi from '@/contracts/limitdapp.abi.json'

// import wasm from '@/contracts/dapps.wasm'

let abiCache

export const httpRPC = new RPC(location.hostname, location.port || '80')


export async function getABI() {
  if (abiCache)
    return abiCache
  abiCache = await axios.get(abi).then(r =>r.data)
  return abiCache
}

export async function getBookABI() {
  if (abiCache)
    return abiCache
  abiCache = await axios.get(bookAbi).then(r =>r.data)
  return abiCache
}


// dev 环境下使用假节点
export const ENV = localStorage.getItem('env') === 'dev' ? 'dev' : 'prod'

// export async function getContractBin() {
//   const r = await fetch(wasm)
//   return new Uint8Array(await r.arrayBuffer())
// }

export const vm = (function(){
  const data = localStorage.getItem('vm')
  if(!data)
    return new VirtualMachine()
  // @ts-ignore

  return VirtualMachine.fromDump(hex2bin(data).buffer)
})()

export function persistVM(){
  localStorage.setItem('vm', bin2hex(vm.dump()))
}

export const rpc = new RPC('192.168.1.89', '6011')
export const CONTRACT_ADDRESS = '30f1acbde6a9111a3cde642bfbc30310e293cd67' // 十个存证合约地址
export const CONTRACT_SECRET_BEAR_ADDRESS = '73969ed1bdf86e84cff51ba1b7e6b5941926a590' // 加密熊合约地址
export const CONTRACT_CHAT_ADDRESS = 'c0eea01c0250b57ff4af5c550a745ec937d6e1a0' // 聊天室合约地址
export const CONTRACT_BOOKS_ADDRESS = 'b237c1b692036bacb3a859aa0c3e11b74166dc8f' // 通讯录合约地址
export const CONTRACT_PHOTO_ADDRESS = 'c65c67747bbd812d79fa26a0929856100b9880fb' // 相册合约地址
export const CONTRACT_TOKEN_ADDRESS = '0cf65e367967f6cd88bbd9561283ae71eb260ef9' // 发行代币合约地址
export const CONTRACT_CHANGE_ADDRESS = 'ef8f2f999d9a8bd5c55407d1a2bd124c36cf413f' // 交易合约地址
export const CONTRACT_LIMIT_ADDRESS = '3c124d67ba9ad76bc065aea3ea28228ab518b91d' // 权限合约地址
export const CONTRACT_CROWDSALE_ADDRESS = 'a76fbc7fbb136336cbad6f32519b7150b53156bc' // 众筹合约地址
export const CONTRACT_VOTE_ADDRESS = '88d59ef8bcca85ec032a734a28eea43ba6145623' // 投票合约地址
export const CONTRACT_LEND_ADDRESS = '61303b4bc01a05ba83924cdad60e84f248a088d5' // 闪电贷合约地址

export async function getContract() {
  return new Contract(CONTRACT_ADDRESS, abi)
}

export async function getBookContract() {
  return new Contract(CONTRACT_BOOKS_ADDRESS, bookAbi)
}

export async function getAlbumContract() {
  return new Contract(CONTRACT_PHOTO_ADDRESS, photoAbi)
}

export async function getLimitContract() {
  return new Contract(CONTRACT_LIMIT_ADDRESS, limitAbi)
}

export async function getContract_secretbeardapp() {
  return new Contract(CONTRACT_SECRET_BEAR_ADDRESS, abi_secretbeardapp)
}

export async function getVoteContract() {
  return new Contract(CONTRACT_VOTE_ADDRESS, voteAbi)
}


// 捐赠人的私钥
export const PRIVATE_KEY =
  'f00df601a78147ffe0b84de1dffbebed2a6ea965becd5d0bd7faf54f1f29c6b5'

// 捐赠人的地址
export const ADDRESS = publicKey2Address(
  privateKey2PublicKey(PRIVATE_KEY)
)

// 红十字会的私钥
export const CROSS_PRIAVTE_KEY =
  'b8bcde6ea12982ff341cef358040584e0b397b51beaf0b11a45f80be9b5dfe33'
