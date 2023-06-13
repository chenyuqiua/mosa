// 获取用户等级
export function getLevel(level: number) {
  let res: string = ""
  if (level < 0) {
    res = "等级有误"
    return
  }
  switch (level) {
    case 0:
      res = "0"
      break
    case 1:
      res = "VIP1"
      break
    case 2:
      res = "VIP2"
      break
    case 3:
      res = "VIP3"
      break
    case 4:
      res = "M"
      break
    case 5:
      res = "VIP5"
      break
    case 6:
      res = "VIP6"
      break
    case 7:
      res = "VIP7"
      break
    case 8:
      res = "O"
      break
    case 9:
      res = "VIP9"
      break
    case 10:
      res = "VIP10"
      break
    case 11:
      res = "VIP11"
      break
    case 12:
      res = "S"
      break
    case 13:
      res = "VIP13"
      break
    case 14:
      res = "VIP14"
      break
    case 15:
      res = "VIP15"
      break
    case 16:
      res = "A"
      break
    default:
      res = "超级用户"
  }

  return res
}

// 获取用户距离下一等级的充值信息
export function getLevelSpan(userInfo: any) {
  let res: string = ""
  const level = userInfo.vip_level
  const curScore = userInfo.total_charge_money * 10
  if (level < 0 || level === undefined || level === null) {
    res = "等级有误"
    return
  }
  switch (level) {
    case 0:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${8 - curScore}积分`
      break
    case 1:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${28 - curScore}积分`
      break
    case 2:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${68 - curScore}积分`
      break
    case 3:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${88 - curScore}积分`
      break
    case 4:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${108 - curScore}积分`
      break
    case 5:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${128 - curScore}积分`
      break
    case 6:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${168 - curScore}积分`
      break
    case 7:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${208 - curScore}积分`
      break
    case 8:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${228 - curScore}积分`
      break
    case 9:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${288 - curScore}积分`
      break
    case 10:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${308 - curScore}积分`
      break
    case 11:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${388 - curScore}积分`
      break
    case 12:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${488 - curScore}积分`
      break
    case 13:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${588 - curScore}积分`
      break
    case 14:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${888 - curScore}积分`
      break
    case 15:
      res = `累计充值${curScore}积分, 距离下一等级还需要充值${1888 - curScore}积分`
      break
    default:
      res = "您已是最高等级用户"
  }

  return res
}

export function getLevelSpanForPay(userInfo: any, payScore: number) {
  let res: string = ""
  const level = userInfo.vip_level
  const curScore = userInfo.total_charge_money * 10
  if (level < 0 || level === undefined || level === null) {
    res = "等级有误"
    return
  }
  switch (level) {
    case 0:
      if (8 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP1等级, 解锁VIP1等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${8 - curScore}积分`
      }
      break
    case 1:
      if (28 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP2等级, 解锁VIP2等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${28 - curScore}积分`
      }
      break
    case 2:
      if (68 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP3等级, 解锁VIP3等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${68 - curScore}积分`
      }
      break
    case 3:
      if (88 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达M等级, 解锁M等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${88 - curScore}积分`
      }
      break
    case 4:
      if (108 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP5等级, 解锁VIP5等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${108 - curScore}积分`
      }
      break
    case 5:
      if (128 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP6等级, 解锁VIP6等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${128 - curScore}积分`
      }
      break
    case 6:
      if (168 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP7等级, 解锁VIP7等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${168 - curScore}积分`
      }
      break
    case 7:
      if (208 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达O等级, 解锁O等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${208 - curScore}积分`
      }
      break
    case 8:
      if (228 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP9等级, 解锁VIP9等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${228 - curScore}积分`
      }
      break
    case 9:
      if (288 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP10等级, 解锁VIP10等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${288 - curScore}积分`
      }
      break
    case 10:
      if (308 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP11等级, 解锁VIP11等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${308 - curScore}积分`
      }
      break
    case 11:
      if (388 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达S等级, 解锁S等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${388 - curScore}积分`
      }
      break
    case 12:
      if (488 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP13等级, 解锁VIP13等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${488 - curScore}积分`
      }
      break
    case 13:
      if (588 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP14等级, 解锁VIP14等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${588 - curScore}积分`
      }
      break
    case 14:
      if (888 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP15等级, 解锁VIP15等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${888 - curScore}积分`
      }
      break
    case 15:
      if (1888 - curScore <= 0) {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分已到达VIP16等级, 解锁VIP16等级课程和数据分析框等相关权益`
      } else {
        res = `您已成功充值${payScore}积分, 累计充值${curScore}积分, 
        距离下一等级还需要充值${1888 - curScore}积分`
      }
      break
    default:
      res = "您已是最高等级用户"
  }

  return res
}
