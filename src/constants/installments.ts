export const INSTALLMENTS_OPTIONS = [1, 2, 3, 6, 12] as const

export const INSTALLMENTS_OPTIONS_OBJ = INSTALLMENTS_OPTIONS.map(i => ({
  value: i.toString(),
  label: i.toString(),
}))
