<template>
  <div id='xterm' class='xterm' />
</template>
<script>
import 'xterm/css/xterm.css'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { AttachAddon } from 'xterm-addon-attach'

export default {
  name: 'Xterm',
  props: {
    socketURI: {
      type: String,
      default: 'ws://127.0.0.1:8972/ssh?token=' + document.cookie.substring(document.cookie.indexOf('code-dictionary')).split('=')[1]
    }
  },
  data() {
    return {
      socket: '',
      term: ''
    }
  },
  mounted() {
    this.initSocket()
  },
  beforeDestroy() {
    this.socket.close()
    this.term.dispose()
  },
  methods: {
    initTerm() {
      const term =new Terminal({
        rendererType: "canvas", //渲染类型
        rows: 40, //行数
        cols: 100, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, //启用时，光标将设置为下一行的开头
        // scrollback: 50, //终端中的回滚量
        disableStdin: false, //是否应禁用输入
        windowsMode: true, // 根据窗口换行
        cursorStyle: "underline", //光标样式
        cursorBlink: true, //光标闪烁
        theme: {
          foreground: "#ECECEC", //字体
          background: "#000000", //背景色
          cursor: "help", //设置光标
          lineHeight: 20,
        },
      });
      const attachAddon = new AttachAddon(this.socket)
      const fitAddon = new FitAddon()
      term.loadAddon(attachAddon)
      term.loadAddon(fitAddon)
      term.open(document.getElementById('xterm'))
      fitAddon.fit()
      term.focus()
      this.term = term
    },
    initSocket() {
      this.socket = new WebSocket(this.socketURI)
      this.socketOnOpen()
      this.socketOnClose()
      this.socketOnError()
    },
    socketOnOpen() {
      this.socket.onopen = () => {
        // 登录
        // this.socket.send(JSON.stringify(this.linkInfo))
        // 链接成功后
        this.initTerm()
      }
    },
    socketOnClose() {
      this.socket.onclose = () => {
        console.log('close socket')
      }
    },
    socketOnError() {
      this.socket.onerror = () => {
        console.log('socket 链接失败')
      }
    }
  }
}
</script>

