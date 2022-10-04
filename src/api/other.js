import request from '@/utils/request'

export function githubTrend(data) {
  return request({
    url: '/api/v1/other/github',
    method: 'get',
    params: data
  })
}


export function ssh(data) {
  return request({
    url: '/api/v1/other/ssh',
    method: 'post',
    data
  })
}
