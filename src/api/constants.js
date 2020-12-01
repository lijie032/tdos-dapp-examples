import { ABI, VirtualMachine, RPC, publicKey2Address, privateKey2PublicKey, Contract, hex2bin, bin2hex} from '@salaku/js-sdk'
import abi from '@/contracts/dapps.abi.json'
import axios from 'axios'

// import wasm from '@/contracts/dapps.wasm'

let abiCache

export const httpRPC = new RPC(location.hostname, location.port || '80')


export async function getABI() {
  if (abiCache)
    return abiCache
  abiCache = await axios.get(abi).then(r =>r.data)
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
export const CONTRACT_SECRET_BEAR_ADDRESS = '3597e87ce0116c1fadd0232dec42e99f423d64d9' // 加密熊合约地址
export const CONTRACT_CHAT_ADDRESS = '4ddf1e3f3cc5943ffec41d143a5cedb1c102d23f' // 聊天室合约地址
export const CONTRACT_BOOKS_ADDRESS = '3099ab3be50b99fa3ef5c62b1e5494b135476d6d' // 通讯录合约地址
export const CONTRACT_PHOTO_ADDRESS = '32e0181e28dc36e9f1e3eda2b87e3d8ad68bb8fd' // 相册合约地址
export const CONTRACT_TOKEN_ADDRESS = '0cf65e367967f6cd88bbd9561283ae71eb260ef9' // 发行代币合约地址
export const CONTRACT_CHANGE_ADDRESS = 'ef8f2f999d9a8bd5c55407d1a2bd124c36cf413f' // 交易合约地址

export async function getContract() {
  return new Contract(CONTRACT_ADDRESS, await getABI())
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
