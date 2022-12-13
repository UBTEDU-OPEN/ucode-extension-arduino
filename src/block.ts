import { ExtensionUI } from '@ubtech/ucode-extension-common-sdk';
import type { UCodeExternalHardwareDefinition } from '@ubtech/ucode-extension-common-sdk/types';
import { ANALOG_PINS, BAUD_RATE, DIGITAL_PINS, PWM_PINS, ToneMenu, TONE_MENU } from './constant';
import { DemoSerialPortDevice } from './devices/sp-device';

const { Toast } = ExtensionUI;

export class ExampleDeviceExtension {
  getInfo(): UCodeExternalHardwareDefinition.GetInfo | UCodeExternalHardwareDefinition.GetInfo[] {
    return {
      // category-1
      name: 'Arduino',
      color1: '#0FBD8C',
      color2: '#0DA57A',
      color3: '#0B8E69',
      menus: {
        DIGITAL_PINS: {
          items: DIGITAL_PINS,
        },
        ANALOG_PINS: {
          items: ANALOG_PINS,
        },
        HIGH_LOW: {
          items: [
            {
              text: '高',
              value: 'HIGH',
            },
            {
              text: '低',
              value: 'LOW',
            },
          ],
        },
        INPUT_OUTPUT: {
          items: [
            {
              text: '输入',
              value: 'INPUT',
            },
            {
              text: '输出',
              value: 'OUTPUT',
            },
          ],
        },
        PWM_PINS: {
          items: PWM_PINS,
        },
        TONE_MENU: {
          items: TONE_MENU,
        },
        BAUD_RATE: {
          items: BAUD_RATE,
        },
      },
      blocks: [
        {
          opcode: 'pinMode',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'DIGITAL_PINS',
            //   defaultValue: '1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
            VAL: {
              type: self.UCode.ArgumentType.DROPDOWN_MENU,
              menu: 'INPUT_OUTPUT',
              defaultValue: 'OUTPUT',
            },
          },
          text: '设置 PIN: [PIN] 为模式: [VAL]',
          func: 'pinMode',
        },
        {
          opcode: 'digitalWrite',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'DIGITAL_PINS',
            //   defaultValue: '1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
            VAL: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 0,
                max: 1, //最大值，非必填
              },
            },
          },
          text: '数字输出 PIN: [PIN] 输出: [VAL]',
          func: 'digitalWrite',
        },
        {
          opcode: 'pwmWrite',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'PWM_PINS',
            //   defaultValue: '3',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 3,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
            VAL: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 0,
              options: {
                type: 'number',
                min: 0,
                max: 255, //最大值，非必填
              },
            },
          },
          text: 'PWM 输出 PIN: [PIN] 输出: [VAL]',
          func: 'pwmWrite',
        },
        {
          opcode: 'high_low',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            VAL: {
              type: self.UCode.ArgumentType.DROPDOWN_MENU,
              menu: 'HIGH_LOW',
              defaultValue: 'HIGH',
            },
          },
          text: '高低电平 [VAL]',
          func: 'getHighLow',
        },
        {
          opcode: 'analogRead',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'ANALOG_PINS',
            //   defaultValue: 'A1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'A1',
            },
          },
          text: '模拟读取 [PIN]',
          func: 'analogRead',
        },
        {
          opcode: 'digitalRead',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'DIGITAL_PINS',
            //   defaultValue: '1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
          },
          text: '数字读取 [PIN]',
          func: 'digitalRead',
        },
        {
          opcode: 'pulseIn',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'DIGITAL_PINS',
            //   defaultValue: '1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
            VAL: {
              type: self.UCode.ArgumentType.DROPDOWN_MENU,
              menu: 'HIGH_LOW',
              defaultValue: 'HIGH',
            },
          },
          text: '脉冲检测 [PIN] 电平 [VAL]',
          func: 'pulseIn',
        },
        {
          opcode: 'pulseInTimeout',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'DIGITAL_PINS',
            //   defaultValue: '1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
            VAL: {
              type: self.UCode.ArgumentType.DROPDOWN_MENU,
              menu: 'HIGH_LOW',
              defaultValue: 'HIGH',
            },
            TIMEOUT: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1000,
            },
          },
          text: '脉冲检测 [PIN] 电平 [VAL] 超时 [TIMEOUT]',
          func: 'pulseInTimeout',
        },
        {
          opcode: 'tones',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            TONE: {
              type: self.UCode.ArgumentType.DROPDOWN_MENU,
              menu: 'TONE_MENU',
              defaultValue: ToneMenu.C3,
            },
          },
          text: '声调 [TONE]',
          func: 'tones',
        },
        {
          opcode: 'playTone',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'DIGITAL_PINS',
            //   defaultValue: '1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
            FREQ: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: ToneMenu.C3,
            },
          },
          text: '播放声调 PIN: [PIN] 频率: [FREQ]',
          func: 'playTone',
        },
        {
          opcode: 'playToneDuration',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            // PIN: {
            //   type: self.UCode.ArgumentType.DROPDOWN_MENU,
            //   menu: 'DIGITAL_PINS',
            //   defaultValue: '1',
            // },
            PIN: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1,
              options: {
                type: 'number',
                min: 1,
                max: 1000, //最大值，非必填
              },
            },
            FREQ: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: ToneMenu.C3,
            },
            DURATION: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: 1000,
            },
          },
          text: '播放声调 PIN: [PIN] 频率: [FREQ] 持续: [DURATION] 毫秒',
          func: 'playToneDuration',
        },
        {
          opcode: 'noTone',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {},
          text: '停止播放声调',
          func: 'noTone',
        },
        {
          opcode: 'baudRate',
          blockType: self.UCode.BlockType.REPORTER,
          arguments: {
            BAUD_RATE: {
              type: self.UCode.ArgumentType.DROPDOWN_MENU,
              menu: 'BAUD_RATE',
              defaultValue: BAUD_RATE[0].value,
            },
          },
          text: '波特率 [BAUD_RATE]',
          func: 'baudRate',
        },
        {
          opcode: 'serialBegin',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            BAUD_RATE: {
              type: self.UCode.ArgumentType.NUMBER,
              defaultValue: BAUD_RATE[0].value,
              options: {
                type: 'number',
                min: 1,
              },
            },
          },
          text: '设置波特率 [BAUD_RATE]',
          func: 'serialBegin',
        },
        {
          opcode: 'serialPrint',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            TEXT: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'say something',
            },
          },
          text: '串口打印 [TEXT]',
          func: 'serialPrint',
        },
        {
          opcode: 'serialPrintln',
          blockType: self.UCode.BlockType.COMMAND,
          arguments: {
            TEXT: {
              type: self.UCode.ArgumentType.STRING,
              defaultValue: 'say something',
            },
          },
          text: '串口打印 换行 [TEXT]',
          func: 'serialPrintln',
        },
      ],
    };
  }

  getHighLow(args: { [key: string]: any }, util: { targetId: string }) {
    return args.VAL;
  }

  pinMode() {}
  noTone() {}

  serialBegin() {}

  digitalRead() {}

  pulseIn() {}

  pulseInTimeout() {}

  pwmWrite() {}

  playTones() {}

  tones() {}

  baudRate() {}

  serialPrintln() {}

  serialPrint() {}

  digitalWrite(args: { [key: string]: any }, util: { targetId: string }): Promise<void> {
    return new Promise((resolve) => {
      const device = self.UCode.extensions.getDevice<DemoSerialPortDevice>(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        Toast('Device 硬件没有连接');
      } else {
        console.log('test-send', args.VAL);
        device?.sendMsg(args.VAL);
      }
      resolve(); // 积木块程序运行结束，避免使用reject。
    });
  }

  analogRead(args: { [key: string]: any }, util: { targetId: string }): Promise<string> {
    return new Promise((resolve) => {
      const device = self.UCode.extensions.getDevice<DemoSerialPortDevice>(util.targetId);
      console.log('Device', device, util);
      if (!device?.isConnected()) {
        console.log('Device 硬件没有连接');
        Toast('Device 硬件没有连接');
        resolve(''); // 积木块程序运行结束，未连接返回空
      } else {
        console.log('analog_read', args.PIN);
        device
          .sendAndWait(args.PIN)
          .then((data) => resolve(data as string)) // 积木块程序运行结束，返回数据
          .catch(() => resolve('')); // 积木块程序运行结束，出错时返回空
      }
    });
  }
}
