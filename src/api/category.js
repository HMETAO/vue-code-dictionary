import request from '@/utils/request'

export function getCategoryMenus(data) {
  return request({
    url: '/api/v1/category/menus',
    method: 'get',
    params: data
  })
}

export function insertCategory(data) {
  return request({
    url: '/api/v1/category',
    method: 'post',
    data: data
  })
}

export function deleteCategory(id) {
  return request({
    url: '/api/v1/category/' + id,
    method: 'delete'
  })
}
