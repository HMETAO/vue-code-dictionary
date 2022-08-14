import request from '@/utils/request'

export function getCategoryMenus(data) {
  return request({
    url: '/api/v1/category/menus',
    method: 'get',
    params: data
  })
}
