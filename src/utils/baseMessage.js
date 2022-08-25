import Vue from 'vue'

export function errorMessage(_this, msg) {
  _this.$message({
    type: 'error',
    message: msg,
    duration: 1000
  })
}

export function successMessage(_this, msg) {
  _this.$message({
    type: 'success',
    message: msg,
    duration: 1000
  })
}
