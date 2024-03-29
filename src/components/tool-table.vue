<template>
  <div class='tool-table-box'>
    <div class='tool-table-header'>
      <el-button type='primary' plain round size='small' @click='()=>{uploadDialogVisible = true}'>上传工具</el-button>
      <el-button type='primary' plain round size='small' @click='downloadToolsEventFunction'>批量下载</el-button>
    </div>
    <el-table
      border
      :data='tools'
      highlight-current-row
      @selection-change='toolSelectEventFunction'
      style='width: 100%'>
      <el-table-column
        type='selection'>
      </el-table-column>
      <el-table-column
        align='center'
        prop='toolName'
        label='工具名'
      >
      </el-table-column>
      <el-table-column
        align='center'
        prop='toolType'
        label='工具类型'
      >
      </el-table-column>
      <el-table-column
        align='center'
        prop='toolSize'
        label='工具大小 (kb)'
      >
      </el-table-column>
      <el-table-column
        align='center'
        prop='createTime'
        label='上传时间'
      >
      </el-table-column>
      <el-table-column
        align='center'
        label='操作'>
        <template v-slot='scope'>
          <el-button type='primary' size='small' @click='downloadOneToolEventFunction(scope.row)'>下载</el-button>
          <el-button type='danger' size='small' @click='deleteToolEventFunction(scope.row)'>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change='toolPageSizeChangeEventFunction'
      @current-change='toolPageNumChangeEventFunction'
      :current-page='paginationInfo.pageNum'
      :page-sizes='[1, 5, 10]'
      :page-size='paginationInfo.pageSize'
      layout='total, sizes, prev, pager, next, jumper'
      :total='paginationInfo.total'>
    </el-pagination>
    <el-dialog
      title='上传tool'
      width='30%'
      :visible.sync='uploadDialogVisible'
      @close='uploadDialogHandleCloseEventFunction'>
      <el-upload
        ref='uploadRef'
        multiple
        :auto-upload='false'
        drag
        action='无实际用途'>
        <i class='el-icon-upload'></i>
        <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <span slot='footer' class='dialog-footer'>
        <el-button @click='uploadDialogVisible = false'>取 消</el-button>
        <el-button type='primary' @click='uploadRequestEventFunction'>确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { deleteTool, downloadTools, getTools, upload } from '@/api/tool'
import { errorMessage, successMessage } from '@/utils/baseMessage'

export default {
  name: 'tool-table',
  data() {
    return {
      paginationInfo: {
        pageSize: 5,
        pageNum: 1,
        total: 0
      },
      uploadDialogVisible: false,
      tools: [],
      selectionToolIds: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getTools()
    },
    // 下载单个tool点击回调
    downloadOneToolEventFunction(row) {
      location.href = row.url
    },
    // 复选框选取回调
    toolSelectEventFunction(selection) {
      this.selectionToolIds = selection.map(selectRow => {
        return selectRow.id
      })
    },
    // 批量下载tools回调
    downloadToolsEventFunction() {
      downloadTools({ ids: this.selectionToolIds })
        .then(res => {
          let blob = new Blob([res], { type: 'application/zip;charset=UTF-8' }) // 为blob设置文件类型
          let url = window.URL.createObjectURL(blob) // 创建一个临时的url指向blob对象
          let a = document.createElement('a')
          a.href = url
          a.click()
          // 释放这个临时的对象url
          window.URL.revokeObjectURL(url)
        })
    },
    // 关闭对话框回调
    uploadDialogHandleCloseEventFunction() {
      this.$refs.uploadRef.clearFiles()
      this.getTools()
    },
    // 删除单个tool回调
    deleteToolEventFunction(row) {
      deleteTool(row.id)
        .then(res => {
          this.tools = this.tools.filter(item => {
            return item.id !== row.id
          })
        })
    },
    // 确认上传回调函数
    uploadRequestEventFunction() {
      let { uploadFiles } = this.$refs.uploadRef
      let form = new FormData()
      // 文件对象
      uploadFiles.map(file => form.append('files', file.raw))
      upload(form)
        .then(() => {
          successMessage(this, '上传成功')
        }).catch(err => {
        errorMessage(this, '上传失败：' + err)
      })
      this.uploadDialogVisible = false
    },
    // pageSize发生变化触发回调
    toolPageSizeChangeEventFunction(pageSize) {
      this.paginationInfo.pageSize = pageSize
      this.getTools()
    },
    toolPageNumChangeEventFunction(pageNum) {
      this.paginationInfo.pageNum = pageNum
      this.getTools()
    },
    // 获取tools列表
    getTools() {
      getTools({ pageSize: this.paginationInfo.pageSize, pageNum: this.paginationInfo.pageNum })
        .then(res => {
          this.tools = res.data.list
          this.paginationInfo.total = res.data.total
        })
    }
  }
}
</script>

<style scoped lang='less'>
.tool-table-box {
  .tool-table-header {
    margin-bottom: 10px;
  }
}

.el-pagination {
  margin-top: 10px;
  text-align: center;
}
</style>
