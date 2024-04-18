<template>
  <div class="list">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>美食管理</el-breadcrumb-item>
      <el-breadcrumb-item>列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input
            placeholder="请输入内容(仅标题)"
            v-model="searchQuery"
            clearable
            @clear="getUserList()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserSearch"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <!-- <el-button type="info" plain @click="quchong">一键去重</el-button> -->
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column align="center" type="index"></el-table-column>
        <el-table-column align="center" label="美食图片">
          <template slot-scope="scope">
            <img v-if="scope.row.img" class="img" :src="scope.row.img" />
            <span v-else>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="标题"
          prop="title"
        ></el-table-column>
        <el-table-column
          align="center"
          label="详情"
          prop="yuanliao"
        ></el-table-column>
        <el-table-column
          align="center"
          label="详情"
          prop="zhizuo"
        ></el-table-column>
        <el-table-column align="center" label="类别">
          <template slot-scope="scope">
            <span v-if="scope.row.num == 0">早餐</span>
            <span v-if="scope.row.num == 1">素食</span>
            <span v-if="scope.row.num == 2">荤菜</span>
            <span v-if="scope.row.num == 3">汤品</span>
            <span v-if="scope.row.num == 4">烘焙</span>
            <span v-if="scope.row.num == 5">其他</span>
            <span v-else>{{ scope.row.key }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row)"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.goods_id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改 -->
    <el-dialog
      title="修改美食信息"
      :visible.sync="editDialogVisible"
      width="66%"
      @close="editDialogClosed"
    >
      <el-form :model="editForm" ref="editFormRef" label-width="90px">
        <el-form-item label="标题">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="制作">
          <el-input v-model="editForm.zhizuo"></el-input>
        </el-form-item>
        <el-form-item label="原料">
          <el-input v-model="editForm.yuanliao"></el-input>
        </el-form-item>
        <!-- <el-form-item label="价格">
          <el-input v-model="editForm.money"></el-input>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userlist: [],

      searchQuery: "", // 搜索
      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,
      editForm: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("getCaipin");
      // if (res.meat.status !== 200) return this.$message.error(res.meta.msg)
      this.userlist = res.list;
      console.log(res.list);
    },
    // 关闭修改对话框
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改
    showEditDialog(obj) {
      console.log(obj);
      this.editForm = obj;
      this.editDialogVisible = true;
    },
    // 删除
    // 根据Id删除对应的用户信息
    async removeUserById(goods_id) {
      // 弹框询问用户是否删除数据
      const confirmResult = await this.$confirm(
        "是否要删除?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);

      // 如果用户确认删除，则返回值为字符串 confirm
      // 如果用户取消了删除，则返回值为字符串 cancel
      // console.log(confirmResult)
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }

      const { data: res } = await this.$http.get("delCaipin", {
        params: {
          goods_id,
        },
      });
      console.log(res.data);
      this.$message.success("删除菜谱成功！");
      this.getUserList();
    },

    // 确认修改
    async editUserInfo() {
      const { data: res } = await this.$http.get("updateCaipin", {
        params: {
          title: this.editForm.title,
          zhizuo: this.editForm.zhizuo,
          yuanliao: this.editForm.yuanliao,
          money: this.editForm.money,
          goods_id: this.editForm.goods_id,
        },
      });
      console.log(res);
      // 关闭对话框
      this.editDialogVisible = false;
      this.$message.success("修改成功！");
      this.getUserList();
    },

    // 搜索
    // 搜索
    async getUserSearch() {
      const { data: res } = await this.$http.get("search", {
        params: {
          title: this.searchQuery,
        },
      });
      this.userlist = res.list;
    },

  },
};
</script>
<style lang="less" scoped>
.img {
  width: 120px;
  height: 80px;
}
</style>