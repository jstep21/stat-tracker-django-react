import React, { useEffect, useMemo, useRef } from 'react';
import * as d3 from 'd3';
import { MomentumData } from 'data/match-details-data.ts';


interface MomentumChartProps {
    data: MomentumData[];
    width?: number;
    height?: number;
    homeTeamColor: string;
    awayTeamColor: string;
}

const MomentumChart: React.FC<MomentumChartProps> = ({ 
    data, 
    width = 800, 
    height = 500, 
    homeTeamColor, awayTeamColor
 }) => {
    const momentumRef = useRef<SVGSVGElement | null>(null);
    const derivativeRef = useRef<SVGSVGElement | null>(null);
    const integalRef = useRef<SVGSVGElement | null>(null);
    const totalIntegralRef = useRef<SVGSVGElement | null>(null);

    const derivativeData = useMemo(() => {
        if (data.length < 2) return [];
        return data.map((d, i) => {
            if (i === 0) return { minute: d.minute, value: 0};
            return {
                minute: d.minute,
                value: (d.value - data[i - 1].value) / (d.minute - data[i - 1].minute),
            };
        });
    }, [data]);

    const integralData = useMemo(() => {
        const integrals: Array<{ minute: number; integral: number }> = [];
        let sum = 0;
        data.forEach((d, i) => {
            if (i !== 0) {
                const deltaX = d.minute - data[i - 1].minute;
                const averageValue = (data[i - 1].value + d.value) / 2;
                sum += averageValue * deltaX;
            }
            // capture integrals every 5 minutes
            if (d.minute % 3 === 0) {
                integrals.push({ minute: d.minute, integral: sum});
                sum = 0;
            }
        });
        return integrals;
    }, [data]);


    // const totalIntegralData = useMemo(() => {
    //     let homeCumulativeSum = 0;
    //     let awayCumulativeSum = 0;
    //     integralData.forEach(d, i) => {
    //         if (i !== 0) {
    //             if ()
    //         }
    //     }
    // })


    // const totalIntegralData = useMemo(() => {
    //     let cumulativeSum = 0;
    //     return data.map((d, i) => {
    //         if (i === 0) return { minute: d.minute, value: 0};
    //         const deltaX = d.minute - data[i - 1].minute;
    //         const averageValue = (data[i - 1].value + d.value) / 2;
    //         cumulativeSum += averageValue * deltaX;
    //         return { minute: d.minute, integral: cumulativeSum };
    //     });
    // }, [data]);

    const createLineGenerator = (
        xScale: d3.ScaleLinear<number, number>,
        yScale: d3.ScaleLinear<number, number>
      ) => {
        return d3.line<MomentumData>()
          .x(d => xScale(d.minute))
          .y(d => yScale(d.value))
          .curve(d3.curveBasis);
      };

    const renderLineChart = (
        ref: React.RefObject<SVGSVGElement>,
        data: MomentumData[],
        width: number,
        height: number,
        yDomain: [number, number],
        lineColor: string
    ) => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height);
        
        svg.selectAll('*').remove();

        const margin = { top: 20, right: 30, bottom: 30, left: 40 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const mainGroup = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
        
        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.minute)!])
            .range([0, chartWidth]);

        const yScale = d3.scaleLinear()
            .domain(yDomain)
            .range([chartHeight, 0]);

        const line = createLineGenerator(xScale, yScale)

        mainGroup.append('path')
            .datum(data)
            .attr('fill', 'none')
            .attr('stroke', lineColor)
            .attr('stroke-width', 2)
            .attr('d', line);

        mainGroup.append('g')
            .attr('transform', `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale).ticks(10).tickFormat(d => `${d} min`));

        mainGroup.append('g')
            .call(d3.axisLeft(yScale));
    };

    const renderMomentumGraph = (
        ref: React.RefObject<SVGSVGElement>,
        data: MomentumData[],
        width: number,
        height: number,
        homeTeamColor: string,
        awayTeamColor: string
    ) => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height);
    
        svg.selectAll('*').remove();

        const margin = { top: 10, right: 30, bottom: 30, left: 50 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;

        const mainGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.minute) || 0])
            .range([0, chartWidth]);

        const yScale = d3.scaleLinear()
            .domain([-100, 100])
            .range([chartHeight, 0])

        const homeArea = d3.area<MomentumData>()
            .x(d => xScale(d.minute))
            .y0(yScale(0))
            .y1(d => yScale(Math.max(0, d.value)))
            .curve(d3.curveMonotoneX)

        const awayArea = d3.area<MomentumData>()
            .x(d => xScale(d.minute))
            .y0(yScale(0))
            .y1(d => yScale(Math.min(0, d.value)))
            .curve(d3.curveMonotoneX);

        mainGroup.append('path')
            .datum(data)
            .attr('fill', homeTeamColor)
            .attr('opacity', 0.7)
            .attr('d', homeArea);

        mainGroup.append('path')
            .datum(data)
            .attr('fill', awayTeamColor)
            .attr('opacity', 0.7)
            .attr('d', awayArea);

        // draw x-axis
        mainGroup.append('g')
            .attr('transform', `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale).ticks(data.length / 6));

        mainGroup.append('g')
            .call(d3.axisLeft(yScale).ticks(5));

        mainGroup.append('line')
            .attr('x1', 0)
            .attr('x2', chartWidth)
            .attr('y1', yScale(0))
            .attr('y2', yScale(0))
            .attr('stroke', 'black')
            .attr('stroke-dasharray', '5,5');
    };

    const renderBarChart = (
        ref: React.RefObject<SVGSVGElement>,
        data: Array<{ minute: number; integral: number }>,
        width: number,
        height: number,
        homeTeamColor: string,
        awayTeamColor: string
    ) => {
        const svg = d3.select(ref.current)
            .attr('width', width)
            .attr('height', height);
    
        svg.selectAll('*').remove();
    
        const margin = { top: 10, right: 30, bottom: 30, left: 50 };
        const chartWidth = width - margin.left - margin.right;
        const chartHeight = height - margin.top - margin.bottom;
    
        const mainGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);
    
        const xScale = d3.scaleBand()
            .domain(data.map(d => d.minute.toString()))
            .range([0, chartWidth])
            .padding(0.1);

        const yScale = d3.scaleLinear()
            .domain([d3.min(data, d => d.integral) || -100, d3.max(data, d => d.integral) || 100])
            .range([chartHeight, 0]);

        mainGroup.selectAll('.bar')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.minute.toString())!)
            .attr('width', xScale.bandwidth())
            .attr('y', d => yScale(Math.max(0, d.integral)))
            .attr('height', d => Math.abs(yScale(d.integral) - yScale(0)))
            .attr('fill', d => d.integral > 0 ? homeTeamColor : awayTeamColor)
            .attr('opacity', 0.7);

        mainGroup.append('g')
            .attr('transform', `translate(0,${chartHeight})`)
            .call(d3.axisBottom(xScale).tickFormat(d => `${d} min`));

        mainGroup.append('g')
            .call(d3.axisLeft(yScale));
    };

    useEffect(() => {
        renderMomentumGraph(momentumRef, data, 1200, 600, homeTeamColor, awayTeamColor);
        renderLineChart(derivativeRef, derivativeData, 1200, 600, [-20, 20], 'blue');
        renderBarChart(integalRef, integralData, 1200, 600, homeTeamColor, awayTeamColor);
        // renderBarChart(totalIntegralRef, totalIntegralData, 1200, 800, homeTeamColor, awayTeamColor)
    }, [data, width, height]);

    return (
        <div>
            <svg ref={momentumRef}></svg>
            {/* <svg ref={derivativeRef}></svg> */}
            <svg ref={integalRef}></svg>
            {/* <svg ref={totalIntegralRef}></svg> */}
        </div>

    );
};

export default MomentumChart;
