import request from '@/utils/request'

export function getCategoryMenus() {
  return request({
    url: '/api/v1/category/menus',
    method: 'get'
  })
}
