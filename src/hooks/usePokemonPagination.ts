import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useCallback, useMemo } from "react";

const LimitOptions = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
];

const usePokemonPagination = (count: number) => {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const [pagination, setPagination] = useState({ page: 1, limit: 10 });

  const updateUrlWithParams = useCallback(
    (newParams: { page: number; limit: number }) => {
      const updatedParams = new URLSearchParams(params);
      for (const key in newParams) {
        updatedParams.set(
          key,
          newParams[key as keyof typeof newParams].toString(),
        );
      }
      return `${pathname}?${updatedParams.toString()}`;
    },
    [params, pathname],
  );

  const nextPageUrl = useCallback(() => {
    return updateUrlWithParams({
      page: pagination.page + 1,
      limit: pagination.limit,
    });
  }, [pagination, updateUrlWithParams]);

  const prevPageUrl = useCallback(() => {
    return updateUrlWithParams({
      page: pagination.page - 1,
      limit: pagination.limit,
    });
  }, [pagination, updateUrlWithParams]);

  const isLastPage = useMemo(() => {
    return pagination.page * pagination.limit >= count;
  }, [pagination, count]);

  const isFirstPage = useMemo(() => {
    return pagination.page === 1;
  }, [pagination]);

  const paginationPagesLinks = useCallback(() => {
    return Array.from({ length: 3 }, (_, index) => {
      const page = pagination.page + index;
      return {
        page,
        url: updateUrlWithParams({ page, limit: pagination.limit }),
      };
    });
  }, [pagination, updateUrlWithParams]);

  const handleLimitChange = (value: string) => {
    setPagination({
      ...pagination,
      limit: parseInt(value),
      page: 1,
    });

    const searchParams = new URLSearchParams(params);
    searchParams.set("limit", value);
    searchParams.set("page", "1");

    router.replace(`${pathname}?${searchParams.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    const newPage = parseInt(params.get("page") ?? "1");
    const newLimit = parseInt(params.get("limit") ?? "10");
    setPagination({ page: newPage, limit: newLimit });
  }, [params]);

  return {
    ...pagination,
    nextPageUrl,
    prevPageUrl,
    handleLimitChange,
    isFirstPage,
    isLastPage,
    paginationPagesLinks,
    LimitOptions,
  };
};

export { usePokemonPagination };
