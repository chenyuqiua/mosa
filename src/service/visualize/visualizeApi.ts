import visualRequest from "../index3"

// 获取饼状图数据
export const getVisualData: any = (params: any) => {
  return visualRequest.get({
    url: "push2.eastmoney.com/api/qt/clist/get/api/qt/clist/get",
    params: {
      fid: params.fid,
      po: params.po,
      pz: params.pz,
      pn: params.pn,
      np: params.np,
      fltt: params.fltt,
      invt: params.invt,
      ut: params.ut,
      fs: params.fs,
      fields: params.fields
    }
  })
}

// 获取柱状图数据
// 北向资金
export const northWardData: any = (params: any) => {
  return visualRequest.get({
    url: "datacenter-web.eastmoney.com/api/data/v1/get",
    params: {
      sortColumns: params.sortColumns,
      // sortTypes: params.sortTypes,
      // pageSize: params.pageSize,
      // pageNumber: params.pageNumber,
      columns: params.columns,
      source: params.source,
      client: params.client,
      reportName: params.reportName,
      filter: params.filter
    }
  })
}

// 上证指数
export const getUpIndexData: any = (params: any) => {
  return visualRequest.get({
    url: "push2his.eastmoney.com/api/qt/stock/fflow/daykline/get",
    params: {
      lmt: params.lmt,
      klt: params.klt,
      fields1: params.fields1,
      fields2: params.fields2,
      ut: params.ut,
      secid: params.secid
    }
  })
}
