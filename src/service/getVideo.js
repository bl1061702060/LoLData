import fetch from '../config/fetch'

/**
 *  获取指定用户名所在的区服信息及用户在区服中的基本信息
 * @param {*} name
 */
var getNewestVideos = pageNum => fetch('GET', '/GetNewstVideos', { p: pageNum }, 'axios', true)

export { getNewestVideos }