import fetch from '../config/fetch'
import * as tier from './tempData/tier'

/**
 * 创建临时数据
 */
const setpromise = data => {
    return new Promise((resolve, reject) => {
        resolve(data)
    })
}

/**
 *  获取指定用户名所在的区服信息及用户在区服中的基本信息
 * @param {*} name
 */
var getUserArea = name => fetch('GET', '/UserArea', { keyword: name })

/**
 *  获取用户基本信息
 * @param {*} qquid
 * @param {*} areaId
 */
var getUserInfo = (qquid, areaId) => fetch('GET', '/UserHotInfo', {
    qquid: qquid,
    vaid: areaId
})

/**
 *  获取用户头像
 * @param {*} iconId
 */
var getUserIcon = iconId => fetch('GET', '/GetUserIcon', {
    iconid: iconId
})
var getTierInfo = () => setpromise(tier.default)
export { getUserArea, getTierInfo, getUserInfo, getUserIcon }