<template>
  <div>
    <el-button type="primary" size="small" @click="openAdd" class="el-icon-plus" plain>新增</el-button>
    <el-table
        :data="deptData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
          prop="id"
          label="ID"
          sortable>
      </el-table-column>
      <el-table-column
          prop="deptName"
          label="部门名称">
      </el-table-column>
      <el-table-column
          prop="level"
          label="等级">
      </el-table-column>
      <el-table-column
          prop="createTime"
          label="创建时间">
      </el-table-column>
      <el-table-column
          prop="path"
          label="路径">
      </el-table-column>
      <el-table-column
          label="操作">
        <template v-slot="scope">
          <el-button type="text" size="small" @click="openUpdate(scope.row)" plain class="el-icon-edit">修改</el-button>
          <el-button type="text" size="small" @click="openAddIn(scope.row.id)" plain class="el-icon-plus">新增</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row.id)" plain class="el-icon-delete-solid">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-select v-model="form.parentId" placeholder="请选择">
            <el-option label="马德堡科技有限公司" :value="0"></el-option>
            <el-option v-for="t in parentData" :label="t.deptName" :value="t.id"></el-option>
          </el-select>

        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="form.deptName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门位置" :label-width="formLabelWidth">
          <el-input v-model="form.place" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import axios from "axios";

export default {
  data() {
    return {
      deptData: [],
      dialogFormVisible:false,
      formLabelWidth:'120px',
      form:{
        parentId:0
      },
      title:"",
      parentData:[],
    }
  },
  methods: {
    getDepts(){
      axios.post("dept/list").then(r=>{
        this.deptData = r.data;
      })
    },
    openAdd(){
      this.title="新增部门";
      this.getParent();
      this.dialogFormVisible = true;
    },
    openAddIn(id){
      this.title="新增部门";
      this.form.parentId = parseInt(id);
      this.getParent();
      this.dialogFormVisible = true;
    },
    getParent(){
      axios.get("dept/getParent").then(r=>{
        this.parentData = r.data
        console.log(this.parentData);
      })
    },
    cancel(){
      this.title="";
      this.form={parentId: 0};
      this.dialogFormVisible=false;
    },
    deleteUser(id){
      axios.delete("dept/delDept?id="+id).then(r=>{
        if (r.code == 200){
          this.getDepts();
          this.$message.success("删除成功");
        }
      })
    },
    submit(){
      if (this.form.id == null){
        axios.post("dept/addDept",this.form).then(r=>{
          if (r.code == 200){
            this.form={parentId:0};
            this.getDepts();
            this.$message.success("新增成功")
            this.dialogFormVisible=false;
          }
        })
      }else {
        axios.put("dept/updDept",this.form).then(r=>{
          if (r.code == 200){
            this.form={parentId: 0};
            this.getDepts();
            this.$message.success("修改成功")
            this.dialogFormVisible=false;
          }
        })
      }
    },
    openUpdate(obj){
      this.getParent()
      obj.parentId = parseInt(obj.parentId)
      this.form = obj;
      console.log(this.form)
      this.title="修改部门";
      this.dialogFormVisible = true;
    },
  },
  created() {
    this.getDepts();
  }
}
</script>

<style scoped>

</style>