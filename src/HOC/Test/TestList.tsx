import TestColumn, { TestColumnProps } from '../../components/Test/TestColumn';
import { useEffect, useRef, useCallback } from 'react';
import { tv } from 'tailwind-variants';

const testList = tv({
    base: 'flex overflow-x-auto no-scrollbar pb-2 w-full',
    variants: {
        fullColumns: {
            true: 'justify-between',
            false: 'justify-start gap-1',
        },
    },
});

interface TestListProps {
    columns: TestColumnProps[];
    columnCount: number;
    onColumnCountChange: (count: number) => void;
}

function TestList({ columns, columnCount, onColumnCountChange }: TestListProps) {
    const columnRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);


    // Calculate column width based on content length (don't update state here)
    const getColumnWidth = useCallback(() => {
        // Get actual width from DOM if available
        if (columnRef.current) {
            const width = columnRef.current.offsetWidth;
            if (width > 0) {
                return width;
            }
        }
        
        // Estimate based on content length if not available
        const length = columns?.[0]?.items?.[0]?.length;
        
        // Slight reduction in width to fit more columns
        if (length < 5) return 84;
        if (length < 9) return 120;
        if (length < 13) return 160;
        return 200;
    }, [columns]);

    // Get available container width
    const getContainerWidth = useCallback(() => {
        if (!containerRef.current) return window.innerWidth - 32; // fallback
        return containerRef.current.clientWidth;
    }, []);

    // Calculate how many columns can fit in the viewport
    const calculateColumnCount = useCallback(() => {
        const containerWidth = getContainerWidth();
        const columnWidth = getColumnWidth();
        // Use a reasonable gap (4px)
        const columnGap = 4;
        
        // Calculate number of columns without additional buffer to make calculation more stable
        const columnsCount = Math.floor(containerWidth / (columnWidth + columnGap));
        
        // Ensure we have at least 2 columns and at most 15 columns
        return Math.max(2, Math.min(20, columnsCount));
    }, [getColumnWidth, getContainerWidth]);

    // Update column count whenever necessary
    const updateColumnCount = useCallback(() => {
        const newCount = calculateColumnCount();
        if (newCount !== columnCount) {
            onColumnCountChange(newCount);
        }
    }, [calculateColumnCount, columnCount]);

    // Effect to handle initial load and column width changes
    useEffect(() => {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
            updateColumnCount();
        });
    }, [updateColumnCount]); // Re-run when test items change

    // Effect to handle window resize
    useEffect(() => {
        const handleWindowResize = () => {
            updateColumnCount();
        };

        window.addEventListener('resize', handleWindowResize);
        return () => window.removeEventListener('resize', handleWindowResize);
    }, [updateColumnCount]);

    // Effect to observe container width changes
    useEffect(() => {
        if (!containerRef.current) return;
        
        const resizeObserver = new ResizeObserver(() => {
            updateColumnCount();
        });
        
        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [updateColumnCount]);

    // Effect to observe column width changes
    useEffect(() => {
        if (!columnRef.current) return;
        
        const resizeObserver = new ResizeObserver(() => {
            updateColumnCount();
        });
        
        resizeObserver.observe(columnRef.current);
        return () => resizeObserver.disconnect();
    }, [updateColumnCount]);


    return (
        <div
            ref={containerRef}
            className={testList({ fullColumns: columnCount === columns.length })}
        >
            {columns.map((column, index) => (
                <div key={index} className="first:ml-0 last:mr-0">
                    <TestColumn
                        ref={index === 0 ? columnRef : undefined}
                        {...column}
                    />
                </div>
            ))}
        </div>
    );
}

export default TestList;