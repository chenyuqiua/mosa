<template>
  <div>
    <div style="margin-bottom: 10px">
      <a-button
        type="primary"
        size="mini"
        @click="reset"
        :loading="state.loading"
        >重置</a-button
      >
      <a-button
        type="primary"
        size="mini"
        @click="getList"
        :loading="state.loading"
        style="margin-left: 10px"
        >查询</a-button
      >
    </div>
    <a-spin :spinning="state.loading">
      <a-table
        :columns="state.tableColumn"
        :data-source="state.tableData"
        @change="handleTableChange"
        :pagination="state.pagination"
        :scroll="{ x: '100%', y: '600px' }"
        bordered
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
              <div v-if="userInfo&&userInfo.username==='yma16'">
                  <a-button
                          v-if="!record.is_vip"
                          type="primary"
                          size="mini"
                          @click="upBtn(record)"
                          danger
                          :loading="state.loading"
                  >
                      升级
                  </a-button>
                  <a-button
                          v-else
                          type="primary"
                          size="mini"
                          @click="downBtn(record)"
                          :loading="state.loading"
                  >降级</a-button
                  >
              </div>
              <div v-else>无权限操作</div>
          </template>
        </template>
      </a-table>
    </a-spin>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive,computed } from "vue";
import {useStore} from "vuex";
// @ts-ignore
import { getWxUserList, updateUser } from "../../service/product/productApi";
//store
const store = useStore();
const userInfo = computed(() => {
    return store.state.user.userInfo;
});

const state: any = reactive({
  loading: false,
  tableColumn: [
    {
      title: "微信名称",
      dataIndex: "wx_name",
      key: "wx_name",
    },
    {
      title: "更新时间",
      dataIndex: "update_time",
      key: "update_time",
    },
    {
      title: "wx_open_id",
      dataIndex: "wx_open_id",
      key: "wx_open_id",
    },
    {
      title: "消息次数",
      key: "send_msg_count",
      dataIndex: "send_msg_count",
    },
    {
      title: "是否vip",
      key: "is_vip",
      dataIndex: "is_vip",
    },
    {
      title: "操作",
      key: "action",
    },
  ],
  tableData: [],
  pagination: {
    total: 0,
    current: 1,
    pageSize: 10,
    pageSizeOptions: ["50", "100", "500"],
    showTotal: (total: any, range: any) => {
      return range[0] + "-" + range[1] + " 共" + total + "条";
    },
    showQuickJumper: true, //是否可以快速跳转至某页
    showSizeChanger: true,
  },
});

const getList: any = () => {
  state.loading = true;
  const params = {
    page: state.pagination.current,
    pageSize: state.pagination.pageSize,
  };
  getWxUserList(params)
    .then((res: any) => {
      console.log("res", res);
      if (res) {
        state.tableData = res?.data?.data?.data;
        state.pagination.total = res?.data?.data?.total;
      }
    })
    .catch((r: any) => {
      console.log("r", r);
      state.tableData = [];
      state.pagination.total = 0;
    })
    .finally(() => {
      state.loading = false;
    });
};
const handleTableChange = (params: any) => {
  state.pagination.current = params.current;
  state.pagination.pageSize = params.pageSize;
  getList();
};
const reset: any = () => {
  state.pagination.current = 1;
  state.pagination.pageSize = 10;
  getList();
};
const updateUserVip: any = (params: any) => {
  state.loading = true;
  updateUser(params).finally(() => {
    state.loading = false;
  });
  getList();
};

const upBtn: any = (row: any) => {
  const params = {
    wx_open_id: row.wx_open_id,
    is_vip: 1,
  };
  updateUserVip(params);
};

const downBtn: any = (row: any) => {
  const params = {
    wx_open_id: row.wx_open_id,
    is_vip: 0,
  };
  updateUserVip(params);
};

onMounted(() => {
  getList();
});
</script>
