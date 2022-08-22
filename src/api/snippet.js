import request from '@/utils/request'

export function getSnippet(id) {
  return request({
    url: `/api/v1/snippet/${id}`,
    method: 'get'
  })
}

export function insertSnippet(data) {
  return request({
    url: `/api/v1/snippet`,
    method: 'post',
    data
  })
}
