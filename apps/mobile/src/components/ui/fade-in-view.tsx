import type React from "react";
import { useEffect } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";

interface FadeInViewProps {
	delay?: number;
	duration?: number;
	translateY?: number;
	translateX?: number;
	style?: StyleProp<ViewStyle>;
	children: React.ReactNode;
}

export function FadeInView({
	delay = 0,
	duration = 400,
	translateY = 12,
	translateX = 0,
	style,
	children,
}: FadeInViewProps) {
	const opacity = useSharedValue(0);
	const offsetY = useSharedValue(translateY);
	const offsetX = useSharedValue(translateX);

	useEffect(() => {
		opacity.value = withDelay(delay, withTiming(1, { duration }));
		offsetY.value = withDelay(delay, withTiming(0, { duration }));
		offsetX.value = withDelay(delay, withTiming(0, { duration }));
	}, [delay, duration, opacity, offsetY, offsetX, translateY, translateX]);

	const animatedStyle = useAnimatedStyle(() => ({
		opacity: opacity.value,
		transform: [{ translateY: offsetY.value }, { translateX: offsetX.value }],
	}));

	return (
		<Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
	);
}
