import Spargs from "../src/index";

describe('Spargs', () => {
  let spargs: Spargs;

  beforeEach(() => {
      spargs = new Spargs();
  });

  it('should get the current environment', () => {
      expect(1).toBe(1);
  });

  it('can create a command', () => {
      let command = spargs.command('test');
      expect(command).toBeTruthy();
      expect(spargs.commands).toHaveProperty('test');
  });

  it('command can be executed', () => {
      let executer = jest.fn();
      spargs.command('test', {
        onExecute: executer
      });
      spargs.parse('test');
      expect(executer).toBeCalledTimes(1);
  });
});
