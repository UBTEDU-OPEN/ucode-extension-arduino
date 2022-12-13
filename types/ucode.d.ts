import type { UCodeWorkerScope } from '@ubtech/ucode-extension-common-sdk/types';

declare global {
  interface Window {
    UCode: UCodeWorkerScope.ExternalExtensionGlobalVariable;
  }
}
