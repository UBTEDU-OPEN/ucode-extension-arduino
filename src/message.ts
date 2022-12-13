const formatMessage = self.UCode.formatMessage;

export const Messages = {
  prepareLibrary: formatMessage({
    id: 'serialport.uploader.prepareLibrary',
    defaultMessage: '正在准备库文件',
  }),
  UploadBeforeCheckError: formatMessage({
    id: 'serialport.uploader.UploadBeforeCheckError',
    defaultMessage: '上传检查出错',
  }),
  unconnected: formatMessage({
    id: 'serialport.uploader.unconnected',
    defaultMessage: '设备已断开，请先连接设备',
  }),
  compileFailed: formatMessage({
    id: 'serialport.uploader.compileFailed',
    defaultMessage: '烧录失败, 请检查错误日志',
  }),
};
