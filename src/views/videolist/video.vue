<template>
  <div>
    <el-table v-loading="loading" :data="videolist" stripe>
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column label="封面" width="100">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="50" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="copywriter" label="描述"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 删除对话框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>确定删除视频单么？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { fecthList, del } from "@/api/videolist";
export default {
  data() {
    return {
      videolist: [],
      count: 50,
      loading: false,
      
      dialogVisible: false,
      info: {}
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      fecthList({
        start: this.videolist.length,
        count: this.count
      }).then(res => {
        console.log(res);
        this.videolist = res.data;
        this.loading = false;
      });
    },
    onEdit(row) {
      this.$router.push(`/videolist/edit/${row._id}`);
    },
    onDel(row) {
      this.dialogVisible = true
      this.info.id = row._id
    },
    doDel() {
      del({id:this.info.id}).then((res)=>{
        this.dialogVisible = false
        
        if(res.data.deleted > 0){
          this.videolist = []
          this.getList()
          this.$message({
            message:'删除成功',
            type:'success'
          })
        }else{
          this.$message.error('删除失败')
        }
      }) 
    }
  },
}
</script>
