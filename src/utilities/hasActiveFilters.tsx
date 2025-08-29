import { FilterState } from '../types'

export function hasActiveFilters(filter: FilterState): boolean {
  return Object.entries(filter).some(([key, value]) => {
    if (!value) return false

    if (Array.isArray(value)) {
      return value.length > 0
    }

    if (key === 'dateRange' && typeof value === 'object') {
      return Boolean(value.from || value.to)
    }

    if (key === 'amountRange' && typeof value === 'object') {
      return value.min != null || value.max != null
    }

    return Boolean(value)
  })
}
