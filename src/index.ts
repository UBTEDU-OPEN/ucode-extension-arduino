import { UCodeLinkAPI } from '@ubtech/ucode-extension-common-sdk';
import { ExampleDeviceExtension } from './block';
import { spRegister } from './devices/sp-device';
import { UploadModeRegister } from './upload-mode';

const { injectRpcClient } = UCodeLinkAPI;

console.log('初始化硬件插件', 'arduino-test');

injectRpcClient();

/**
 * 调用 Worker 全局变量 self.UCode 注册
 */
self.UCode.extensions.register({
  DeviceRegister: [spRegister],
  BlockRegister: ExampleDeviceExtension,
  UploadModeRegister,
  DefaultTargetDataRegister: {
    json: {
      name: 'default-target',
      variables: {},
      lists: {},
      broadcasts: {},
      comments: {},
      blocks: {
        'VBLpC7e1pndyf#5sYdtuFK': {
          opcode: 'common_block_arduino_setup',
          next: null,
          parent: null,
          inputs: {},
          fields: {},
          shadow: false,
          deletable: false,
          topLevel: true,
          x: 300,
          y: 150,
          collapsed: false,
        },
        'LzWOyJ88GvE!F5cj!1Llqh': {
          opcode: 'common_block_arduino_loop',
          next: null,
          parent: null,
          inputs: {},
          fields: {},
          shadow: false,
          deletable: false,
          topLevel: true,
          x: 750,
          y: 150,
          collapsed: false,
        },
      },
    },
  },
});
