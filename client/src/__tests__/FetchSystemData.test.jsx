import { render, screen, waitFor } from '@testing-library/react';
import useSystemData from '../components/FetchSystemData';
import React from 'react';

// Setup fetch request mock  with vitest..
const mockFetch = vi.fn(); 
global.fetch = mockFetch;



describe('useSystemData', () => {
  it('should fetch system data and update state', async () => {
    const mockSysData = { systemInfo: 'sysInfoData' };

    
    mockFetch.mockResolvedValueOnce({
      json: () => Promise.resolve(mockSysData),
    });




    // mock component tat uses the hook in sysInfoData
    const TestComponent = () => {
      const { fetchedSystemData } = useSystemData();

      if (!fetchedSystemData) {
        return <div>Loading...</div>;
      }

      return <div>{fetchedSystemData.systemInfo}</div>;
    };

    render(<TestComponent />);




    
    await waitFor(() => screen.getByText(mockSysData.systemInfo));



    
    expect(screen.getByText(mockSysData.systemInfo)).toBeInTheDocument();
  });
});