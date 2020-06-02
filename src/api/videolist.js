import request from '@/utils/request'
const baseURL = 'http://localhost:3000'

export function fecthList(params) {
  return request({
    params,
    url: `${baseURL}/videolist/list`,
    method: 'get'
  })
}

export function fetchById(params){
  return request({
    params,
    url: `${baseURL}/videolist/getByid`,
    method:'get'
  })
}
export function update(params){
  return request({
    url:`${baseURL}/videolist/updateVideolist`,
    data:{
      ...params
    },
    method:'post'
  })
}
export function del(params){
  return request({
    params,
    url:`${baseURL}/videolist/del`,
    method:'get'
  })
}
