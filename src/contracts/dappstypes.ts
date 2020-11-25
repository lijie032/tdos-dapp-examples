
import { Address, RLPList, RLP } from '../../node_modules/@salaku/js-sdk/lib'

export const ZERO_ADDRESS = new Address(new Uint8Array(20).buffer)
export const ZERO_HASH = new Uint8Array(32).buffer
export const ZERO_ARRAYBUFFER = new ArrayBuffer(0)

export class Donor {
  // 捐赠人姓名
  name: string
  // 捐赠内容
  content: string
  // 受益人地址
  beneficiaryAddress: string
  // 受益人
  beneficiary: string
  // 捐赠机构
  donation: string
  // 捐赠说明
  state: string
  // 区块高度
  height: u64

  constructor(
    name: string,
    content: string,
    beneficiaryAddress: string,
    beneficiary: string,
    donation: string,
    state: string,
    height: u64
  ) {
    this.name = name
    this.content = content
    this.beneficiaryAddress = beneficiaryAddress
    this.beneficiary = beneficiary
    this.donation = donation
    this.state = state
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Donor {
    const u = new Donor('', '', '', '', '', '', 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.name = li.getItem(i++).string()
    u.content = li.getItem(i++).string()
    u.beneficiaryAddress = li.getItem(i++).string()
    u.beneficiary = li.getItem(i++).string()
    u.donation = li.getItem(i++).string()
    u.state = li.getItem(i++).string()
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.content))
    els.push(RLP.encodeString(this.beneficiaryAddress))
    els.push(RLP.encodeString(this.beneficiary))
    els.push(RLP.encodeString(this.donation))
    els.push(RLP.encodeString(this.state))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Finance {
  // 企业名称
  title: string
  // 法人姓名
  name: string
  // 法人证件
  cid: string
  // 融资金额
  sum: string
  // 合同编号
  contract: string
  // 是否确认
  confirm: boolean
  // 捐赠说明
  height: u64

  constructor(
      title: string,
      name: string,
      cid: string,
      sum: string,
      contract: string,
      confirm: boolean,
      height: u64
  ) {
    this.title = title
    this.name = name
    this.cid = cid
    this.sum = sum
    this.contract = contract
    this.confirm = confirm
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Finance {
    const u = new Finance('', '', '', '', '', false, 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.title = li.getItem(i++).string()
    u.name = li.getItem(i++).string()
    u.cid = li.getItem(i++).string()
    u.sum = li.getItem(i++).string()
    u.contract = li.getItem(i++).string()
    u.confirm = li.getItem(i++).u8() != 0
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.title))
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.cid))
    els.push(RLP.encodeString(this.sum))
    els.push(RLP.encodeString(this.contract))
    els.push(RLP.encodeU64(this.confirm ? 1 : 0))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Logistics {
  // 收件人姓名
  sender: string
  // 收件人地址
  address: string
  // 收件人号码
  senderPhone: string
  // 物品类型
  goods: string
  // 寄件人姓名
  receiver: string
  // 身份证号
  cid: string
  // 电话号码
  receiverPhone: string
  // 区块高度
  height: u64

  constructor(
      sender: string,
      address: string,
      senderPhone: string,
      goods: string,
      receiver: string,
      cid: string,
      receiverPhone: string,
      height: u64
  ) {
    this.sender = sender
    this.address = address
    this.senderPhone = senderPhone
    this.goods = goods
    this.receiver = receiver
    this.cid = cid
    this.receiverPhone = receiverPhone
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Logistics {
    const u = new Logistics('', '', '', '', '', '', '', 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.sender = li.getItem(i++).string()
    u.address = li.getItem(i++).string()
    u.senderPhone = li.getItem(i++).string()
    u.goods = li.getItem(i++).string()
    u.receiver = li.getItem(i++).string()
    u.cid = li.getItem(i++).string()
    u.receiverPhone = li.getItem(i++).string()
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.sender))
    els.push(RLP.encodeString(this.address))
    els.push(RLP.encodeString(this.senderPhone))
    els.push(RLP.encodeString(this.goods))
    els.push(RLP.encodeString(this.receiver))
    els.push(RLP.encodeString(this.cid))
    els.push(RLP.encodeString(this.receiverPhone))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Fund{
  // 登记姓名
  name: string
  // 赠与内容
  content: string
  // 赠与对象
  granter: string
  // 赠与条件
  condition: string
  // 是否赠予
  grant: boolean
  // 区块高度
  height: u64

  constructor(
      name: string,
      content: string,
      granter: string,
      condition: string,
      grant: boolean,
      height: u64
  ) {
    this.name = name
    this.content = content
    this.granter = granter
    this.condition = condition
    this.grant = grant
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Fund {
    const u = new Fund('', '', '', '', false, 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.name = li.getItem(i++).string()
    u.content = li.getItem(i++).string()
    u.granter = li.getItem(i++).string()
    u.condition = li.getItem(i++).string()
    u.grant = li.getItem(i++).u8() != 0
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.content))
    els.push(RLP.encodeString(this.granter))
    els.push(RLP.encodeString(this.condition))
    els.push(RLP.encodeU64(this.grant ? 1 : 0))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Music{
  // 歌曲名称
  name: string
  // 歌曲时长
  long: string
  // 歌手信息
  singer: string
  // 版权类型
  copyright: string
  // 其他信息
  info: string
  // 区块高度
  height: u64

  constructor(
      name: string,
      long: string,
      singer: string,
      copyright: string,
      info: string,
      height: u64
  ) {
    this.name = name
    this.long = long
    this.singer = singer
    this.copyright = copyright
    this.info = info
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Music {
    const u = new Music('', '', '', '', '', 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.name = li.getItem(i++).string()
    u.long = li.getItem(i++).string()
    u.singer = li.getItem(i++).string()
    u.copyright = li.getItem(i++).string()
    u.info = li.getItem(i++).string()
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.long))
    els.push(RLP.encodeString(this.singer))
    els.push(RLP.encodeString(this.copyright))
    els.push(RLP.encodeString(this.info))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Medical{
  // 病人姓名
  name: string
  // 就诊时间
  time: string
  // 就诊医院
  hospital: string
  // 就诊信息
  info: string
  // 就诊医生
  doctor: string
  // 区块高度
  height: u64

  constructor(
      name: string,
      time: string,
      hospital: string,
      info: string,
      doctor: string,
      height: u64
  ) {
    this.name = name
    this.time = time
    this.hospital = hospital
    this.info = info
    this.doctor = doctor
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Medical {
    const u = new Medical('', '', '', '', '', 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.name = li.getItem(i++).string()
    u.time = li.getItem(i++).string()
    u.hospital = li.getItem(i++).string()
    u.info = li.getItem(i++).string()
    u.doctor = li.getItem(i++).string()
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.time))
    els.push(RLP.encodeString(this.hospital))
    els.push(RLP.encodeString(this.info))
    els.push(RLP.encodeString(this.doctor))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Insure{
  // 用户姓名
  name: string
  // 航班信息
  info: string
  // 起保时间
  time: string
  // 是否延误
  delay: boolean
  // 保单号码
  num: string
  // 是否理赔
  claim: boolean
  // 区块高度
  height: u64

  constructor(
      name: string,
      info: string,
      time: string,
      delay: boolean,
      num: string,
      claim: boolean,
      height: u64
  ) {
    this.name = name
    this.info = info
    this.time = time
    this.delay = delay
    this.num = num
    this.claim = claim
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Insure {
    const u = new Insure('', '', '', false, '', false, 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.name = li.getItem(i++).string()
    u.info = li.getItem(i++).string()
    u.time = li.getItem(i++).string()
    u.delay = li.getItem(i++).u8() != 0
    u.num = li.getItem(i++).string()
    u.claim = li.getItem(i++).u8() != 0
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.info))
    els.push(RLP.encodeString(this.time))
    els.push(RLP.encodeU64(this.delay ? 1 : 0))
    els.push(RLP.encodeString(this.num))
    els.push(RLP.encodeU64(this.claim ? 1 : 0))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Book{
  // 登记人姓名
  name: string
  // 著作标题
  title: string
  // 身份证号
  cid: string
  // 创意说明
  info: string
  // 区块高度
  height: u64

  constructor(
      name: string,
      title: string,
      cid: string,
      info: string,
      height: u64
  ) {
    this.name = name
    this.title = title
    this.cid = cid
    this.info = info
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Book {
    const u = new Book('', '', '', '', 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.name = li.getItem(i++).string()
    u.title = li.getItem(i++).string()
    u.cid = li.getItem(i++).string()
    u.info = li.getItem(i++).string()
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.name))
    els.push(RLP.encodeString(this.title))
    els.push(RLP.encodeString(this.cid))
    els.push(RLP.encodeString(this.info))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Product{
  // 商品产地
  place: string
  // 商品品牌
  brand: string
  // 商品种类
  kind: string
  // 商品价格
  price: string
  // 区块高度
  height: u64

  constructor(
      place: string,
      brand: string,
      kind: string,
      price: string,
      height: u64
  ) {
    this.place = place
    this.brand = brand
    this.kind = kind
    this.price = price
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Product {
    const u = new Product('', '', '', '', 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.place = li.getItem(i++).string()
    u.brand = li.getItem(i++).string()
    u.kind = li.getItem(i++).string()
    u.price = li.getItem(i++).string()
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeString(this.place))
    els.push(RLP.encodeString(this.brand))
    els.push(RLP.encodeString(this.kind))
    els.push(RLP.encodeString(this.price))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}

export class Weld{
  // WPQR号
  wpqr: ArrayBuffer
  wpqrfix: string
  // 理化报告（破坏性）
  report: ArrayBuffer
  reportfix: string
  // 理化报告（非破坏性）
  reported: ArrayBuffer
  reportedfix: string
  // WPS
  wps: ArrayBuffer
  wpsfix: string
  // 现场考试
  test: ArrayBuffer
  testfix: string
  // 实验报告
  labreport: ArrayBuffer
  labreportfix: string
  // 区块高度
  height: u64

  constructor(
      wpqr: ArrayBuffer,
      wpqrfix: string,
      report: ArrayBuffer,
      reportfix: string,
      reported: ArrayBuffer,
      reportedfix: string,
      wps: ArrayBuffer,
      wpsfix: string,
      test: ArrayBuffer,
      testfix: string,
      labreport: ArrayBuffer,
      labreportfix: string,
      height: u64
  ) {
    this.wpqr = wpqr
    this.wpqrfix = wpqrfix
    this.report = report
    this.reportfix = reportfix
    this.reported = reported
    this.reportedfix = reportedfix
    this.wps = wps
    this.wpsfix = wpsfix
    this.test = test
    this.testfix = testfix
    this.labreport = labreport
    this.labreportfix = labreportfix
    this.height = height
  }

  // 从 rlp 解码
  static fromEncoded(buf: ArrayBuffer): Weld {
    const u = new Weld(ZERO_ARRAYBUFFER, '', ZERO_ARRAYBUFFER, '', ZERO_ARRAYBUFFER, '', ZERO_ARRAYBUFFER, '', ZERO_ARRAYBUFFER, '', ZERO_ARRAYBUFFER, '', 0)
    let i = 0
    const li = RLPList.fromEncoded(buf)
    u.wpqr = li.getItem(i++).bytes()
    u.wpqrfix = li.getItem(i++).string()
    u.report = li.getItem(i++).bytes()
    u.reportfix = li.getItem(i++).string()
    u.reported = li.getItem(i++).bytes()
    u.reportedfix = li.getItem(i++).string()
    u.wps = li.getItem(i++).bytes()
    u.wpsfix = li.getItem(i++).string()
    u.test = li.getItem(i++).bytes()
    u.testfix = li.getItem(i++).string()
    u.labreport = li.getItem(i++).bytes()
    u.labreportfix = li.getItem(i++).string()
    u.height = li.getItem(i++).u64()
    return u
  }

  // rlp 编码
  getEncoded(): ArrayBuffer {
    const els = new Array<ArrayBuffer>()
    els.push(RLP.encodeBytes(this.wpqr))
    els.push(RLP.encodeString(this.wpqrfix))
    els.push(RLP.encodeBytes(this.report))
    els.push(RLP.encodeString(this.reportfix))
    els.push(RLP.encodeBytes(this.reported))
    els.push(RLP.encodeString(this.reportedfix))
    els.push(RLP.encodeBytes(this.wps))
    els.push(RLP.encodeString(this.wpsfix))
    els.push(RLP.encodeBytes(this.test))
    els.push(RLP.encodeString(this.testfix))
    els.push(RLP.encodeBytes(this.labreport))
    els.push(RLP.encodeString(this.labreportfix))
    els.push(RLP.encodeU64(this.height))
    return RLP.encodeElements(els)
  }
}
