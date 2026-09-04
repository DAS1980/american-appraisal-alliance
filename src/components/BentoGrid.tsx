import { HTMLAttributes, ReactNode, useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Image grid that can't leave orphan cells. The caller picks the composition
 * (feature tiles via numeric `colSpan`/`rowSpan`); the component owns the grid
 * mechanics and self-heals any layout to a perfect tiling. Pass span NUMBERS,
 * not Tailwind classes (it emits them), and don't nest your own `grid`.
 *
 * Always a CSS grid + `healToTile` (which guarantees a gapless tiling at every
 * breakpoint). For a uniform gallery (no tile spans > 1) the desktop column
 * count is chosen via `pickUniformColumns` so the item count fills it — no empty
 * trailing column, and at most one tile widened by a single column. Feature/bento
 * layouts use the requested `columns`.
 */

export interface BentoTile {
  colSpan?: number; // default 1
  rowSpan?: number; // default 1
}

interface BentoGridProps<T extends BentoTile>
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  items: readonly T[];
  columns?: 2 | 3 | 4;
  renderItem: (item: T, index: number) => ReactNode;
}

type Span = { col: number; row: number };

const COLUMN_CLASS: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/** No feature tiles → a uniform gallery whose column count we can pick to tile cleanly. */
export function isUniformTiles(items: readonly BentoTile[]): boolean {
  return items.every(
    (it) => (it.colSpan ?? 1) <= 1 && (it.rowSpan ?? 1) <= 1,
  );
}

/**
 * Column count in [2, maxCols] that leaves the fewest empty trailing cells for
 * `n` uniform tiles, so healToTile widens the last tile by the least — never a
 * big stretch, never an empty column. e(2) is always ≤ 1, so the chosen count
 * tiles with at most one single-column widen. Fewer than 2 tiles → 1 column.
 */
export function pickUniformColumns(n: number, maxCols: number): number {
  if (n <= 1) return 1;
  let best = 2;
  let bestEmpty = Infinity;
  for (let c = Math.min(maxCols, n); c >= 2; c--) {
    const empty = (c - (n % c)) % c;
    if (empty < bestEmpty) {
      bestEmpty = empty;
      best = c; // scan high→low with strict < → largest c wins ties
    }
  }
  return best;
}

// Literal classes only — Tailwind JIT drops interpolated ones. Below `lg`, all 1×1.
const SPAN_CLASS: Record<string, string> = {
  "1:1": "",
  "2:1": "lg:col-span-2",
  "3:1": "lg:col-span-3",
  "4:1": "lg:col-span-4",
  "1:2": "lg:row-span-2",
  "2:2": "lg:col-span-2 lg:row-span-2",
  "3:2": "lg:col-span-3 lg:row-span-2",
  "4:2": "lg:col-span-4 lg:row-span-2",
  "1:3": "lg:row-span-3",
  "2:3": "lg:col-span-2 lg:row-span-3",
  "3:3": "lg:col-span-3 lg:row-span-3",
  "4:3": "lg:col-span-4 lg:row-span-3",
};

/** Does `spans` tile `columns` into a perfect rectangle (CSS dense placement)? */
export function tilesPerfectly(spans: Span[], columns: number): boolean {
  const occ: boolean[][] = [];
  const free = (r: number, c: number, w: number, h: number) => {
    if (c + w > columns) return false;
    for (let dr = 0; dr < h; dr++)
      for (let dc = 0; dc < w; dc++) if (occ[r + dr]?.[c + dc]) return false;
    return true;
  };
  const fill = (r: number, c: number, w: number, h: number) => {
    for (let dr = 0; dr < h; dr++) {
      occ[r + dr] ??= [];
      for (let dc = 0; dc < w; dc++) occ[r + dr][c + dc] = true;
    }
  };
  let cells = 0;
  for (const s of spans) {
    let placed = false;
    for (let r = 0; !placed && r < 500; r++)
      for (let c = 0; c < columns; c++)
        if (free(r, c, s.col, s.row)) {
          fill(r, c, s.col, s.row);
          cells += s.col * s.row;
          placed = true;
          break;
        }
    if (!placed) return false;
  }
  return cells === occ.length * columns;
}

// `n` 1×1 tiles, last widened to fill its row — footprint stays a multiple of columns, so it always tiles.
function uniformFill(n: number, columns: number): Span[] {
  const out: Span[] = Array.from({ length: n }, () => ({ col: 1, row: 1 }));
  const remainder = n % columns;
  if (n > 0 && remainder !== 0) out[n - 1].col = 1 + (columns - remainder);
  return out;
}

/**
 * Always returns a tiling layout: spans that already tile pass through unchanged
 * (design honored); else widen the last tile, then fall back to uniformFill.
 */
export function healToTile(spans: Span[], columns: number): Span[] {
  if (tilesPerfectly(spans, columns)) return spans;
  const footprint = spans.reduce((n, s) => n + s.col * s.row, 0);
  const remainder = footprint % columns;
  if (remainder !== 0) {
    const grown = spans.map((s) => ({ ...s }));
    const last = grown[grown.length - 1];
    last.col = Math.min(columns, last.col + (columns - remainder));
    if (tilesPerfectly(grown, columns)) return grown;
  }
  return uniformFill(spans.length, columns);
}

function BentoGrid<T extends BentoTile>({
  items,
  columns = 3,
  renderItem,
  className,
  ...props
}: BentoGridProps<T>) {
  // Uniform gallery: pick the desktop column count the item count fills cleanly
  // (no empty trailing column). Feature/bento: honor the requested columns.
  const effectiveColumns = useMemo(
    () => (isUniformTiles(items) ? pickUniformColumns(items.length, columns) : columns),
    [items, columns],
  );
  const spans = useMemo(() => {
    const requested = items.map((it) => ({
      col: Math.max(1, Math.min(effectiveColumns, Math.round(it.colSpan ?? 1))),
      row: Math.max(1, Math.min(3, Math.round(it.rowSpan ?? 1))),
    }));
    return healToTile(requested, effectiveColumns);
  }, [items, effectiveColumns]);

  // Odd count leaves a trailing cell at the 2-col (tablet) breakpoint; last tile fills it.
  const fillTabletTail = items.length % 2 === 1;

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 grid-flow-row-dense",
        "auto-rows-[14rem] sm:auto-rows-[16rem] lg:auto-rows-[18rem]",
        COLUMN_CLASS[effectiveColumns] ?? COLUMN_CLASS[3],
        className,
      )}
      {...props}
    >
      {items.map((item, i) => {
        const s = spans[i];
        const isTabletTail = fillTabletTail && i === items.length - 1;
        return (
          <div
            key={i}
            className={cn(
              "relative h-full overflow-hidden rounded-xl",
              SPAN_CLASS[`${s.col}:${s.row}`],
              // Odd count: last tile fills the trailing cell at the 2-col (tablet)
              // breakpoint. If its healed width is 1, reset to `lg:col-span-1` so the
              // `sm:col-span-2` never leaks into the 3/4-col layout — that leak made
              // the tile wrap and reopened the trailing gap (LPS-1160). When the
              // healed width is >1, SPAN_CLASS already emits the `lg:` override.
              isTabletTail && "sm:col-span-2",
              isTabletTail && s.col === 1 && "lg:col-span-1",
            )}
          >
            {renderItem(item, i)}
          </div>
        );
      })}
    </div>
  );
}

// Both export shapes — generated sections import either; supporting both avoids a module-link crash.
export { BentoGrid };
export default BentoGrid;
