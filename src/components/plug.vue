<template>
  <el-container class='plug-box'>
    <el-container class='chart-box'>
      <el-header height='47px' class='chart-header'>
        <i class='iconfont'>&#xe63e;</i>图表
      </el-header>
      <el-main class='chart-main'>
        1
      </el-main>
    </el-container>
    <el-container class='quick-box'>
      <el-header height='47px' class='quick-header'>
        <i class='iconfont'>&#xe886;</i>快捷工具
      </el-header>
      <el-main class='quick-main'>
        <div class='quick-body'>
          <div class='quick-item'>
            <el-tooltip effect='dark' content='ssh连接' placement='top-start'>
              <el-button class='iconfont' type='warning' circle @click='()=>{this.sshDialogFormVisible=true}'>&#xe7b6;
              </el-button>
            </el-tooltip>
          </div>
        </div>
      </el-main>
    </el-container>

    <el-dialog title='ssh配置' :visible.sync='sshDialogFormVisible' width='450px'>
      <el-form :model='sshForm'>
        <el-form-item label='host' :label-width='formLabelWidth'>
          <el-input v-model='sshForm.host' autocomplete='off'></el-input>
        </el-form-item>
        <el-form-item label='username' :label-width='formLabelWidth'>
          <el-input v-model='sshForm.username' autocomplete='off'></el-input>
        </el-form-item>
        <el-form-item label='password' :label-width='formLabelWidth'>
          <el-input v-model='sshForm.password' autocomplete='off' show-password></el-input>
        </el-form-item>
        <el-form-item label='port' :label-width='formLabelWidth'>
          <el-input v-model='sshForm.port' autocomplete='off'></el-input>
        </el-form-item>
      </el-form>
      <div slot='footer' class='dialog-footer'>
        <el-button @click='sshDialogFormVisible = false'>取 消</el-button>
        <el-button type='primary' @click='sshClickEventFunction'>确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import { ssh } from '@/api/other'
import { errorMessage } from '@/utils/baseMessage'

export default {
  name: 'plug',
  data() {
    return {
      sshDialogFormVisible: false,
      formLabelWidth: '100px',
      sshForm: {
        username: 'root',
        password: '',
        port: '22',
        host: ''
      }
    }
  },
  methods: {
    sshClickEventFunction() {
      ssh(this.sshForm)
        .then(() => {
          this.$router.push('/ssh')
        })
        .catch((err) => {
          errorMessage(this, err)
        })
    }
  }
}
</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
  margin-right: 5px;

  .el-header {
    padding: 18px 20px;
    margin: 0;
    border-bottom: 1px solid #EBEEF5;
    display: flex;
    align-items: center;

    i {
      font-size: 30px;
      margin-right: 10px;
    }
  }
}


.plug-box {
  flex: 1;
  flex-direction: column;

  .quick-box {
    background-color: #fff;
    margin-top: 10px;

    .quick-main {
      display: flex;

      .quick-body {
        .quick-item {
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;

          .el-button {
            font-size: 24px;
          }

        }
      }
    }
  }

  .chart-box {
    background-color: #fff;

  }
}
</style>
