export function Autobind(
  _: any,
  _2: string,
  descriptor: PropertyDescriptor
): PropertyDescriptor {
  const original = descriptor.value;

  const adjacent: PropertyDescriptor = {
    configurable: true,
    get() {
      const bindFn = original.bind(this);
      return bindFn;
    },
  };

  return adjacent;
}
