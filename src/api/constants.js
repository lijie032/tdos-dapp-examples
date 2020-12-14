import { ABI, VirtualMachine, RPC, publicKey2Address, privateKey2PublicKey, Contract, hex2bin, bin2hex} from '@salaku/js-sdk'
import abi from '@/contracts/dapps.abi.json'
import bookAbi from '@/contracts/addresslistdapp.abi.json'
import abi_secretbeardapp from '@/contracts/secretbeardapp.abi.json'
import axios from 'axios'
import photoAbi from '@/contracts/photodapp.abi.json'
import voteAbi from '@/contracts/votedapp.abi.json'
import limitAbi from '@/contracts/limitdapp.abi.json'
import lendAbi from '@/contracts/lenddapp.abi.json'
import abi_crowdsaledapp from '@/contracts/crowdsaledapp.abi.json'
import abi_chatdapp from '@/contracts/chatdapp.abi.json'
import tokenAbi from '@/contracts/tokendapp.abi.json'
import abi_changedapp from '@/contracts/changedapp.abi.json'

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

export const rpc = new RPC('120.76.101.153', '7010')
export const CONTRACT_ADDRESS = '2f0119a808c74be8c5e0929e0ab94be211e6f01a' // 十个存证合约地址
export const CONTRACT_SECRET_BEAR_ADDRESS = 'a265f76986b17386360068c809a680b556c07d0f' // 加密熊合约地址
export const CONTRACT_CHAT_ADDRESS = 'bfe0d3202e79af304b28e917df7ca3875d243d18' // 聊天室合约地址
export const CONTRACT_BOOKS_ADDRESS = '949bf29959946d01d8aab427debba8bbc643d987' // 通讯录合约地址
export const CONTRACT_PHOTO_ADDRESS = '585d8e961be91ec2a440a713139c2d368fd88c24' // 相册合约地址
export const CONTRACT_TOKEN_ADDRESS = '4ad4902b9b83d0683dff7589f634e66b6dad75b4' // 发行代币合约地址
export const CONTRACT_CHANGE_ADDRESS = '8421f1aeae5fd8b7bb6fc7e26d0dfb8d45ac558f' // 交易合约地址
export const CONTRACT_LIMIT_ADDRESS = 'f21be07cb70237e251465de0624f1f5716520829' // 权限合约地址
export const CONTRACT_CROWDSALE_ADDRESS = 'da1681b9a25293010a822ee9759e2199217e3aa5' // 众筹合约地址
export const CONTRACT_VOTE_ADDRESS = 'af0d5077e903ba5a336caf3779365c9780212cb7' // 投票合约地址
export const CONTRACT_LEND_ADDRESS = '024d850e372bc1e325351d40a4f817cf28d8f7ca' // 闪电贷合约地址
export const CONTRACT_LEND_ADDRESS = '80a9c71438705f2f6b0522ebf1b5c7c593bb38bc' // 登记合约地址

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

export async function getLendContract() {
  return new Contract(CONTRACT_LEND_ADDRESS, lendAbi)
}


export async function  getContract_crowdsaledapp() {
  return new Contract(CONTRACT_CROWDSALE_ADDRESS, abi_crowdsaledapp)
}

export async function  getContract_chatdapp() {
  return new Contract(CONTRACT_CHAT_ADDRESS, abi_chatdapp)
}

export async function  getContract_token() {
  return new Contract(CONTRACT_TOKEN_ADDRESS, tokenAbi)
}
export async function  getContract_changedapp() {
  return new Contract(CONTRACT_CHANGE_ADDRESS, abi_changedapp)
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
