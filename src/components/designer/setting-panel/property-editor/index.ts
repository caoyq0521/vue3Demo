const modulesFiles = import.meta.glob('./**/*.vue',  { eager: true });
interface Modules {
  [key: string]: any
}
const modules = <Modules>{};

for (const [key, value] of Object.entries(modulesFiles)) {
  const reg = /\/([\w-]*).vue$/;
  const file = key.match(reg);
  let name = ''
  if(file && file[1]) {
    name = file[1];
  }
  modules[name] = value.default;
}

export default modules;
