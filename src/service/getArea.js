import fetch from '../config/fetch'

/**
 * 获取大区信息
 * @return { json }
 [
    {
        "id" : 1, //区服ID
        "idc" : "东莞东城", //idc
        "isp" : "电信一", //isp 名称
        "name" : "艾欧尼亚", //区服名称
        "ob" : 1, 是否支持OB文件
        "strid" : "HN1", //简写
        "tcls" : 257
    }
 ]
 */
var getArea = () => fetch('GET', '/Area', {})

export { getArea }