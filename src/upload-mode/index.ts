import { ArduinoGenerator } from '@ubtech/ucode-extension-common-sdk';
import { Uploader } from './uploader';
import { DemoCustomBlockGenerators } from './generator';

/**
 * 代码转换器, 这里的 key 需要和 blocks 里面的对应
 */
export const UploadModeRegister = ArduinoGenerator.getArduinoCodeGenerators({
  uploader: Uploader,
  CustomBlockGenerators: DemoCustomBlockGenerators,
});
