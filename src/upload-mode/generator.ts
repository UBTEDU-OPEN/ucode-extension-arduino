import { GeneratorDefinition } from '@ubtech/ucode-extension-common-sdk/types';
import { ArduinoGenerator, CommonUtility } from '@ubtech/ucode-extension-common-sdk';

const { Cast } = CommonUtility;

console.log('Cast ', CommonUtility, Cast);

export const DemoCustomBlockGenerators: { [key: string]: GeneratorDefinition.BlockGenerator } = {
  digitalWrite: {
    toCode(args: { [key: string]: any }) {
      return `digitalWrite(${Cast.toNumberOrString(args.PIN)}, ${Cast.toNumberOrString(args.VAL)});\n`;
    },
  },
  pwmWrite: {
    toCode(args: { [key: string]: any }) {
      return `analogWrite(${Cast.toNumberOrString(args.PIN)}, ${Cast.toNumberOrString(args.VAL)});\n`;
    },
  },
  playTone: {
    toCode(args: { [key: string]: any }) {
      return `tone(${Cast.toNumberOrString(args.PIN)}, ${Cast.toNumberOrString(args.FREQ)});\n`;
    },
  },
  noTone: {
    toCode(args: { [key: string]: any }) {
      return `noTone();\n`;
    },
  },
  playToneDuration: {
    toCode(args: { [key: string]: any }) {
      return `tone(${Cast.toNumberOrString(args.PIN)}, ${Cast.toNumberOrString(args.FREQ)}, ${Cast.toNumberOrString(
        args.DURATION
      )});\n`;
    },
  },
  analogRead: {
    toCode(args: { [key: string]: any }) {
      return [`analogRead(${Cast.toNumberOrString(args.PIN)})`, ArduinoGenerator.ArduinoConstant.ORDERS.ORDER_NONE];
    },
  },
  digitalRead: {
    toCode(args: { [key: string]: any }) {
      return [`digitalRead(${Cast.toNumberOrString(args.PIN)})`, ArduinoGenerator.ArduinoConstant.ORDERS.ORDER_NONE];
    },
  },
  pulseIn: {
    toCode(args: { [key: string]: any }) {
      return [`pulseIn(${Cast.toNumberOrString(args.PIN)}, ${args.VAL})`, ArduinoGenerator.ArduinoConstant.ORDERS.ORDER_NONE];
    },
  },
  pulseInTimeout: {
    toCode(args: { [key: string]: any }) {
      return [
        `pulseIn(${Cast.toNumberOrString(args.PIN)}, ${args.VAL}, ${Cast.toNumberOrString(args.TIMEOUT)})`,
        ArduinoGenerator.ArduinoConstant.ORDERS.ORDER_NONE,
      ];
    },
  },
  high_low: {
    toCode(args: { [key: string]: any }) {
      return [args.VAL, ArduinoGenerator.ArduinoConstant.ORDERS.ORDER_NONE];
    },
  },
  tones: {
    toCode(args: { [key: string]: any }) {
      return [args.TONE, ArduinoGenerator.ArduinoConstant.ORDERS.ORDER_NONE];
    },
  },
  pinMode: {
    toCode(args: { [key: string]: any }) {
      return `pinMode(${Cast.toNumberOrString(args.PIN)}, ${args.VAL});\n`;
    },
  },
  baudRate: {
    toCode(args: { [key: string]: any }) {
      return [args.BAUD_RATE, ArduinoGenerator.ArduinoConstant.ORDERS.ORDER_NONE];
    },
  },
  serialBegin: {
    toCode(args: { [key: string]: any }) {
      return `Serial.begin(${Cast.toNumberOrString(args.BAUD_RATE)});\n`;
    },
  },
  serialPrint: {
    toCode(args: { [key: string]: any }) {
      return `Serial.print(${args.TEXT});\n`;
    },
  },
  serialPrintln: {
    toCode(args: { [key: string]: any }) {
      return `Serial.println(${args.TEXT});\n`;
    },
  },
};
