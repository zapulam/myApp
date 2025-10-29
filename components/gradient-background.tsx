import { Colors } from '@/constants/theme';
import React, { useMemo, useState } from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

export function GradientBackground() {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  
  // Generate unique ID for this gradient instance to avoid conflicts
  const gradientId = useMemo(() => `grad-${Math.random().toString(36).substr(2, 9)}`, []);

  // Listen for window resize events
  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions(window);
    });

    return () => subscription?.remove();
  }, []);

  const colors = Colors;
  const { width, height } = dimensions;
  
  // Detect screen size: mobile (< 768px), tablet (768-1200px), desktop (> 1200px)
  const isMobile = width < 768;
  const isTablet = width >= 768 && width <= 1200;
  const isDesktop = width > 1200;
  
  // Adjust gradient parameters based on screen size
  let svgWidth = '100%';
  let gradientCx = '50%';
  let gradientR = '150%';
  let stops = [];
  
  if (isMobile) {
    // Mobile settings
    svgWidth = '100%';
    gradientCx = '50%';
    gradientR = '150%';
    stops = [
      { offset: '0%', color: colors.gradientStart, opacity: 1 },
      { offset: '60%', color: colors.gradientStart, opacity: 0.5 },
      { offset: '75%', color: colors.gradientMiddle, opacity: 0.5 },
      { offset: '90%', color: colors.gradientEnd, opacity: 0.5 },
    ];
  } else if (isTablet) {
    // Tablet settings
    svgWidth = '150%';
    gradientCx = '35%';
    gradientR = '135%';
    stops = [
      { offset: '0%', color: colors.gradientStart, opacity: 1 },
      { offset: '45%', color: colors.gradientStart, opacity: 0.5 },
      { offset: '55%', color: colors.gradientMiddle, opacity: 0.5 },
      { offset: '65%', color: colors.gradientEnd, opacity: 0.5 },
    ];
  } else {
    // Desktop settings
    svgWidth = '200%';
    gradientCx = '25%';
    gradientR = '120%';
    stops = [
      { offset: '0%', color: colors.gradientStart, opacity: 1 },
      { offset: '20%', color: colors.gradientStart, opacity: 0.5 },
      { offset: '30%', color: colors.gradientMiddle, opacity: 0.5 },
      { offset: '40%', color: colors.gradientEnd, opacity: 0.5 },
    ];
  }

  return (
    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} pointerEvents="none">
      <Svg height="100%" width={svgWidth} style={{ position: 'absolute', top: 0, left: 0 }}>
        <Defs>
          <RadialGradient
            id={gradientId}
            cx={gradientCx}
            cy="0%"
            r={gradientR}
            gradientUnits="userSpaceOnUse"
          >
            {stops.map((stop, index) => (
              <Stop 
                key={index}
                offset={stop.offset} 
                stopColor={stop.color} 
                stopOpacity={stop.opacity} 
              />
            ))}
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${gradientId})`} />
      </Svg>
    </View>
  );
}

