"use client";

import { usePokemonPagination } from "pokedex/hooks/usePokemonPagination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type Props = {
  count: number;
};

const PokemonPagination = ({ count }: Props) => {
  const {
    nextPageUrl,
    prevPageUrl,
    isFirstPage,
    isLastPage,
    LimitOptions,
    limit,
    handleLimitChange,
  } = usePokemonPagination(count);

  return (
    <>
      <div className="p-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              {!isFirstPage && <PaginationPrevious href={prevPageUrl()} />}
            </PaginationItem>
            <PaginationItem>
              {!isLastPage && <PaginationNext href={nextPageUrl()} />}
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div className="flex w-full items-center justify-end">
        <Select
          value={limit?.toString()}
          onValueChange={(value: string) => handleLimitChange(value)}
        >
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder="Pick sorting option" />
          </SelectTrigger>
          <SelectContent>
            {LimitOptions.map((option) => (
              <SelectItem key={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
};

export { PokemonPagination };
