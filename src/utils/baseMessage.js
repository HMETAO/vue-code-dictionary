import Vue from 'vue'

export function errorMessage(_this,msg) {
  _this.$message({
    type: 'error',
    message: msg
  })
}

export function successMessage(_this,msg) {
  _this.$message({
    type: 'success',
    message: msg
  })
}
