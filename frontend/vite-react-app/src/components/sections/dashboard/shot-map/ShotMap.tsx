import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { ShotmapEvent } from 'data/match-details-data.ts';

// interface ShotData {
//     shots: ShotmapEvent[];
//     Periods: {
//         All: ShotmapEvent[];
//         FirstHalf: ShotmapEvent[];
//         SecondHalf: ShotmapEvent[];
//     }
// }

interface ShotMapProps {
    shotData: ShotmapEvent[];
    homeTeamId: number;
    awayTeamId: number;
}

const ShotMap: React.FC<ShotMapProps> = ({ shotData, homeTeamId, awayTeamId }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const width = 735;
        const height = 476;
        const pitchWidth = 105;
        const pitchHeight = 68;

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .style("background-color", "#1e1e1e");


        // scaling for x and y coordinates
        const xScale = d3.scaleLinear()
            .domain([0, pitchWidth])
            .range([0, width]);
        
        const yScale = d3.scaleLinear()
            .domain([0, pitchHeight])
            .range([0, height]);
        
        svg.selectAll("*").remove()

        drawPitchElements(svg, xScale, yScale)

        // draw pitch outline
        svg.append("rect")
            .attr("width", xScale(pitchWidth))
            .attr("height", yScale(pitchHeight))
            .attr("stroke", "#cccccc")
            .attr("fill", "none");

        // draw center circle
        svg.append("circle")
            .attr("cx", xScale(pitchWidth / 2))
            .attr("cy", yScale(pitchHeight / 2))
            .attr("r", xScale(9.15))  // 9.15 meters radius
            .attr("stroke", "#cccccc")
            .attr("fill", "none");

        // tooltip div
        const tooltip = d3.select('body').append('div')
            .style('position', 'absolute')
            .style('visibility', 'hidden')
            .style('background', '#fff')
            .style('border', '1px solid #ccc')
            .style('padding', '5px')
            .style('border-radius', '5px')

        const mirrorX = (x: number, teamId: number) => {
            return teamId === homeTeamId ? pitchWidth - x : x;
        }

        // creates shot circles
        svg.selectAll('circle.shot')
            .data(shotData)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(mirrorX(d.x, d.teamId)))
            .attr('cy', d => yScale(d.y))
            .attr('r', d => (d.isOnTarget ? 8 : 4))
            .attr('fill', d => d.teamColor)
            .on('mouseover', function (event, d) {
                tooltip.html(`
                    <strong>Player:</strong> ${d.playerName}<br>
                    <strong>Shot Type:</strong> ${d.shotType}<br>
                    <em>${d.eventType}</em><br>
                    <strong>Expected Goals:</strong> ${d.expectedGoals.toFixed(2)}<br>
                `)
                .style('visibility', 'visible');
                d3.select(this).attr('stroke', '#000').attr('stroke-width', 1.5);
            })
            .on('mousemove', function (event) {
                tooltip.style('top',(event.pageY + 5) + 'px')
                    .style('left', (event.pageX + 5) + 'px')
            })
            .on('mouseout', function () {
                tooltip.style('visibility', 'hidden');
                d3.select(this).attr('stroke', 'none');
            });

    }, [shotData]);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default ShotMap;

const drawPitchElements = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>, xScale: any, yScale: any) => {
  const pitchWidth = 105;
  const pitchHeight = 68;

  // Penalty box dimensions
  const penaltyBoxWidth = 16.5;
  const penaltyBoxHeight = 40.3;
  
  // Goal box dimensions
  const goalBoxWidth = 5.5;
  const goalBoxHeight = 18.3;

  // Goal dimensions
  const goalWidth = 7.32;  // Actual goal width in meters
  const goalDepth = 2.44;  // Actual goal depth in meters

  // Penalty arc dimensions
  const penaltyArcRadius = 9.15;
  const penaltySpot = 11;  // Distance from the goal line

  // Midfield line
  svg.append("line")
    .attr("x1", xScale(pitchWidth / 2))
    .attr("x2", xScale(pitchWidth / 2))
    .attr("y1", yScale(0))
    .attr("y2", yScale(pitchHeight))
    .attr("stroke", "#cccccc");

  // Left penalty box
  svg.append("rect")
    .attr("x", xScale(0))
    .attr("y", yScale((pitchHeight - penaltyBoxHeight) / 2))
    .attr("width", xScale(penaltyBoxWidth))
    .attr("height", yScale(penaltyBoxHeight))
    .attr("stroke", "#cccccc")
    .attr("fill", "none");

  // Right penalty box
  svg.append("rect")
    .attr("x", xScale(pitchWidth - penaltyBoxWidth))
    .attr("y", yScale((pitchHeight - penaltyBoxHeight) / 2))
    .attr("width", xScale(penaltyBoxWidth))
    .attr("height", yScale(penaltyBoxHeight))
    .attr("stroke", "#cccccc")
    .attr("fill", "none");

  // Left goal box
  svg.append("rect")
    .attr("x", xScale(0))
    .attr("y", yScale((pitchHeight - goalBoxHeight) / 2))
    .attr("width", xScale(goalBoxWidth))
    .attr("height", yScale(goalBoxHeight))
    .attr("stroke", "#cccccc")
    .attr("fill", "none");

  // Right goal box
  svg.append("rect")
    .attr("x", xScale(pitchWidth - goalBoxWidth))
    .attr("y", yScale((pitchHeight - goalBoxHeight) / 2))
    .attr("width", xScale(goalBoxWidth))
    .attr("height", yScale(goalBoxHeight))
    .attr("stroke", "#cccccc")
    .attr("fill", "none");

  // Left goal
  svg.append("rect")
    .attr("x", xScale(0))
    .attr("y", yScale((pitchHeight - goalWidth) / 2))
    .attr("width", xScale(goalDepth))
    .attr("height", yScale(goalWidth))
    .attr("stroke", "#ff6666")  // Slightly different color for the goal
    .attr("fill", "none");

  // Right goal
  svg.append("rect")
    .attr("x", xScale(pitchWidth - goalDepth))
    .attr("y", yScale((pitchHeight - goalWidth) / 2))
    .attr("width", xScale(goalDepth))
    .attr("height", yScale(goalWidth))
    .attr("stroke", "#ff6666")
    .attr("fill", "none");

  // Left penalty arc
  svg.append("path")
    .attr("d", d3.arc()
      .innerRadius(xScale(penaltyArcRadius))
      .outerRadius(xScale(penaltyArcRadius))
      .startAngle(Math.PI / 4)
      .endAngle(Math.PI - Math.PI / 4) as any)
    .attr("transform", `translate(${xScale(penaltySpot)}, ${yScale(pitchHeight / 2)})`)
    .attr("stroke", "#cccccc")
    .attr("fill", "none");

  // Right penalty arc
  svg.append("path")
    .attr("d", d3.arc()
      .innerRadius(xScale(penaltyArcRadius))
      .outerRadius(xScale(penaltyArcRadius))
      .startAngle(Math.PI / 4)
      .endAngle(Math.PI - Math.PI / 4) as any)
    .attr("transform", `translate(${xScale(pitchWidth - penaltySpot)}, ${yScale(pitchHeight / 2)}) scale(-1, 1)`)
    .attr("stroke", "#cccccc")
    .attr("fill", "none");
};

