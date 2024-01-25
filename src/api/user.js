import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/v1/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/api/v1/user/logout',
    method: 'get',
  })
}


export function registry(data) {
  return request({
    url: '/api/v1/user/registry',
    method: 'post',
    data
  })
}
