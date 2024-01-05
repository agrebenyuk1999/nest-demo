import FilterDto from '../query.dto';
import QueryDto from '../query.dto';

export abstract class BaseFilter {
  constructor(protected filter = null) {}

  buildQueryWithFilters(filters): object {
    const queryWithFilters = {};

    if (filters) {
      for (const key in filters) {
        const value = filters[key];

        if (typeof this[`${key}Filter`] === 'function') {
          queryWithFilters[key] = this[`${key}Filter`](value);
        }
      }
    }

    return queryWithFilters;
  }

  nameFilter(value: string) {
    return {
      startsWith: value,
    };
  }

  statusFilter(value: string[]) {
    return {
      in: value,
    };
  }
}
