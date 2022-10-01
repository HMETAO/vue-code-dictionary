import request from '@/utils/request'

export function githubTrend(data) {
  return request({
    url: '/api/v1/other/github',
    method: 'get',
    params: data
  })
}


