import {get, post} from '../utils/request'


/// 创建打卡
export function createTask(title,
                           content,
                           iconType,
                           startTime,
                           endTime,
                           isPublic) {
  // if (content === null || content.length <= 0){
  //   return get('/task/create-task', {
  //     title,
  //     iconType,
  //     startTime,
  //     endTime,
  //     isPublic
  //   })
  // }
  return post('/task/create-task', {
    title,
    content,
    iconType,
    startTime,
    endTime,
    isPublic
  })
}

// 任务详情
export function taskDetail(task_id) {
  return get('/task/sub-detail', {
    task_id
  })
}

// 加入任务
export function joinTask(sub_id, invite_code) {
  return post('/task/join', {
    sub_id,
    invite_code
  })
}

// 打卡任务
export function doSignTask(sub_id) {
  return get('/signin/do-signin', {
    sub_id
  })
}

// 退出任务
export function quickTask(sub_id) {
  return post('/task/quit-task', {
    sub_id
  })
}

// 获取任务图标
export function getTaskIcons() {
  return get('/task/get-task-icons', {})
}

// 打卡详情
export function signinDetail(task_id) {
  return get('/task/sub-detail', {
    task_id
  })
}
