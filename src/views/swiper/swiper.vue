<template>
  <div>
    <div class="filter-container">
      <!-- upload组件 用于上传图片  show-file-list是否显示图片列表-->
      <el-upload
        class="upload-demo"
        action="http://localhost:3000/swiper/upload"
        :on-success="uploadSuccess"
        :show-file-list="false"
      >
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>
    <el-table v-loading="loading" :data="swiperList" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="图片" width="400">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除图片么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fetchList, del } from "@/api/swiper";
export default {
  data() {
    return {
      swiperList: [],
      loading: false,
      delDialogVisible: false,
      swiper: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      fetchList().then(res => {
        //console.log(res);
        this.swiperList = res.data;
        this.loading = false;
      });
    },
    uploadSuccess(res) {
      if (res.id_list.length > 0) {
        this.$message({
          message: "上传成功",
          type: "success"
        });
        this.getList();
      }
    },
    onDel(row) {
      this.swiper = row
      console.log(this.swiper)
      this.delDialogVisible=true
    },
    doDel() {
      this.loading = true
      del(this.swiper).then(res => {
          this.loading = false
          this.delDialogVisible=false
          this.getList()
          this.$message({
              message:'删除成功',
              type:'success'
          })
            
      })
    }
  }
};
</script>
<style>
</style>