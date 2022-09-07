import request from '@/utils/request'

export function getTools(data) {
  return request({
    url: '/api/v1/tool',
    method: 'get',
    params: data
  })
}

export function upload(data) {
  return request({
    url: '/api/v1/tool/upload',
    method: 'post',
    data,
    headers: {
      'Content-type': 'multipart/form-data'
    }
  })
}

