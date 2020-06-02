<template>
  <div>
    <el-form ref="form" :model="videolist" label-width="200px">
      <el-form-item label="视频单名称">
        <el-input v-model="videolist.name"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="videolist.copywriter"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">更新</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>
<script>

import { fetchById ,update} from "@/api/videolist"
export default {
  data(){
    return{
      videolist:{}
    }
    
  },
  created() {
    fetchById({
      id: this.$route.params.id
    }).then(res => {
      //console.log(res)
      this.videolist = res.data
    })
  },
  methods:{
    onSubmit(){
      update(this.videolist).then((res)=>{
        if(res.data.modified >0){
          this.$message({
            message:'更新成功',
            type:'success'
          })
        }else{
          this.$message.error('更新失败')
        }
        this.$router.push('/videolist/video')
      })
    },
    onCancel(){
      this.$router.push('/videolist/video')
    }
  }
}
</script>

<style scoped>

</style>