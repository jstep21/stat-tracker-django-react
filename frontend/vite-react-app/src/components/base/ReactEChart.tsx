import { Box, BoxProps } from '@mui/material';
import { EChartsReactProps } from 'echarts-for-react';
import EChartsReactCore from 'echarts-for-react/lib/core';
import ReactEChartsCore from 'echarts-for-react/lib/core';
import { forwardRef, useEffect } from 'react';

export interface ReactEchartProps extends BoxProps {
  echarts: EChartsReactProps['echarts'];
  option: EChartsReactProps['option'];
  data?: any; //checks if data is valid
}

const ReactEChart = forwardRef<null | EChartsReactCore, ReactEchartProps>(
  ({ option, data, ...rest }, ref) => {
    if (!data || data.length === 0) {
      return <div>No Data Available</div>;
    }

    useEffect(() => {
      return () => {
        if (ref && typeof ref === 'object' && ref.current) {
          const echartsInstance = ref.current.getEchartsInstance();
          if (echartsInstance) {
            echartsInstance.dispose();
          }
        }
      };
    }, [ref]);

    return (
      <Box
        component={ReactEChartsCore}
        ref={ref}
        option={{
          ...option,
          tooltip: {
            ...option.tooltip,
            confine: true,
          },
        }}
        {...rest}
      />
    );
  },
);

export default ReactEChart;
