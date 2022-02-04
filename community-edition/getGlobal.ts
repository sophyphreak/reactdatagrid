export function getGlobal<T extends Window>() {
  return typeof globalThis !== 'undefined'
    ? ((globalThis as any) as T)
    : window;
}
