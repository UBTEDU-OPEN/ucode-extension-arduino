import { UCodeUploadMode } from '@ubtech/ucode-extension-common-sdk/types';
import { UCodeLinkAPI, ErrorTool } from '@ubtech/ucode-extension-common-sdk';
import { DemoSerialPortDevice } from '../devices/sp-device';
import { Messages } from '../message';

export const CoreName = 'arduino:avr:mega';

// type ArduinoLocalLibrary = {
//   name: string;
//   version: string;
//   data: Blob;
// };

type ArduinoOnlineLibrary = {
  name: string;
  version: string;
};

/**
 * 代码烧录器
 */
export class Uploader implements UCodeUploadMode.UploaderInterface<any> {
  private _arduinoCompiler: UCodeLinkAPI.ArduinoCompilerAdapter;

  /**
   * Arduino 在线库 (从 Arduino 托管下载的库)
   */
  private _arduinoOnlineLibraries: ArduinoOnlineLibrary[] = [
    /**
     * FIXME: 列表的支持需要在这里临时添加 LinkedList 的库要求
     */
    {
      name: 'LinkedList',
      version: '1.3.3',
    },
  ];

  // /**
  //  * Arduino 本地库 (手动提供的库, zip包)
  //  */
  // private _arduinoLocalLibraries: ArduinoLocalLibrary[] = [];

  /**
   * 这里是 uCode 里面点击烧录时候的逻辑
   * @param code 代码
   * @returns Promise<void>
   */
  uploadCode(code: string) {
    return new Promise<void>((resolve, reject) => {
      const device = this._getDevice();
      const allLog: string[] = [];
      if (!device) {
        reject();
        return;
      }
      if (device.isConnected()) {
        /**
         * 断开设备不触发断开通知
         */
        device.disconnectNoEmit().finally(() => {
          this.compile(code, device.discoverDevice?.id, (log) => {
            allLog.push(log);
          })
            .then(() => {
              device
                .connectNoEmit()
                .finally(() => {
                  resolve();
                })
                .catch((err: Error) => {
                  console.error(err);
                  device.connectNoEmit().finally(() => {
                    reject(
                      ErrorTool.getCustomError({
                        errorCode: 'compile-failed',
                        message: allLog.join(''),
                      })
                    );
                  });
                });
            })
            .catch((err) => {
              console.error(err, allLog);
              reject(
                ErrorTool.getCustomError({
                  errorCode: 'compile-failed',
                  message: allLog.join(''),
                })
              );
            });
        });
      } else {
        this.compile(code, device.discoverDevice?.id, (log) => {
          allLog.push(log);
        })
          .then(() => resolve())
          .catch((err) => {
            console.error(err);
            reject(
              ErrorTool.getCustomError({
                errorCode: 'compile-failed',
                message: allLog.join(''),
              })
            );
          });
      }
    });
  }

  constructor(private _getDevice: () => DemoSerialPortDevice | undefined) {
    this._arduinoCompiler = new UCodeLinkAPI.ArduinoCompilerAdapter(CoreName);
  }

  private downloadLibrary(url: string, name: string) {
    return this._arduinoCompiler.downloadLibrary(url, name, true);
  }

  /**
   * 检查本地 Arduino 库的安装
   */
  async checkInstallLibrary(): Promise<void> {
    try {
      await this._arduinoCompiler.checkAndInstallRequireLibraries({
        requireLibraries: this._arduinoOnlineLibraries.map((l) => l.name),
      });
    } catch (error) {
      console.error('checkAndInstallRequireLibraries error', this._arduinoOnlineLibraries, error);
      throw ErrorTool.getCustomError({
        errorCode: 'check-library',
        message: Messages.prepareLibrary,
      });
    }
    // let version: string | undefined;
    // try {
    //   version = await this._arduinoCompiler.getInstallLibraryVersion(ExploreSDKLibraryName);
    //   console.log('_arduinoCompiler', version);
    // } catch (e) {
    //   console.error('checkInstallLibrary error', e);
    // }
    // if (!version || version !== libVersion) {
    //   try {
    //     await this.downloadLibrary(projectData.getSdkLibraryUrl(), ExploreSDKLibraryName);
    //   } catch (e) {
    //     throw ErrorTool.getCustomError({
    //       errorCode: 'check-install-library-error',
    //       message: Messages.UploadBeforeCheckError,
    //     });
    //   }
    // }
    // loading.close();
  }

  prepareEnv(): Promise<void> {
    return new Promise((resolve, reject) => {
      const device = this._getDevice();
      if (!device) {
        reject(
          ErrorTool.getCustomError({
            errorCode: 'no-connection',
            message: Messages.unconnected,
          })
        );
        return;
      }
      this.checkInstallLibrary()
        .then(() => resolve())
        .catch(() =>
          reject(
            ErrorTool.getCustomError({
              errorCode: 'check-library-error',
              message: Messages.UploadBeforeCheckError,
            })
          )
        );
    });
  }

  public compile(code: string, port: string | undefined, verboseCallback: (data: string) => void): Promise<void> {
    return this._arduinoCompiler.compile(code, port, (data) => verboseCallback?.(data), {
      requireLibraries: this._arduinoOnlineLibraries.map((l) => l.name),
    });
  }
}
