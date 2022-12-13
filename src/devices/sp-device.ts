import { CommonProtocols } from '@ubtech/ucode-extension-common-sdk';
import type { HardwareDeviceConstructorArgumentType } from '@ubtech/ucode-extension-common-sdk/types';

const { SerialPortProtocol, getSerialPortDeviceRegister } = CommonProtocols.SerialPort;

export class DemoSerialPortDevice extends SerialPortProtocol {
  /**
   * 串口 构造函数
   * @param args uCode 初始化的时候会注入的函数或者变量
   */
  constructor(args: HardwareDeviceConstructorArgumentType) {
    super(args);
    this.onData(this.receiveMsg.bind(this)); // 绑定接收消息的事件
  }

  /**
   * 发送消息
   * @param {string} data
   */
  sendMsg(data: string) {
    /**
     * this.send 发送消息
     */
    this.send(Buffer.from(data));
  }

  /**
   * 发送并等待, 适合一问一答的协议类型
   * @param {string} data
   * @param {number} timeout
   * @returns {Promise<string>}
   */
  sendAndWait(data: string, timeout = 3000) {
    return new Promise((resolve, reject) => {
      const timeoutDispose = setTimeout(() => {
        // 超时处理
        dispose.dispose();
        reject(new Error('timeout'));
      }, timeout);
      const dispose = this.onData((data) => {
        // 监听消息会返回一个 dispose
        const msg = Buffer.from(data).toString();
        console.log(msg, msg.length);
        if (msg.endsWith('\r\n')) {
          // 这里的案例是使用 回车做分隔符
          clearTimeout(timeoutDispose); // 清空 timeout
          dispose.dispose(); // 收到想要的消息, 清理掉事件
          resolve(msg.replace('\r\n', '')); // 返回消息
        }
      });
      this.send(Buffer.from(data));
    });
  }

  /**
   * 当接收到消息后, 会调用该方法
   * @param {string | Buffer} data
   */
  receiveMsg(data: string | Buffer) {
    console.log(data);
  }
}

export const spRegister = getSerialPortDeviceRegister({
  DeviceConnection: DemoSerialPortDevice,
  // 以下配置均为可选配置
  Options: {
    openOptions: {
      baudRate: 115200, // 串口打开的波特率, 必填
      // bufferSize: 12 * 1024 * 1024, // 缓冲区大小 可选
    },
    /**
   queueOptions: {
     enable: true, // 数据发送是否启用队列, 可选
    interval: 70, // 启用队列时数据发送的间隔
  },
 *
 */
    /**
 * 发现设备时过滤用的vid和pid,配置后将只显示和配置id一致的串口设备, 可选
    filter: {
      vid: '0403',
      pid: '7523',
    },
 */
    /**
 * 自定义显示串口设备名, 可以根据串口搜索出来的设备, 进行名字加工, 可选
  customDeviceName: (data) => `myRobot_${data?.comName}`,
 */
  },
});
