import request from '@/utils/request'

export function getMenus() {
  return request({
    url: '/api/v1/menus',
    method: 'get'
  })
}
