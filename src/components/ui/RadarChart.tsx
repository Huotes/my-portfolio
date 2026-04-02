"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { profileAxes, type ProfileAxis } from "@/data/profile";

interface RadarChartProps {
  axes?: ProfileAxis[];
  size?: number;
  className?: string;
}

export default function RadarChart({
  axes = profileAxes,
  size = 380,
  className = "",
}: RadarChartProps) {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  const center = size / 2;
  const maxRadius = size * 0.28;
  const levels = 4;
  const angleStep = (2 * Math.PI) / axes.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const radius = (value / 100) * maxRadius;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  // Pontos do polígono de dados
  const dataPoints = axes.map((axis, i) => getPoint(i, axis.value));
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
    " Z";

  // Polígonos de nível (grid)
  const levelPolygons = useMemo(() => {
    const getPointMemo = (index: number, value: number) => {
      const angle = startAngle + index * angleStep;
      const radius = (value / 100) * maxRadius;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle),
      };
    };
    return Array.from({ length: levels }, (_, lvl) => {
      const pct = ((lvl + 1) / levels) * 100;
      const pts = axes.map((_, i) => getPointMemo(i, pct));
      return (
        pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") +
        " Z"
      );
    });
  }, [axes, size, center, maxRadius, startAngle, angleStep, levels]);

  // Linhas dos eixos
  const axisLines = axes.map((_, i) => {
    const end = getPoint(i, 100);
    return { x1: center, y1: center, x2: end.x, y2: end.y };
  });

  // Label positions (um pouco fora do polígono)
  const labelPoints = axes.map((_, i) => getPoint(i, 130));

  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full max-w-[420px] mx-auto drop-shadow-[0_0_30px_rgba(57,255,20,0.06)]"
      >
        <defs>
          {/* Gradiente do polígono de dados */}
          <radialGradient id="radarFill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#39ff14" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#00f0ff" stopOpacity="0.05" />
          </radialGradient>

          {/* Glow filter */}
          <filter id="neonGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="dotGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Grid de níveis */}
        {levelPolygons.map((path, i) => (
          <path
            key={`level-${i}`}
            d={path}
            fill="none"
            stroke="#504945"
            strokeWidth={i === levels - 1 ? 1 : 0.5}
            strokeOpacity={0.4 + i * 0.1}
            strokeDasharray={i < levels - 1 ? "2 4" : "none"}
          />
        ))}

        {/* Eixos (linhas do centro até as pontas) */}
        {axisLines.map((line, i) => (
          <line
            key={`axis-${i}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="#504945"
            strokeWidth={0.5}
            strokeOpacity={hoveredAxis === axes[i].key ? 0.8 : 0.3}
          />
        ))}

        {/* Labels de porcentagem nos anéis */}
        {Array.from({ length: levels }, (_, i) => {
          const pct = ((i + 1) / levels) * 100;
          const pos = getPoint(0, pct);
          return (
            <text
              key={`pct-${i}`}
              x={pos.x + 4}
              y={pos.y - 4}
              fill="#928374"
              fontSize="8"
              fontFamily="JetBrains Mono, monospace"
              opacity={0.5}
            >
              {pct}
            </text>
          );
        })}

        {/* Polígono de dados — fill */}
        <motion.path
          d={dataPath}
          fill="url(#radarFill)"
          stroke="none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        />

        {/* Polígono de dados — stroke com glow */}
        <motion.path
          d={dataPath}
          fill="none"
          stroke="#39ff14"
          strokeWidth={1.5}
          strokeLinejoin="round"
          filter="url(#neonGlow)"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
        />

        {/* Pontos nos vértices */}
        {dataPoints.map((point, i) => {
          const axis = axes[i];
          const isHovered = hoveredAxis === axis.key;

          return (
            <g key={`point-${i}`}>
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? 6 : 4}
                fill={axis.neonColor}
                filter="url(#dotGlow)"
                style={{ cursor: "pointer" }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.08, type: "spring" }}
                onMouseEnter={() => setHoveredAxis(axis.key)}
                onMouseLeave={() => setHoveredAxis(null)}
              />
              {/* Tooltip inline */}
              {isHovered && (
                <g>
                  <rect
                    x={point.x - 30}
                    y={point.y - 26}
                    width={60}
                    height={18}
                    rx={4}
                    fill="#282828"
                    stroke={axis.neonColor}
                    strokeWidth={0.5}
                    opacity={0.95}
                  />
                  <text
                    x={point.x}
                    y={point.y - 14}
                    textAnchor="middle"
                    fill={axis.neonColor}
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="bold"
                  >
                    {axis.value}/100
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {/* Labels dos eixos */}
        {labelPoints.map((point, i) => {
          const axis = axes[i];
          const isHovered = hoveredAxis === axis.key;
          const isLeft = point.x < center - 10;
          const isRight = point.x > center + 10;

          return (
            <text
              key={`label-${i}`}
              x={point.x}
              y={point.y}
              textAnchor={isLeft ? "end" : isRight ? "start" : "middle"}
              dominantBaseline="central"
              fill={isHovered ? axis.neonColor : "#a89984"}
              fontSize={isHovered ? "11" : "10"}
              fontFamily="JetBrains Mono, monospace"
              fontWeight={isHovered ? "bold" : "normal"}
              style={{ cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={() => setHoveredAxis(axis.key)}
              onMouseLeave={() => setHoveredAxis(null)}
            >
              {axis.shortLabel}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
