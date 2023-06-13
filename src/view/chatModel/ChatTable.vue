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
            </a-table>
        </a-spin>
    </div>
</template>
<script lang="ts" setup>
    import { onMounted, reactive } from "vue";
    // @ts-ignore
    import { openAiList } from "../../service/product/productApi";

    const state: any = reactive({
        loading: false,
        tableColumn: [
            {
                title: "wx_open_id",
                dataIndex: "wx_open_id",
                key: "wx_open_id",
            },
            {
                title: "发送内容",
                key: "search_text",
                dataIndex: "search_text",
            },
            {
                title: "返回内容",
                key: "search_response",
                dataIndex: "search_response",
            },
            {
                title: "创建时间",
                key: "create_time",
                dataIndex: "create_time",
            }
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
            // pageSize: state.pagination.pageSize,
            pageSize:999999,
        };
        openAiList(params)
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
        // getList();
    };
    const reset: any = () => {
        state.pagination.current = 1;
        state.pagination.pageSize = 10;
        getList();
    };
    onMounted(() => {
        getList();
    });
</script>
