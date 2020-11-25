export interface DonorPayload {
    // 捐赠姓名
    name?: string
    // 捐赠内容
    content?: string
    // 捐赠数量
    quantity?: number
    // 简介信息
    info?: string
    // 捐赠地址
    address?: string
    // 受益人
    get?: string
    // 捐赠机构
    donor?: string
    // 上链高度
    height?: number
    // 上链事务的哈希值
    hash?: string
    // 上链事务的时间戳
    timestamp?: number
    // 是否被确认
    confirmed?: boolean
    // 确认事务的哈希值
    confirmHash?: string
}

export interface ConfirmPayload {
    // 捐赠说明
    description?: string
    // 时间戳
    timestamp?: number
    // 区块高度
    height?: number
    // 事务哈希
    hash?: string
}