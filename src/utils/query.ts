import { FilterQuery, PipelineStage } from "mongoose";

export interface PaginationQuery {
  skip: number;
  limit: number;
}

export interface SearchQuery {
  search?: string;
}

export interface SortQuery<T> {
  sortBy: (keyof T)[];
  sortDirection: number[];
}

export type BaseListQuery<T> = T & PaginationQuery & SearchQuery & SortQuery<T>;

export const buildQuery = <T>(fields: Partial<T>, search?: string) => {
  const query: FilterQuery<T> = { ...fields };
  if (search) {
    query["$text"] = {
      $search: search,
    };
  }
  return query;
};

export const buildPaginationPipeline = <T, M>(
  query: BaseListQuery<T>,
  pickFields?: (keyof M)[]
): PipelineStage[] => {
  const { search, skip, limit, sortBy, sortDirection, ...properties } = query;
  const pipeline: PipelineStage[] = [
    { $match: buildQuery(properties as T, search) },
  ];

  if (pickFields && pickFields.length > 0) {
    pipeline.push({
      $project: pickFields.reduce((fields: Record<keyof M, number>, field) => {
        fields[field] = 1;
        return fields;
      }, {} as Record<keyof M, number>),
    });
  }

  // TODO: find a better way to pass sort params
  if (sortBy) {
    const sort: Record<string, 1 | -1> = {};
    if (Array.isArray(sortBy) && Array.isArray(sortDirection)) {
      sortBy.forEach((p, index) => {
        sort[p as string] = sortDirection[index] === 1 ? 1 : -1;
      });
    } else {
      sort[String(sortBy)] = Number(sortDirection) === 1 ? 1 : -1;
    }

    pipeline.push({ $sort: sort });
  }

  const data = [];

  if (skip !== undefined) {
    data.push({ $skip: Number(skip) });
  }

  if (limit !== undefined) {
    data.push({ $limit: Number(limit) });
  }

  pipeline.push({
    $facet: {
      data,
      total: [{ $count: "total" }],
    },
  });

  return pipeline;
};
