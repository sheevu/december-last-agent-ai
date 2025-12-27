import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

// Mock Recharts ResponsiveContainer
vi.mock('recharts', async () => {
    const OriginalModule = await vi.importActual('recharts');
    return {
        ...OriginalModule,
        ResponsiveContainer: ({ children }) => (
            <div className="recharts-responsive-container" style={{ width: '800px', height: '600px' }}>
                {children}
            </div>
        ),
    };
});

// Mock ResizeObserver which is used by Recharts
global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
}));
