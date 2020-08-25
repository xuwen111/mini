import request from './request'

//1.获取商品的详情数据
export function getGoodsDetail(iid){
  return request({
    url: '/detail',
    data: {
      iid
    }
  })
}

//2.获取商品的推荐数据
export function getGoodsRecommend(){
  return request({
    url: '/recommend'
  })
}

//----------------------------------------------定义class,方面取散乱的数据----------------------------------------
//1.1定义获取基本信息的class
export class BaseInfo{
  constructor(columns, itemInfo){
    this.topImages = itemInfo.topImages
    this.price = itemInfo.price
    this.oldPrice = itemInfo.highPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.title = itemInfo.title
    this.diliveryInfo = columns[2]
    this.diliveryAddress = itemInfo.extra.sendAddress
    this.sales = columns[0]
    this.serviceInfo = itemInfo.extra.deliveryTime + '小时内发货'
  }
}

//1.2获取评价信息的class
export class DetailCommentInfo{
  constructor(rate){
    this.commentTotal = rate.cRate
    this.commentList = rate.list
  }
}

//1.3获取商品参数信息的class
export class ParamsInfo {
  constructor(detailInfo, itemParams){
    this.productInfo = itemParams.info
    this.sizeInfo = itemParams.rule
    this.detailImages = detailInfo.detailImage
  }
}

//1.4 获取choose-bar中需要展示的数据
export class ChooseBarData {
  constructor(skuInfo, topBar, itemInfo){
    this.title = itemInfo.title
    this.defaultImage = topBar.img
    this.price = itemInfo.lowPrice
    this.totalStock = skuInfo.totalStock
    this.styleBar = skuInfo.props
    this.colorImages = skuInfo.skus
  }
}