import { Rename } from '@vect/rename'
import { says } from '@palett/says'

export const DynamicImport = ({ target, src, prop, name }) => {
  return (async () => {
    target[name ?? prop] = await import(src).then(o => o[prop])
  }) |> Rename(`dynamic import { ${says.roster(prop)} } from '${src}'`)
}

export const DynamicAssign = ({ target, src, prop, name }) => {
  return (async () => {
    const source = prop
      ? await import(src).then(o => o[prop])
      : await import(src)
    return name
      ? Object.assign((target[name] = target[name] ?? {}), source)
      : Object.assign(target, source)
  }) |> Rename(`dynamic import { ${says.roster(prop)} } from '${src}'`)
}
