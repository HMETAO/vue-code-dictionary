import request from '@/utils/request'
import qs from 'qs'

export function getTools(data) {
  return request({
    url: '/api/v1/tool',
    method: 'get',
    params: data
  })
}

export function deleteTool(id) {
  return request({
    url: '/api/v1/tool/' + id,
    method: 'delete'
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

export function downloadTools(data) {
  return request({
    url: '/api/v1/tool/download',
    method: 'get',
    params: data,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    },
    responseType: 'blob'
  })
}

